using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Domain
{
    public class Accommodation
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Title { get; set; } = default!;
        public string Description { get; set; } = default!;
        public string? MainImageUrl { get; set; }   

        // location props
        public string Country { get; set; } = default!;
        public string? StateOrCounty { get; set; }
        public string City { get; set; } = default!;
        public string Street { get; set; } = default!;
        public double Latitude { get; set; } = default!;
        public double Longitude { get; set; } = default!;

        // general info props
        public string Type { get; set; } = default!;
        public int GuestsNumber { get; set; } = 1;
        public decimal PricePerNight { get; set; } = default!;
        public string CheckIn { get; set; } = default!;
        public string CheckOut { get; set; } = default!;

        public string OwnerId { get; set; } = default!;
        public decimal AverageRating { get; set; } = 0;
        public int ReviewsCount { get; set; } = 0;
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;

        // nav props
        public ICollection<Amenity> Amenities { get; set; } = [];
        public ICollection<AccommodationImage> Images { get; set; } = [];
        public ICollection<Booking> Bookings { get; set; } = [];
        public ICollection<Review> Reviews { get; set; } = [];
    }
}
