using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.DTOs.Accommodations
{
    public class UpdateAccommodationDto
    {
        public required string Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }

        public required string Country { get; set; }
        public string? StateOrCounty { get; set; }
        public required string City { get; set; }
        public required string Street { get; set; }

        public required string Type { get; set; }
        public int GuestsNumber { get; set; }
        public decimal PricePerNight { get; set; }
        public required string CheckIn { get; set; }
        public required string CheckOut { get; set; }
        public required List<int> AmenityIds { get; set; }
    }
}
