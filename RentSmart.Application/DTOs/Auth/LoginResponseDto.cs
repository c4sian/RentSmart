using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.DTOs.Auth
{
    public class LoginResponseDto
    {
        public string AccessToken { get; set; } = default!;
        public DateTime AccessTokenExpiration { get; set; }

        public string RefreshToken { get; set; } = default!;
        public DateTime RefreshTokenExpiration { get; set; }

        public string UserId { get; set; } = default!;
        public string DisplayName { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string? ImageUrl { get; set; }

        public List<string> Roles { get; set; } = default!;
    }
}
