using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RentSmart.Application.Interfaces;
using System.Security.Claims;

namespace RentSmart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IUsersRepository usersRepository) : BaseApiController
    {
        [HttpGet("me")]
        public async Task<IActionResult> GetMyProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            return HandleResult(await usersRepository.GetMeAsync(userId));
        }

        [HttpGet("{ownerId}")]
        public async Task<IActionResult> GetOwnerDetails([FromRoute] string ownerId)
        {
            return HandleResult(await usersRepository.GetOwnerAsync(ownerId));
        }
    }
}
