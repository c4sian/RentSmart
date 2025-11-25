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
        Task<LoginResponseDto> CreateJwtToken(JwtUserData jwtUser, List<string> roles);
        Task<LoginResponseDto?> ValidateRefreshToken(string refreshToken);
    }
}
