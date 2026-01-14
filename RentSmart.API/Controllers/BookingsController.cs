using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RentSmart.Application.DTOs.Bookings;
using RentSmart.Application.Interfaces;
using System.Security.Claims;

namespace RentSmart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController(IBookingsRepository bookingsRepository) : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet("availability/{accommodationId}")]
        public async Task<IActionResult> GetBookedDates([FromRoute] string accommodationId)
        {
            return HandleResult(await bookingsRepository.GetBookedDatesAsync(accommodationId));
        }

        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] CreateBookingDto createBookingDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return BadRequest("User not found");

            return HandleResult(await bookingsRepository.CreateAsync(createBookingDto, userId));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> CancelBooking([FromRoute] string id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return BadRequest("User not found");

            return HandleResult(await bookingsRepository.CancelAsync(id, userId));
        }
    }
}
