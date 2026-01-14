using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RentSmart.Application.DTOs.Images;
using RentSmart.Application.Interfaces;

namespace RentSmart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController(IImagesRepository imagesRepository) : BaseApiController
    {
        [HttpGet("{accommodationId}")]
        public async Task<IActionResult> GetAccommodationImages([FromRoute] string accommodationId)
        {
            return HandleResult(await imagesRepository.GetAllImagesAsync(accommodationId));
        }

        [HttpPost("upload/{accommodationId}")]
        public async Task<IActionResult> UploadAccommodationImage([FromForm] IFormFile file, [FromRoute] string accommodationId)
        {
            return HandleResult(await imagesRepository.AddImageAsync(file, accommodationId, User));
        }

        [HttpPost("reorder/{accommodationId}")]
        public async Task<IActionResult> ReorderAccommdodationImages([FromRoute] string accommodationId, [FromBody] List<ImageDto> imagesOrder)
        {
            return HandleResult(await imagesRepository.ReorderImagesAsync(accommodationId, imagesOrder, User));
        }
    }
}
