using FluentValidation;
using RentSmart.Application.DTOs.Reviews;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.Validators.Reviews
{
    public class CreateReviewDtoValidator : AbstractValidator<CreateReviewDto>
    {
        public CreateReviewDtoValidator() 
        {
            RuleFor(x => x.Rating).NotEmpty().InclusiveBetween(1, 5);

            RuleFor(x => x.Comment).NotEmpty();

            RuleFor(x => x.AccommodationId).NotEmpty();

            RuleFor(x => x.BookingId).NotEmpty();
        }
    }
}
