using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.DTOs.Accommodations
{
    public class AccommodationFiltersDto
    {
        public string? Destination { get; set; }
        public DateTime? CheckIn { get; set; }
        public DateTime? CheckOut { get; set; }
        public int? MaxPrice { get; set; }
        public string? Type { get; set; }
        public int? MinRating { get; set; }

        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 5;
    }
}
