using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.Interfaces
{
    public interface IAuthRepository
    {
        Task<Result<string>> RegisterUser(RegisterRequestDto registerDto);
        Task<Result<LoginResponseDto>> LoginUser(LoginRequestDto loginRequestDto);
        Task<Result<LoginResponseDto>> RefreshToken(RefreshRequestDto refreshRequestDto);
    }
}
