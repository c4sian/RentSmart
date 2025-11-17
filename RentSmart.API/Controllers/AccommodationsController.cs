using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RentSmart.Application.DTOs.Accommodations;

namespace RentSmart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccommodationsController() : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAccommodations()
        {
            return HandleResult(await AccommodationRepository.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccommodationDetails([FromRoute] string id)
        {
            return HandleResult(await AccommodationRepository.GetByIdAsync(id));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAccommodation([FromBody] CreateAccommodationDto createAccommodationDto)
        {
            return HandleResult(await AccommodationRepository.CreateAsync(createAccommodationDto));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAccommodation([FromBody] UpdateAccommodationDto updateAccommodationDto)
        {
            return HandleResult(await AccommodationRepository.UpdateAsync(updateAccommodationDto));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccommodation([FromRoute] string id)
        {
            return HandleResult(await AccommodationRepository.DeleteAsync(id));
        }
    }
}
