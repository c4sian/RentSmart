using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Accommodations;
using RentSmart.Application.DTOs.Bookings;
using RentSmart.Application.DTOs.Images;
using RentSmart.Application.Interfaces;
using RentSmart.Application.Interfaces.Services;
using RentSmart.Domain;
using RentSmart.Infrastructure.Persistence;
using RentSmart.Infrastructure.Persistence.IntermediaryTables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Infrastructure.Repositories
{
    public class AccommodationsRepository(AppDbContext dbContext, IMapper mapper, 
        IAuthorizationService authorizationService, IGeocodingService geocodingService) : IAccommodationsRepository
    {
        public async Task<Result<List<AccommodationShortDto>>> GetAllAsync()
        {
            var accommodations = await dbContext.Accommodations.ToListAsync();

            return Result<List<AccommodationShortDto>>.Success(
                mapper.Map<List<AccommodationShortDto>>(accommodations));
        }

        public async Task<Result<AccommodationFullDto>> GetByIdAsync(string id)
        {
            var accommodation = await dbContext.Accommodations
                .Include(x => x.Images)
                .Include(x => x.Amenities)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (accommodation == null) return Result<AccommodationFullDto>.Failure("Accommodation not found.", 404);

            var accommodationFullDto = mapper.Map<AccommodationFullDto>(accommodation);

            return Result<AccommodationFullDto>.Success(accommodationFullDto);
        }

        public async Task<Result<string>> CreateAsync(CreateAccommodationDto createAccommodationDto, string userId)
        {
            var accommodation = mapper.Map<Accommodation>(createAccommodationDto);
            accommodation.OwnerId = userId;
            accommodation.Amenities = await dbContext.Amenities
                .Where(a => createAccommodationDto.AmenityIds.Contains(a.Id))
                .ToListAsync();

            var address = $"{accommodation.Country}, {accommodation.StateOrCounty}, {accommodation.City}, {accommodation.Street}";

            var coordinates = await geocodingService.GeocodeAsync(address);

            if (coordinates == null) return Result<string>.Failure("Address could not be geocoded. Try retyping it.", 400);

            accommodation.Latitude = coordinates.Latitude;
            accommodation.Longitude = coordinates.Longitude;

            await dbContext.Accommodations.AddAsync(accommodation);

            var listedAccommodation = new ListedAccommodation
            {
                UserId = userId,
                AccommodationId = accommodation.Id,
            };
            await dbContext.ListedAccommodations.AddAsync(listedAccommodation);

            var result = await dbContext.SaveChangesAsync() > 0;

            if (!result) return Result<string>.Failure("Failed to create the activity.", 400);

            return Result<string>.Success(accommodation.Id);
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
