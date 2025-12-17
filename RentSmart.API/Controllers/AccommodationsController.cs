using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RentSmart.Application.DTOs.Accommodations;
using RentSmart.Application.Interfaces;
using System.Security.Claims;

namespace RentSmart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccommodationsController(IAccommodationsRepository accommodationsRepository) : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAccommodations()
        {
            return HandleResult(await accommodationsRepository.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccommodationDetails([FromRoute] string id)
        {
            return HandleResult(await accommodationsRepository.GetByIdAsync(id));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAccommodation([FromBody] CreateAccommodationDto createAccommodationDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return BadRequest("User not found");

            return HandleResult(await accommodationsRepository.CreateAsync(createAccommodationDto, userId));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAccommodation([FromBody] UpdateAccommodationDto updateAccommodationDto)
        {
            return HandleResult(await accommodationsRepository.UpdateAsync(updateAccommodationDto, User));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccommodation([FromRoute] string id)
        {
            return HandleResult(await accommodationsRepository.DeleteAsync(id, User));
        }
    }
}
