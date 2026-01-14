using RentSmart.Application.DTOs.Accommodations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.DTOs.Bookings
{
    public class UserBookingDto
    {
        public string Id { get; set; } = "";
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public string Status { get; set; } = "";

        public AccommodationShortDto Accommodation { get; set; } = new AccommodationShortDto();
    }
}
