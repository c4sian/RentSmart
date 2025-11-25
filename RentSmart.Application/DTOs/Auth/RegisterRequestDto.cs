using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.DTOs.Auth
{
    public class RegisterRequestDto
    {
        [Required]
        public required string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public required string Email { get; set; } 

        [Required]
        public required string Password { get; set; } 
    }
}
