using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Accommodations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.Interfaces
{
    public interface IAccommodationsRepository
    {
        Task<Result<List<AccommodationDto>>> GetAllAsync();
        Task<Result<AccommodationDto>> GetByIdAsync(string id);
        Task<Result<Unit>> CreateAsync(CreateAccommodationDto createAccommodationDto);
        Task<Result<Unit>> UpdateAsync(UpdateAccommodationDto updateAccommodationDto);
        Task<Result<Unit>> DeleteAsync(string id);
    }
}
