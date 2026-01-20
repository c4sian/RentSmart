using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Accommodations;
using RentSmart.Application.Interfaces;
using RentSmart.Infrastructure.Persistence;
using RentSmart.Infrastructure.Persistence.IntermediaryTables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Infrastructure.Repositories
{
    public class FavoritesRepository(AppDbContext dbContext, IMapper mapper) : IFavoritesRepository
    {
        public async Task<Result<List<AccommodationShortDto>>> GetAllAsync(string userId)
        {
            var favoriteAccommodations = await dbContext.FavoriteAccommodations.Include(x => x.Accommodation)
                .Where(x => x.UserId == userId)
                .Select(x => x.Accommodation)
                .ToListAsync();

            var favoriteAccommodationsDto = mapper.Map<List<AccommodationShortDto>>(favoriteAccommodations);

            return Result<List<AccommodationShortDto>>.Success(favoriteAccommodationsDto);
        }

        public async Task<Result<Unit>> AddAsync(string userId, string accommodationId)
        {
            await dbContext.FavoriteAccommodations.AddAsync(new FavoriteAccommodation
            {
                UserId = userId,
                AccommodationId = accommodationId
            });

            var result = await dbContext.SaveChangesAsync() > 0;
            if (!result) return Result<Unit>.Failure("Failed to add favorite accommodation", 400);

            return Result<Unit>.Success(Unit.Value);
        }

        public async Task<Result<Unit>> DeleteAsync(string userId, string accommodationId)
        {
            var favoriteAccommodation = await dbContext.FavoriteAccommodations
                .FirstOrDefaultAsync(x => x.UserId == userId && x.AccommodationId == accommodationId);
            if (favoriteAccommodation == null) return Result<Unit>.Failure("Favorite accommodation not found.", 404);

            dbContext.FavoriteAccommodations.Remove(favoriteAccommodation);

            var result = await dbContext.SaveChangesAsync() > 0;
            if (!result) return Result<Unit>.Failure("Failed to delete the favorite accommodation.", 400);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
