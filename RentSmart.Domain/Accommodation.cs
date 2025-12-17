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

        // location props
        public string Country { get; set; } = default!;
        public string? StateOrCounty { get; set; }
        public string City { get; set; } = default!;
        public string Street { get; set; } = default!;

        // general info props
        public string Type { get; set; } = default!;
        public int GuestsNumber { get; set; }
        public decimal PricePerNight { get; set; }
        public string CheckIn { get; set; } = default!;
        public string CheckOut { get; set; } = default!;

        public string OwnerId { get; set; } = default!;
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;

        // nav props
        public ICollection<AccommodationImage> Images { get; set; } = [];
        public ICollection<Amenity> Amenities { get; set; } = [];
        public ICollection<Booking> Bookings { get; set; } = [];
        public ICollection<Review> Reviews { get; set; } = [];
    }
}
