using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Auth;
using RentSmart.Application.Interfaces;
using RentSmart.Infrastructure.Identity;

namespace RentSmart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthRepository authRepository) : BaseApiController
    {
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterRequestDto registerDto)
        {
            return HandleResult(await authRepository.RegisterUser(registerDto));
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginRequestDto loginRequestDto)
        {
            return HandleResult(await authRepository.LoginUser(loginRequestDto));
        }

        [AllowAnonymous]
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshRequestDto refreshRequestDto)
        {
            return HandleResult(await authRepository.RefreshToken(refreshRequestDto));
        }

        //[HttpPost("logout")]
        //public async Task<IActionResult> LogoutUser()
        //{


        //    return NoContent();
        //}
    }
}
