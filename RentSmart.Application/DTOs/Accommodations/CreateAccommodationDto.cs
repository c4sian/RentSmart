using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.DTOs.Accommodations
{
    public class CreateAccommodationDto
    {
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string Location { get; set; }
        public required decimal PricePerNight { get; set; }
        public required string Type { get; set; }
    }
}
