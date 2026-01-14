using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.DTOs.Users
{
    public class OwnerDto
    {
        public string DisplayName { get; set; } = "";
        public string? ImageUrl { get; set; }
        public string Email { get; set; } = "";
    }
}
