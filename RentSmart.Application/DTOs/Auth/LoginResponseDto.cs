using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.DTOs.Auth
{
    public class LoginResponseDto
    {
        public string AccessToken { get; set; } = "";
        public DateTime AccessTokenExpiration { get; set; }

        public string UserId { get; set; } = "";
        public string DisplayName { get; set; } = "";
        public string Email { get; set; } = "";

        public List<string> Roles { get; set; } = [];
    }
}
