using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Bookings;
using RentSmart.Application.Interfaces;
using RentSmart.Domain;
using RentSmart.Infrastructure.Persistence;
using RentSmart.Infrastructure.Persistence.IntermediaryTables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Infrastructure.Repositories
{
    public class BookingsRepository(AppDbContext dbContext, IMapper mapper) : IBookingsRepository
    {
        public async Task<Result<List<BookedDateDto>>> GetBookedDatesAsync(string accommodationId)
        {
            var accommodation = await dbContext.Accommodations.Include(x => x.Bookings)
                .FirstOrDefaultAsync(x => x.Id == accommodationId);
            if (accommodation == null) return Result<List<BookedDateDto>>.Failure("Accommodation not found.", 404);

            var bookings = accommodation.Bookings.Where(x => x.Status == "Confirmed")
                .ToList();

            var bookedDatesDto = mapper.Map<List<BookedDateDto>>(bookings);

            return Result<List<BookedDateDto>>.Success(bookedDatesDto);
        }

        public async Task<Result<Unit>> CreateAsync(CreateBookingDto createBookingDto, string userId)
        {
            var booking = mapper.Map<Booking>(createBookingDto);

            booking.UserId = userId;
            booking.Status = "Confirmed";

            await dbContext.Bookings.AddAsync(booking);

            var userBooking = new UserBooking
            {
                UserId = userId,
                BookingId = booking.Id,
            };
            await dbContext.UserBookings.AddAsync(userBooking);

            var result = await dbContext.SaveChangesAsync() > 0;

            if (!result) return Result<Unit>.Failure("Failed to create the booking", 400);

            return Result<Unit>.Success(Unit.Value);
        }

        public async Task<Result<Unit>> CancelAsync(string bookingId, string userId)
        {
            var booking = await dbContext.Bookings.FirstOrDefaultAsync(x => x.Id == bookingId);
            if (booking == null) return Result<Unit>.Failure("Booking not found", 404);

            if (booking.UserId != userId) return Result<Unit>.Failure("Forbidden access", 403);

            booking.Status = "Cancelled";

            var result = await dbContext.SaveChangesAsync() > 0;
            if (!result) return Result<Unit>.Failure("Failed to delete the booking", 400);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
