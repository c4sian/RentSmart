using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Images;
using RentSmart.Application.DTOs.Photos;
using RentSmart.Application.Interfaces;
using RentSmart.Application.Interfaces.Services;
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
        public async Task<Result<List<ImageDto>>> GetAllImagesAsync(string accommodationId)
        {
            var accommodationImages = await dbContext.Accommodations
                .Where(x => x.Id == accommodationId)
                .SelectMany(x => x.Images)
                .ToListAsync();

            var imagesDto = mapper.Map<List<ImageDto>>(accommodationImages);

            return Result<List<ImageDto>>.Success(imagesDto);
        }

        public async Task<Result<UploadResultDto>> AddImageAsync(IFormFile file, string accommodationId, ClaimsPrincipal user)
        {
            if (file == null) return Result<UploadResultDto>.Failure("File is empty", 400);

            var accommodation = await dbContext.Accommodations.FirstOrDefaultAsync(x => x.Id == accommodationId);
            if (accommodation == null) return Result<UploadResultDto>.Failure("Accommodation not found", 404);

            var authResult = await authorizationService.AuthorizeAsync(user, accommodation, "IsOwner");
            if (!authResult.Succeeded) return Result<UploadResultDto>.Failure("Forbidden access", 403);

            var imageResult = await imageService.UploadPhoto(file, folder: $"RentSmart/accommodations/{accommodationId}");

            var maxOrder = await dbContext.AccommodationImages
                .Where(x => x.AccommodationId == accommodationId)
                .MaxAsync(x => (int?)x.OrderIndex) ?? -1;

            var image = new AccommodationImage
            {
                Url = imageResult.Url,
                PublicId = imageResult.PublicId,
                Bytes = imageResult.Bytes,
                OrderIndex = maxOrder + 1,
                AccommodationId = accommodationId,
            };

            await dbContext.AccommodationImages.AddAsync(image);
            var result = await dbContext.SaveChangesAsync() > 0;
            if (!result) return Result<UploadResultDto>.Failure("Failed to save new changes", 400);

            return Result<UploadResultDto>.Success(imageResult);
        }

        public async Task<Result<Unit>> ReorderImagesAsync(string accommodationId, List<ImageDto> imagesOrder, ClaimsPrincipal user)
        {
            if (imagesOrder == null || !imagesOrder.Any()) return Result<Unit>.Failure("Images order is empty", 400);

            var accommodation = await dbContext.Accommodations.FirstOrDefaultAsync(x => x.Id == accommodationId);
            if (accommodation == null) return Result<Unit>.Failure("Accommodation not found", 404);

            var authResult = await authorizationService.AuthorizeAsync(user, accommodation, "IsOwner");
            if (!authResult.Succeeded) return Result<Unit>.Failure("Forbidden access", 403);

            var images = await dbContext.AccommodationImages
                .Where(x => x.AccommodationId == accommodationId)
                .OrderBy(x => x.OrderIndex)
                .ToListAsync();

            if (images.Count != imagesOrder.Count)
                return Result<Unit>.Failure("Invalid images order payload", 400);

            foreach(var image in images)
            {
                var newOrder = imagesOrder.First(x => x.Id == image.Id).OrderIndex;
                image.OrderIndex = newOrder;
            }

            var mainImage = imagesOrder.First(x => x.OrderIndex == 0);
            accommodation.MainImageUrl = mainImage.Url;

            var result = await dbContext.SaveChangesAsync() > 0;
            if (!result) return Result<Unit>.Failure("Failed to save new changes", 400);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
