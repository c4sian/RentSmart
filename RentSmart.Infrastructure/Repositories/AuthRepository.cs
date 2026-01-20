using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Accommodations;
using RentSmart.Application.DTOs.Auth;
using RentSmart.Application.Interfaces;
using RentSmart.Application.Interfaces.Services;
using RentSmart.Infrastructure.Identity;
using RentSmart.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Infrastructure.Repositories
{
    public class AuthRepository(UserManager<AppUser> userManager, IJwtService jwtService) 
        : IAuthRepository
    {
        public async Task<Result<Unit>> RegisterUser(RegisterRequestDto registerDto)
        {
            var appUser = new AppUser
            {
                UserName = registerDto.Email,
                Email = registerDto.Email,
                DisplayName = registerDto.DisplayName,
            };

            var identityResult = await userManager.CreateAsync(appUser, registerDto.Password);

            if (identityResult.Succeeded)
            {
                var roleResult = await userManager.AddToRoleAsync(appUser, "User");

                if (roleResult.Succeeded) return Result<Unit>.Success(Unit.Value);
            }

            return Result<Unit>.Failure("Something went wrong while registering the user.", 400);
        }

        public async Task<Result<LoginResponseDto>> LoginUser(LoginRequestDto loginRequestDto)
        {
            var user = await userManager.FindByEmailAsync(loginRequestDto.Email);

            if (user == null) return Result<LoginResponseDto>.Failure("Incorrect email.", 400);

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
    }
}
