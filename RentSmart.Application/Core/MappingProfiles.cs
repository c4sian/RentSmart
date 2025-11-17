using AutoMapper;
using RentSmart.Application.DTOs.Accommodations;
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
            CreateMap<Accommodation, AccommodationDto>().ReverseMap();
            CreateMap<CreateAccommodationDto, Accommodation>();
            CreateMap<UpdateAccommodationDto, Accommodation>();
        }
    }
}
