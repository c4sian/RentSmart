using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.Core
{
    public class JwtUserData
    {
        public string Id { get; set; } = "";
        public string DisplayName { get; set; } = "";
        public string Email { get; set; } = "";
        public string? ImageUrl { get; set; }
    }
}
