using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Accommodations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.Interfaces
{
    public interface IFavoritesRepository
    {
        Task<Result<List<AccommodationShortDto>>> GetAllAsync(string userId);
        Task<Result<Unit>> AddAsync(string userId, string accommodationId);
        Task<Result<Unit>> DeleteAsync(string userId, string accommodationId);
    }
}
