using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RentSmart.Application.Interfaces;
using System.Security.Claims;

namespace RentSmart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController(IFavoritesRepository favoritesRepository) : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetFavoriteAccommodations()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return BadRequest("User not found.");

            return HandleResult(await favoritesRepository.GetAllAsync(userId));
        }

        [HttpPost("{accommodationId}")]
        public async Task<IActionResult> AddFavoriteAccommodation([FromRoute] string accommodationId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return BadRequest("User not found.");

            return HandleResult(await favoritesRepository.AddAsync(userId, accommodationId));
        }

        [HttpDelete("{accommodationId}")]
        public async Task<IActionResult> DeleteFavoriteAccommodation([FromRoute] string accommodationId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return BadRequest("User not found.");

            return HandleResult(await favoritesRepository.DeleteAsync(userId, accommodationId));
        }
    }
}
