using RentSmart.Application.DTOs.Bookings;
using RentSmart.Application.DTOs.Images;
using RentSmart.Application.DTOs.Reviews;
using RentSmart.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.DTOs.Accommodations
{
    public class AccommodationFullDto
    {
        public string Id { get; set; } = "";
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public string MainImageUrl { get; set; } = "";

        // location props
        public string Country { get; set; } = "";
        public string? StateOrCounty { get; set; }
        public string City { get; set; } = "";
        public string Street { get; set; } = "";
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        // general info props
        public string Type { get; set; } = "";
        public int GuestsNumber { get; set; }
        public decimal PricePerNight { get; set; }
        public string CheckIn { get; set; } = "";
        public string CheckOut { get; set; } = "";

        public List<ImageDto> Images { get; set; } = [];
        public List<int> AmenityIds { get; set; } = [];

        public string OwnerId { get; set; } = "";
        public DateTime DateCreated { get; set; }
    }
}
