using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.DTOs.Profiles
{
    public class ReviewerDto
    {
        public string Id { get; set; } = "";
        public string DisplayName { get; set; } = "";
        public string? ImageUrl { get; set; }
    }
}
