using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.DTOs.Accommodations
{
    public class CreateAccommodationDto
    {
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";

        public string Country { get; set; } = "";
        public string? StateOrCounty { get; set; }
        public string City { get; set; } = "";
        public string Street { get; set; } = "";

        public string Type { get; set; } = "";
        public int GuestsNumber { get; set; }
        public decimal PricePerNight { get; set; }
        public string CheckIn { get; set; } = "";
        public string CheckOut { get; set; } = "";
        public List<int> AmenityIds { get; set; } = [];
    }
}
