using AutoMapper;
using RentSmart.Application.DTOs.Accommodations;
using RentSmart.Application.DTOs.Bookings;
using RentSmart.Application.DTOs.Images;
using RentSmart.Application.DTOs.Reviews;
using RentSmart.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Accommodation, AccommodationShortDto>();
            CreateMap<Accommodation, AccommodationFullDto>()
                .ForMember(x => x.AmenityIds, opt => opt.MapFrom(p => p.Amenities.Select(a => a.Id)));
            CreateMap<CreateAccommodationDto, Accommodation>();
            CreateMap<UpdateAccommodationDto, Accommodation>();

            CreateMap<AccommodationImage, ImageDto>();

            CreateMap<Booking, BookedDateDto>();
            CreateMap<Booking, UserBookingDto>();
            CreateMap<CreateBookingDto, Booking>();

            CreateMap<CreateReviewDto, Review>();
            
        }
    }
}
