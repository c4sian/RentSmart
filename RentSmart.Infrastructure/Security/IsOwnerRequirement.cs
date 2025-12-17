using Microsoft.AspNetCore.Authorization;
using RentSmart.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Infrastructure.Security
{
    public class IsOwnerRequirement : IAuthorizationRequirement
    {

    }

    public class IsOwnerHandler : AuthorizationHandler<IsOwnerRequirement, Accommodation>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            IsOwnerRequirement requirement, Accommodation resource)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (resource.OwnerId == userId)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
