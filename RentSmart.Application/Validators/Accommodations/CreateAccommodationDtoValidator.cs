using FluentValidation;
using RentSmart.Application.DTOs.Accommodations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.Validators.Accommodations
{
    public class CreateAccommodationDtoValidator : AbstractValidator<CreateAccommodationDto>
    {
        public CreateAccommodationDtoValidator()
        {
            RuleFor(x => x.Title).NotEmpty().MaximumLength(100);

            RuleFor(x => x.Description).NotEmpty().MinimumLength(100);

            RuleFor(x => x.Country).NotEmpty();

            RuleFor(x => x.City).NotEmpty();

            RuleFor(x => x.Street).NotEmpty();

            RuleFor(x => x.Type).NotEmpty();

            RuleFor(x => x.GuestsNumber).NotEmpty().GreaterThan(0);

            RuleFor(x => x.PricePerNight).NotEmpty().GreaterThan(0).LessThanOrEqualTo(1000);

            RuleFor(x => x.CheckIn).NotEmpty();

            RuleFor(x => x.CheckOut).NotEmpty();

            RuleFor(x => x.AmenityIds).NotEmpty().Must(ids => ids.Count <= 16)
                .WithMessage("Too many amenities. Please revise the form.");
            RuleFor(x => x.AmenityIds).Must(ids => ids.Distinct().Count() == ids.Count)
                .WithMessage("Duplicate amenities are not allowed");
            RuleForEach(x => x.AmenityIds).InclusiveBetween(1, 16)
                .WithMessage("Amenity id must be between 1 and 16.");
        }
    }
}
