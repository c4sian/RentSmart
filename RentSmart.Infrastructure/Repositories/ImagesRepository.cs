using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Images;
using RentSmart.Application.DTOs.Photos;
using RentSmart.Application.Interfaces;
using RentSmart.Domain;
using RentSmart.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Infrastructure.Repositories
{
    public class ImagesRepository(AppDbContext dbContext, IImageService imageService,
        IAuthorizationService authorizationService, IMapper mapper) : IImagesRepository
    {
        public async Task<Result<List<ImageDto>>> GetImages(string accommodationId)
        {
            var accommodationImages = await dbContext.Accommodations
                .Where(x => x.Id == accommodationId)
                .SelectMany(x => x.Images)
                .ToListAsync();

            var imagesDto = mapper.Map<List<ImageDto>>(accommodationImages);

            return Result<List<ImageDto>>.Success(imagesDto);
        }

        public async Task<Result<UploadResultDto>> AddImage(IFormFile file, string accommodationId, ClaimsPrincipal user)
        {
            if (file == null) return Result<UploadResultDto>.Failure("File is empty", 400);

            var accommodation = await dbContext.Accommodations.FirstOrDefaultAsync(x => x.Id == accommodationId);
            if (accommodation == null) return Result<UploadResultDto>.Failure("Accommodation not found", 404);

            var authResult = await authorizationService.AuthorizeAsync(user, accommodation, "IsOwner");
            if (!authResult.Succeeded) return Result<UploadResultDto>.Failure("Forbidden access", 403);

            var result = await imageService.UploadPhoto(file, folder: $"RentSmart/accommodations/{accommodationId}");

            var image = new AccommodationImage
            {
                Url = result.Url,
                PublicId = result.PublicId,
                Bytes = result.Bytes,
                AccommodationId = accommodationId,
            };

            await dbContext.AccommodationImages.AddAsync(image);
            await dbContext.SaveChangesAsync();

            return Result<UploadResultDto>.Success(result);
        }
    }
}
