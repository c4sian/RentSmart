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
        public TokenModel CreateJwtToken(string userId, string userEmail, List<string> roles)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var tokenValidity = DateTime.UtcNow.AddMinutes(Convert.ToDouble(configuration["Jwt:TokenValidityMins"]));

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userId),
                new Claim(JwtRegisteredClaimNames.Sub, userId),
                new Claim(JwtRegisteredClaimNames.Email, userEmail),
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

            return new TokenModel
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = tokenValidity,
            };
        }

        public async Task<TokenModel> GenerateRefreshToken(string userId)
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

            return new TokenModel { Token = refreshToken.Token, Expiration = tokenValidity };
        }

        public async Task<LoginResponseDto?> ValidateRefreshToken(string refreshToken)
        {
            var token = await dbContext.RefreshTokens.Include(x => x.User).FirstOrDefaultAsync(x => x.Token == refreshToken);

            if (token == null || token.ExpiresAt < DateTime.UtcNow)
            {
                return null;
            }

            var rowsAffected = await dbContext.Database.ExecuteSqlInterpolatedAsync($@"
                UPDATE RefreshTokens
                SET IsUsed = 1, UsedAt = GETUTCDATE()
                WHERE Token = {refreshToken} AND IsUsed = 0 AND IsRevoked = 0
            ");

            if (rowsAffected == 0) return null;

            var user = token.User;
            var roles = await userManager.GetRolesAsync(user);

            var jwtToken = CreateJwtToken(user.Id, user.Email!, roles.ToList());

            var loginResponseDto = new LoginResponseDto
            {
                AccessToken = jwtToken.Token,
                AccessTokenExpiration = jwtToken.Expiration,

                UserId = user.Id,
                DisplayName = user.DisplayName,
                Email = user.Email!,

                Roles = roles.ToList()
            };

            return loginResponseDto;
        }
    }
}
