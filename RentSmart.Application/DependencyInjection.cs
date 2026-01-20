using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.Extensions.DependencyInjection;
using RentSmart.Application.Core;
using RentSmart.Application.Validators.Accommodations;
using RentSmart.Application.Validators.Auth;
using RentSmart.Application.Validators.Bookings;
using RentSmart.Application.Validators.Reviews;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            services.AddFluentValidationAutoValidation();
            services.AddFluentValidationClientsideAdapters();

            services.AddValidatorsFromAssemblyContaining<CreateAccommodationDtoValidator>();
            services.AddValidatorsFromAssemblyContaining<CreateBookingDtoValidator>();
            services.AddValidatorsFromAssemblyContaining<CreateReviewDtoValidator>();
            services.AddValidatorsFromAssemblyContaining<RegisterRequestDtoValidator>();
            services.AddValidatorsFromAssemblyContaining<LoginRequestDtoValidator>();

            return services;
        }
    }
}
