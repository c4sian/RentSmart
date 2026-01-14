using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.Interfaces
{
    public interface IUsersRepository
    {
        Task<Result<UserProfileDto>> GetMeAsync(string userId);
        Task<Result<OwnerDto>> GetOwnerAsync(string ownerId);
    }
}
