using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.DTOs.Reviews
{
    public class CreateReviewDto
    {
        public required int Rating { get; set; }
        public required string Comment { get; set; }
        public required string AccommodationId { get; set; }
        public required string BookingId { get; set; }
    }
}
