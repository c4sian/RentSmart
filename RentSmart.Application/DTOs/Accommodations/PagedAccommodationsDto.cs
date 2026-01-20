using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.DTOs.Accommodations
{
    public class PagedAccommodationsDto
    {
        public List<AccommodationShortDto> Accommodations { get; set; } = [];
        public int TotalCount { get; set; }
    }
}
