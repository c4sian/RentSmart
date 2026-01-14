using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Bookings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.Interfaces
{
    public interface IBookingsRepository
    {
        Task<Result<List<BookedDateDto>>> GetBookedDatesAsync(string accommodationId);
        Task<Result<Unit>> CreateAsync(CreateBookingDto createBookingDto, string userId);
        Task<Result<Unit>> CancelAsync(string bookingId, string userId);
    }
}
