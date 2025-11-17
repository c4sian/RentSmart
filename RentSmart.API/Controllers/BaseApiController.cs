using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RentSmart.Application.Core;
using RentSmart.Application.Interfaces;

namespace RentSmart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private IAccommodationsRepository? _accommodationRepository;

        protected IAccommodationsRepository AccommodationRepository =>
            _accommodationRepository ??= HttpContext.RequestServices.GetService<IAccommodationsRepository>()
                ?? throw new InvalidOperationException("IAccommodationsRepository service is unavailable.");

        protected IActionResult HandleResult<T>(Result<T> result)
        {
            if (!result.IsSuccess && result.Code == 404) return NotFound();

            if (result.IsSuccess && result.Value != null) return Ok(result.Value);

            return BadRequest(result.Error);
        }
    }
}
