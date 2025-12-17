using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Accommodations;
using RentSmart.Application.Interfaces;
using RentSmart.Domain;
using RentSmart.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Infrastructure.Repositories
{
    public class AccommodationsRepository(AppDbContext dbContext, IMapper mapper, IAuthorizationService authorizationService) : IAccommodationsRepository
    {
        public async Task<Result<List<AccommodationDto>>> GetAllAsync()
        {
            var accommodations = await dbContext.Accommodations.ToListAsync();

            return Result<List<AccommodationDto>>.Success(
                mapper.Map<List<AccommodationDto>>(accommodations));
        }

        public async Task<Result<AccommodationDto>> GetByIdAsync(string id)
        {
            var accommodation = await dbContext.Accommodations.FirstOrDefaultAsync(x => x.Id == id);

            if (accommodation == null) return Result<AccommodationDto>.Failure("Accommodation not found.", 404);

            return Result<AccommodationDto>.Success(
                mapper.Map<AccommodationDto>(accommodation));
        }
        public async Task<Result<AccommodationDto>> CreateAsync(CreateAccommodationDto createAccommodationDto, string userId)
        {
            var accommodation = mapper.Map<Accommodation>(createAccommodationDto);

            accommodation.OwnerId = userId;

            accommodation.Amenities = await dbContext.Amenities
                .Where(a => createAccommodationDto.AmenityIds.Contains(a.Id))
                .ToListAsync();

            await dbContext.Accommodations.AddAsync(accommodation);
            var result = await dbContext.SaveChangesAsync() > 0;

            if (!result) return Result<AccommodationDto>.Failure("Failed to create the activity.", 400);

            var accommodationDto = mapper.Map<AccommodationDto>(accommodation);

            return Result<AccommodationDto>.Success(accommodationDto);
        }

        public async Task<Result<Unit>> UpdateAsync(UpdateAccommodationDto updateAccommodationDto, ClaimsPrincipal user)
        {
            var accommodation = await dbContext.Accommodations.FirstOrDefaultAsync(x => x.Id == updateAccommodationDto.Id);

            if (accommodation == null) return Result<Unit>.Failure("Accommodation not found.", 404);

            var authResult = await authorizationService.AuthorizeAsync(user, accommodation, "IsOwner");
            if (!authResult.Succeeded) return Result<Unit>.Failure("Forbidden access", 403);

            mapper.Map(updateAccommodationDto, accommodation);

            var result = await dbContext.SaveChangesAsync() > 0;

            if (!result) return Result<Unit>.Failure("Failed to update the accommodation.", 400);

            return Result<Unit>.Success(Unit.Value);
        }

        public async Task<Result<Unit>> DeleteAsync(string id, ClaimsPrincipal user)
        {
            var accommodation = await dbContext.Accommodations.FirstOrDefaultAsync(x => x.Id == id);

            if (accommodation == null) return Result<Unit>.Failure("Accommodation not found.", 404);

            var authResult = await authorizationService.AuthorizeAsync(user, accommodation, "IsOwner");
            if (!authResult.Succeeded) return Result<Unit>.Failure("Forbidden access", 403);

            dbContext.Accommodations.Remove(accommodation);

            var result = await dbContext.SaveChangesAsync() > 0;

            if (!result) return Result<Unit>.Failure("Failed to delete the accommodation.", 400);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
