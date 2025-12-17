using Microsoft.AspNetCore.Identity;
using RentSmart.Domain;
using RentSmart.Infrastructure.Persistence.IntermediaryTables;

namespace RentSmart.Infrastructure.Identity
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; } = default!;
        public string? ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // navigation
        public ICollection<ListedAccommodation> ListedAccommodations { get; set; } = [];
        public ICollection<FavoriteAccommodation> FavoriteAccommodations { get; set; } = [];
        public ICollection<UserBooking> Bookings { get; set; } = [];
        public ICollection<UserReview> Reviews { get; set; } = [];
    }
}
