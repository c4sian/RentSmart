using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RentSmart.Domain;
using RentSmart.Infrastructure.Identity;
using RentSmart.Infrastructure.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Infrastructure.Persistence
{
    public class AppDbContext(DbContextOptions options) : IdentityDbContext<AppUser>(options)
    {
        public DbSet<Accommodation> Accommodations { get; set; }

        public DbSet<RefreshToken> RefreshTokens { get; set; }
    }
}
