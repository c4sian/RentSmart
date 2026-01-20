using FluentValidation;
using RentSmart.Application.DTOs.Bookings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.Validators.Bookings
{
    public class CreateBookingDtoValidator : AbstractValidator<CreateBookingDto>
    {
        public CreateBookingDtoValidator() 
        { 
            RuleFor(x => x.AccommodationId).NotEmpty();

            RuleFor(x => x.CheckInDate).NotEmpty();

            RuleFor(x => x.CheckOutDate).NotEmpty().GreaterThan(x => x.CheckInDate);
        }
    }
}
