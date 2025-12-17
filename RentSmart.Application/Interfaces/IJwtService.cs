using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.Interfaces
{
    public interface IJwtService
    {
        TokenModel CreateJwtToken(string userId, string userEmail, List<string> roles);
        Task<TokenModel> GenerateRefreshToken(string userId);
        Task<LoginResponseDto?> ValidateRefreshToken(string refreshToken);
    }
}
