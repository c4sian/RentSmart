using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Auth;
using RentSmart.Application.Interfaces;
using RentSmart.Application.Interfaces.Services;
using RentSmart.Infrastructure.Identity;
using RentSmart.Infrastructure.Security;
using System.Net;

namespace RentSmart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthRepository authRepository, IJwtService jwtService) : BaseApiController
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
            var result = await authRepository.LoginUser(loginRequestDto);

            if (result.Value != null)
            {
                var loginResponseDto = result.Value;

                var refreshToken = await jwtService.GenerateRefreshToken(loginResponseDto.UserId);

                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = refreshToken.Expiration,
                };

                Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
            }

            return HandleResult(result);
        }

        [AllowAnonymous]
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            var result = await jwtService.RefreshJwtToken(refreshToken);
            if (result == null)
            {
                Response.Cookies.Append("refreshToken", "", new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTime.UtcNow.AddDays(-1)
                });

                return BadRequest("Refresh token is invalid.");
            }

            var loginResponseDto = result;

            var newRefreshToken = await jwtService.GenerateRefreshToken(loginResponseDto.UserId);

            Response.Cookies.Append("refreshToken", newRefreshToken.Token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = newRefreshToken.Expiration,
            });

            return Ok(result);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> LogoutUser()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            await jwtService.RevokeRefreshToken(refreshToken);

            Response.Cookies.Append("refreshToken", "", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddDays(-1)
            });

            return Ok();
        }
    }
}
