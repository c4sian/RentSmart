using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Domain
{
    public class Review
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public int Rating { get; set; }
        public string Comment { get; set; } = default!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string AccommodationId { get; set; } = default!;
        public string UserId { get; set; } = default!;
        public string BookingId { get; set; } = default!;

        public Accommodation Accommodation { get; set; } = default!;
    }
}
