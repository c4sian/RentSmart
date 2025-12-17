using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Domain
{
    public class Booking
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; } = default!;

        public string UserId { get; set; } = default!;

        public string AccommodationId { get; set; } = default!;
        public Accommodation Accommodation { get; set; } = default!;
    }
}
