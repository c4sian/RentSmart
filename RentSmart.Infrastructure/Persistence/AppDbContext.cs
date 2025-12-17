using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RentSmart.Domain;
using RentSmart.Infrastructure.Identity;
using RentSmart.Infrastructure.Persistence.IntermediaryTables;
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
        public DbSet<AccommodationImage> AccommodationImages { get; set; }
        public DbSet<Amenity> Amenities { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        public DbSet<ListedAccommodation> ListedAccommodations { get; set; }
        public DbSet<FavoriteAccommodation> FavoriteAccommodations { get; set; }
        public DbSet<UserBooking> UserBookings { get; set; }
        public DbSet<UserReview> UserReviews { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Accommodation>()
                .HasMany(x => x.Images)
                .WithOne(x => x.Accommodation)
                .HasForeignKey(x => x.AccommodationId);

            builder.Entity<Accommodation>()
                .HasMany(p => p.Amenities)
                .WithMany(a => a.Accommodations)
                .UsingEntity(j => j.ToTable("AccommodationAmenities"));

            builder.Entity<Accommodation>()
                .HasMany(x => x.Bookings)
                .WithOne(x => x.Accommodation)
                .HasForeignKey(x => x.AccommodationId);

            builder.Entity<Accommodation>()
                .HasMany(x => x.Reviews)
                .WithOne(x => x.Accommodation)
                .HasForeignKey(x => x.AccommodationId);

            builder.Entity<ListedAccommodation>()
                .HasKey(x => new { x.UserId, x.AccommodationId });

            builder.Entity<ListedAccommodation>()
                .HasOne(x => x.User)
                .WithMany(x => x.ListedAccommodations)
                .HasForeignKey(x => x.UserId);

            builder.Entity<ListedAccommodation>()
                .HasOne(x => x.Accommodation)
                .WithMany()
                .HasForeignKey(x => x.AccommodationId);

            builder.Entity<FavoriteAccommodation>()
                .HasKey(x => new { x.UserId, x.AccommodationId });

            builder.Entity<FavoriteAccommodation>()
                .HasOne(x => x.User)
                .WithMany(x => x.FavoriteAccommodations)
                .HasForeignKey(x => x.UserId);

            builder.Entity<FavoriteAccommodation>()
                .HasOne(x => x.Accommodation)
                .WithMany()
                .HasForeignKey(x => x.AccommodationId);

            builder.Entity<UserBooking>()
                .HasKey(x => new { x.UserId, x.BookingId });

            builder.Entity<UserBooking>()
                .HasOne(x => x.User)
                .WithMany(x => x.Bookings)
                .HasForeignKey(x => x.UserId);

            builder.Entity<UserBooking>()
                .HasOne(x => x.Booking)
                .WithMany()
                .HasForeignKey(x => x.BookingId);

            builder.Entity<UserReview>()
                .HasKey(x => new { x.UserId, x.ReviewId });

            builder.Entity<UserReview>()
                .HasOne(x => x.User)
                .WithMany(x => x.Reviews)
                .HasForeignKey(x => x.UserId);

            builder.Entity<UserReview>()
                .HasOne(x => x.Review)
                .WithMany()
                .HasForeignKey(x => x.ReviewId);
        }
    }
}
