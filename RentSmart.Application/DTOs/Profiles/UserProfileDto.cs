using RentSmart.Application.DTOs.Accommodations;
using RentSmart.Application.DTOs.Bookings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.DTOs.Profiles
{
    public class UserProfileDto
    {
        public string UserId { get; set; } = "";
        public string DisplayName { get; set; } = "";
        public string Email { get; set; } = "";

        public List<AccommodationShortDto> ListedAccommodations { get; set; } = [];
        public List<AccommodationShortDto> FavoriteAccommodations { get; set; } = [];
        public List<UserBookingDto> UserBookings { get; set; } = [];
    }
}
