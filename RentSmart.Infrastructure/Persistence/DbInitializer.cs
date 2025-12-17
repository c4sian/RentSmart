using Microsoft.AspNetCore.Identity;
using RentSmart.Domain;
using RentSmart.Infrastructure.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Infrastructure.Persistence
{
    public class DbInitializer
    {
        public static async Task SeedRolesAndAdmin(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (!await roleManager.RoleExistsAsync("Admin"))
                await roleManager.CreateAsync(new IdentityRole("Admin"));
            if (!await roleManager.RoleExistsAsync("User"))
                await roleManager.CreateAsync(new IdentityRole("User"));

            var admin = await userManager.FindByEmailAsync("admin@rentsmart.com");
            if (admin == null)
            {
                admin = new AppUser
                {
                    UserName = "admin@rentsmart.com",
                    Email = "admin@rentsmart.com",
                    DisplayName = "Admin",
                };
                await userManager.CreateAsync(admin, "Admin123!");
                await userManager.AddToRoleAsync(admin, "Admin");
            }
        }

        public static async Task SeedAmenities(AppDbContext dbContext)
        {
            if (dbContext.Amenities.Any()) return;

            var amenities = new List<Amenity>
            {
                new Amenity
                {
                    Name = "Wi-Fi"
                },
                new Amenity
                {
                    Name = "Parking"
                },
                new Amenity
                {
                    Name = "AC"
                },
                new Amenity
                {
                    Name = "Heating"
                },
                new Amenity
                {
                    Name = "TV"
                },
                new Amenity
                {
                    Name = "Fully Equipped Kitchen"
                },
                new Amenity
                {
                    Name = "Washing Machine"
                },
                new Amenity
                {
                    Name = "Dryer"
                },
                new Amenity
                {
                    Name = "Hair Dryer"
                },
                new Amenity
                {
                    Name = "Toiletries (soap,shampoo,towels)"
                },
                new Amenity
                {
                    Name = "Swimming Pool"
                },
                new Amenity
                {
                    Name = "BBQ/Grill"
                },
                new Amenity
                {
                    Name = "Balcony/Terrace"
                },
                new Amenity
                {
                    Name = "Garden / Backyard"
                },
                new Amenity
                {
                    Name = "Smoke Detector"
                },
                new Amenity
                {
                    Name = "Security System"
                },
            };

            await dbContext.Amenities.AddRangeAsync(amenities);
            await dbContext.SaveChangesAsync();
        }

        /*
        public static async Task SeedAccommodations(AppDbContext dbContext)
        {
            if (dbContext.Accommodations.Any()) return;

            var accommodations = new List<Accommodation>
            {
                new Accommodation
                {
                    Title="",
                    Description="",
                    Country = "",
                    StateOrCounty = "",
                    City = "",
                    Street = "",
                    Type = "",
                    GuestsNumber = 0,
                    PricePerNight = 0,
                    CheckIn = "",
                    CheckOut = "",
                    OwnerId = ""
                }
            };
        }
        */
    }
}
