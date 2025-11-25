using RentSmart.Infrastructure.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Infrastructure.Security
{
    public class RefreshToken
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Token { get; set; } = default!;
        public DateTime ExpiresAt { get; set; }
        public string UserId { get; set; } = default!;

        public AppUser User { get; set; }
    }
}
