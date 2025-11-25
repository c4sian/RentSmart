using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Auth;
using RentSmart.Application.Interfaces;
using RentSmart.Infrastructure.Identity;
using RentSmart.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Infrastructure.Security
{
    public class JwtService(IConfiguration configuration, AppDbContext dbContext, UserManager<AppUser> userManager)
        : IJwtService
    {
        public async Task<LoginResponseDto> CreateJwtToken(JwtUserData jwtUser, List<string> roles)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var tokenValidity = DateTime.UtcNow.AddMinutes(Convert.ToDouble(configuration["Jwt:TokenValidityMins"]));

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, jwtUser.Id),
                new Claim(JwtRegisteredClaimNames.Email, jwtUser.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var token = new JwtSecurityToken(
                configuration["Jwt:Issuer"],
                configuration["Jwt:Audience"],
                claims,
                expires: tokenValidity,
                signingCredentials: credentials
                );

            var refreshToken = await GenerateRefreshToken(jwtUser.Id);

            return new LoginResponseDto
            {
                AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                AccessTokenExpiration = tokenValidity,

                RefreshToken = refreshToken.Token,
                RefreshTokenExpiration = refreshToken.ExpiresAt,

                UserId = jwtUser.Id,
                DisplayName = jwtUser.DisplayName,
                Email = jwtUser.Email,
                ImageUrl = jwtUser.ImageUrl,

                Roles = roles
            };
        }

        public async Task<LoginResponseDto?> ValidateRefreshToken(string token)
        {
            var refreshToken = await dbContext.RefreshTokens.Include("User").FirstOrDefaultAsync(x => x.Token == token);

            if (refreshToken == null || refreshToken.ExpiresAt < DateTime.UtcNow)
            {
                return null;
            }

            dbContext.RefreshTokens.Remove(refreshToken);
            await dbContext.SaveChangesAsync();

            var user = refreshToken.User;
            var roles = await userManager.GetRolesAsync(user);

            return await CreateJwtToken(new JwtUserData
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                Email = user.Email!,
                ImageUrl = user.ImageUrl,
            }, roles.ToList());
        }

        private async Task<RefreshToken> GenerateRefreshToken(string userId)
        {
            var tokenValidity = DateTime.UtcNow.AddDays(Convert.ToDouble(configuration["Jwt:RefreshTokenValidityDays"]));

            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                ExpiresAt = tokenValidity,
                UserId = userId
            };

            await dbContext.RefreshTokens.AddAsync(refreshToken);
            await dbContext.SaveChangesAsync();

            return refreshToken;
        }
    }
}
