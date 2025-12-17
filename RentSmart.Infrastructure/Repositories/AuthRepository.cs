using Microsoft.AspNetCore.Identity;
using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Auth;
using RentSmart.Application.Interfaces;
using RentSmart.Infrastructure.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Infrastructure.Repositories
{
    public class AuthRepository(UserManager<AppUser> userManager, IJwtService jwtService) : IAuthRepository
    {
        public async Task<Result<string>> RegisterUser(RegisterRequestDto registerDto)
        {
            var user = new AppUser
            {
                UserName = registerDto.Email,
                Email = registerDto.Email,
                DisplayName = registerDto.DisplayName,
            };

            var identityResult = await userManager.CreateAsync(user, registerDto.Password);

            if (identityResult.Succeeded)
            {
                var roleResult = await userManager.AddToRoleAsync(user, "User");

                if (roleResult.Succeeded) return Result<string>.Success("User successfully registered.");
            }

            return Result<string>.Failure("Something went wrong while registering the user.", 400);
        }

        public async Task<Result<LoginResponseDto>> LoginUser(LoginRequestDto loginRequestDto)
        {
            var user = await userManager.FindByEmailAsync(loginRequestDto.Email);

            if (user == null) return Result<LoginResponseDto>.Failure("Incorrect email or password.", 400);

            var checkPasswordResult = await userManager.CheckPasswordAsync(user, loginRequestDto.Password);

            if (!checkPasswordResult) return Result<LoginResponseDto>.Failure("Incorrect password.", 400);

            var roles = await userManager.GetRolesAsync(user);

            var jwtToken = jwtService.CreateJwtToken(user.Id, user.Email!, roles.ToList());

            var loginResponseDto = new LoginResponseDto
            {
                AccessToken = jwtToken.Token,
                AccessTokenExpiration = jwtToken.Expiration,

                UserId = user.Id,
                DisplayName = user.DisplayName,
                Email = user.Email!,

                Roles = roles.ToList()
            };

            return Result<LoginResponseDto>.Success(loginResponseDto);
        }

        public async Task<Result<LoginResponseDto>> RefreshToken(string? refreshToken)
        {
            if (string.IsNullOrWhiteSpace(refreshToken))
                return Result<LoginResponseDto>.Failure("Token is invalid.", 400);

            var loginResponseDto = await jwtService.ValidateRefreshToken(refreshToken);

            if (loginResponseDto == null) return Result<LoginResponseDto>.Failure("Refresh token is not valid.", 401);

            return Result<LoginResponseDto>.Success(loginResponseDto);
        }
    }
}
