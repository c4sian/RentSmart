using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;
using RentSmart.Application.DTOs.Reviews;
using RentSmart.Application.Interfaces;
using System.Security.Claims;

namespace RentSmart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController(IReviewsRepository reviewsRepository) : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet("accommodation/{accommodationId}")]
        public async Task<IActionResult> GetAccommodationReviews([FromRoute] string accommodationId)
        {
            return HandleResult(await reviewsRepository.GetAccommodationReviewsAsync(accommodationId));
        }

        [HttpGet("eligibility/{accommodationId}")]
        public async Task<IActionResult> GetReviewEligibility([FromRoute] string accommodationId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return BadRequest("User not found");

            return HandleResult(await reviewsRepository.GetEligibilityAsync(accommodationId, userId));
        }

        [HttpPost]
        public async Task<IActionResult> CreateReview([FromBody] CreateReviewDto createReviewDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return BadRequest("User not found");

            return HandleResult(await reviewsRepository.CreateAsync(createReviewDto, userId));
        }

        [HttpDelete("{reviewId}")]
        public async Task<IActionResult> DeleteReview([FromRoute] string reviewId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return BadRequest("User not found");

            return HandleResult(await reviewsRepository.DeleteAsync(reviewId, userId));
        }
    }
}
