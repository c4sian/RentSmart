using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Reviews;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.Interfaces
{
    public interface IReviewsRepository
    {
        Task<Result<List<AccommodationReviewDto>>> GetAccommodationReviewsAsync(string accommodationId);
        Task<Result<ReviewEligibilityDto>> GetEligibilityAsync(string accommodationId, string userId);
        Task<Result<Unit>> CreateAsync(CreateReviewDto createReviewDto, string userId);
        Task<Result<Unit>> DeleteAsync(string reviewId, string userId);
    }
}
