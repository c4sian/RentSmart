using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Accommodations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.Interfaces
{
    public interface IAccommodationsRepository
    {
        Task<Result<List<AccommodationDto>>> GetAllAsync();
        Task<Result<AccommodationDto>> GetByIdAsync(string id);
        Task<Result<AccommodationDto>> CreateAsync(CreateAccommodationDto createAccommodationDto, string userId);
        Task<Result<Unit>> UpdateAsync(UpdateAccommodationDto updateAccommodationDto, ClaimsPrincipal user);
        Task<Result<Unit>> DeleteAsync(string id, ClaimsPrincipal user);
    }
}
