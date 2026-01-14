using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Reviews;
using RentSmart.Application.DTOs.Users;
using RentSmart.Application.Interfaces;
using RentSmart.Domain;
using RentSmart.Infrastructure.Persistence;
using RentSmart.Infrastructure.Persistence.IntermediaryTables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Infrastructure.Repositories
{
    public class ReviewsRepository(AppDbContext dbContext, IMapper mapper) : IReviewsRepository
    {
        public async Task<Result<List<AccommodationReviewDto>>> GetAccommodationReviewsAsync(string accommodationId)
        {
            var reviewsDto = await dbContext.Reviews
                .Where(x => x.AccommodationId == accommodationId)
                .Join(
                    dbContext.Users,
                    r => r.UserId,
                    u => u.Id,
                    (r, u) => new AccommodationReviewDto
                    {
                        Id = r.Id,
                        Rating = r.Rating,
                        Comment = r.Comment,
                        CreatedAt = r.CreatedAt,
                        Reviewer = new ReviewerDto
                        {
                            Id = u.Id,
                            DisplayName = u.DisplayName,
                            ImageUrl = u.ImageUrl,
                        }
                    }
                ).ToListAsync();

            return Result<List<AccommodationReviewDto>>.Success(reviewsDto);
        }

        public async Task<Result<ReviewEligibilityDto>> GetEligibilityAsync(string accommodationId, string userId)
        {
            var eligibleBooking = await dbContext.Bookings
                .Where(b =>
                    b.UserId == userId &&
                    b.AccommodationId == accommodationId &&
                    b.CheckOutDate <= DateTime.UtcNow &&
                    !dbContext.Reviews.Any(r => r.BookingId == b.Id)
                )
                .OrderByDescending(b => b.CheckOutDate)
                .FirstOrDefaultAsync();

            if (eligibleBooking == null) return Result<ReviewEligibilityDto>.Success(
                new ReviewEligibilityDto
                {
                    CanReview = false,
                });

            return Result<ReviewEligibilityDto>.Success(
                new ReviewEligibilityDto
                {
                    CanReview = true,
                    BookingId = eligibleBooking.Id
                });
        }

        public async Task<Result<Unit>> CreateAsync(CreateReviewDto createReviewDto, string userId)
        {
            var review = mapper.Map<Review>(createReviewDto);

            review.UserId = userId;

            await dbContext.Reviews.AddAsync(review);

            var userReview = new UserReview
            {
                UserId = userId,
                ReviewId = review.Id,
            };
            await dbContext.UserReviews.AddAsync(userReview);

            var accommodation = review.Accommodation;
            accommodation.AverageRating =
                (accommodation.AverageRating * accommodation.ReviewsCount + review.Rating)
                / (accommodation.ReviewsCount + 1);
            accommodation.ReviewsCount += 1;

            var result = await dbContext.SaveChangesAsync() > 0;

            if (!result) return Result<Unit>.Failure("Failed to create review", 400);

            return Result<Unit>.Success(Unit.Value);
        }

        public Task<Result<Unit>> DeleteAsync(string reviewId, string userId)
        {
            throw new NotImplementedException();
        }


    }
}
