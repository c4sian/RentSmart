using RentSmart.Domain;
using RentSmart.Infrastructure.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Infrastructure.Persistence.IntermediaryTables
{
    public class ListedAccommodation
    {
        public string UserId { get; set; } = default!;
        public AppUser User { get; set; } = default!;

        public string AccommodationId { get; set; } = default!;
        public Accommodation Accommodation { get; set; } = default!;
    }
}
