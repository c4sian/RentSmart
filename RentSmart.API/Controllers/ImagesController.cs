using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RentSmart.Application.Interfaces;

namespace RentSmart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController(IImagesRepository imagesRepository) : BaseApiController
    {
        [HttpGet("{accommodationId}")]
        public async Task<IActionResult> GetImages(string accommodationId)
        {
            return HandleResult(await imagesRepository.GetImages(accommodationId));
        }

        [HttpPost("upload/{accommodationId}")]
        public async Task<IActionResult> Upload([FromForm] IFormFile file, [FromRoute] string accommodationId)
        {
            return HandleResult(await imagesRepository.AddImage(file, accommodationId, User));
        }
    }
}
