using Microsoft.AspNetCore.Identity;
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
            if(admin == null)
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
    }
}
