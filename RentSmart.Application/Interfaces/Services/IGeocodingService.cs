using RentSmart.Application.DTOs.Geocoding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.Interfaces.Services
{
    public interface IGeocodingService
    {
        Task<CoordinatesDto?> GeocodeAsync(string address);
    }
}
