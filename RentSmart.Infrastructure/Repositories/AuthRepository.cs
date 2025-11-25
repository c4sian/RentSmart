using Microsoft.AspNetCore.Identity;
using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Auth;
using RentSmart.Application.Interfaces;
using RentSmart.Infrastructure.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
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

                if (roleResult.Succeeded) return Result<string>.Success("User is successfully registered.");
            }

            return Result<string>.Failure("Something went wrong while registering the user.", 400);
        }

        public async Task<Result<LoginResponseDto>> LoginUser(LoginRequestDto loginRequestDto)
        {
            var user = await userManager.FindByEmailAsync(loginRequestDto.Email);

            if (user == null) return Result<LoginResponseDto>.Failure("The user for this email adress was not found.", 404);

            var checkPasswordResult = await userManager.CheckPasswordAsync(user, loginRequestDto.Password);

            if (!checkPasswordResult) return Result<LoginResponseDto>.Failure("The password for this email is incorrect.", 400);

            var roles = await userManager.GetRolesAsync(user);

            var jwtToken = await jwtService.CreateJwtToken(new JwtUserData
            {
                Id = user.Id,
                DisplayName = user.DisplayName!,
                Email = user.Email!,
                ImageUrl = user.ImageUrl,
            }, roles.ToList());

            return Result<LoginResponseDto>.Success(jwtToken);
        }

        public async Task<Result<LoginResponseDto>> RefreshToken(RefreshRequestDto refreshRequestDto)
        {
            if (string.IsNullOrWhiteSpace(refreshRequestDto.RefreshToken))
                return Result<LoginResponseDto>.Failure("Token is invalid.", 400);

            var result = await jwtService.ValidateRefreshToken(refreshRequestDto.RefreshToken);

            if (result == null) return Result<LoginResponseDto>.Failure("", 401);

            return Result<LoginResponseDto>.Success(result);
        }
    }
}
