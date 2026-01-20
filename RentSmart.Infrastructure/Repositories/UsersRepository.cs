using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Accommodations;
using RentSmart.Application.DTOs.Bookings;
using RentSmart.Application.DTOs.Profiles;
using RentSmart.Application.Interfaces;
using RentSmart.Infrastructure.Identity;
using RentSmart.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Infrastructure.Repositories
{
    public class UsersRepository(AppDbContext dbContext, IMapper mapper) : IUsersRepository
    {
        public async Task<Result<UserProfileDto>> GetMeAsync(string userId)
        {
            var appUser = await dbContext.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (appUser == null) return Result<UserProfileDto>.Failure("User not found.", 404);

            var listedAccommodations = await dbContext.ListedAccommodations
                .Where(x => x.UserId == userId)
                .Select(x => x.Accommodation)
                .ToListAsync();

            var favoriteAccommodations = await dbContext.FavoriteAccommodations
                .Where(x => x.UserId == userId)
                .Select(x => x.Accommodation)
                .ToListAsync();

            var userBookings = await dbContext.UserBookings
                .Where(x => x.UserId == userId)
                .Select(x => x.Booking)
                .ToListAsync();

            var userProfileDto = new UserProfileDto
            {
                UserId = userId,
                DisplayName = appUser.DisplayName,
                Email = appUser.Email!,

                ListedAccommodations = mapper.Map<List<AccommodationShortDto>>(listedAccommodations),
                FavoriteAccommodations = mapper.Map<List<AccommodationShortDto>>(favoriteAccommodations),
                UserBookings = mapper.Map<List<UserBookingDto>>(userBookings)
            };

            return Result<UserProfileDto>.Success(userProfileDto);
        }

        public async Task<Result<OwnerDto>> GetOwnerAsync(string ownerId)
        {
            var owner = await dbContext.Users.FirstOrDefaultAsync(x => x.Id == ownerId);
            if (owner == null) return Result<OwnerDto>.Failure("User does not exist", 404);

            var ownerDetailsDto = new OwnerDto
            {
                DisplayName = owner.DisplayName,
                ImageUrl = owner.ImageUrl,
                Email = owner.Email!
            };

            return Result<OwnerDto>.Success(ownerDetailsDto);
        }
    }
}
