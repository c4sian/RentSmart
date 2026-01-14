using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.DTOs.Accommodations
{
    public class AccommodationShortDto
    {
        public string Id { get; set; } = "";
        public string Title { get; set; } = "";
        public string MainImageUrl { get; set; } = "";

        public string City { get; set; } = "";
        public string Street { get; set; } = "";

        public string Type { get; set; } = "";
        public decimal PricePerNight { get; set; }
    }
}
