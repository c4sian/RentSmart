using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.DTOs.Auth
{
    public class RefreshRequestDto
    {
        public required string RefreshToken { get; set; }
    }
}
