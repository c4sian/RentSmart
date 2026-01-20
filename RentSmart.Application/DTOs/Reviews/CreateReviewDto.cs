using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.DTOs.Reviews
{
    public class CreateReviewDto
    {
        public int Rating { get; set; }
        public string Comment { get; set; } = "";
        public string AccommodationId { get; set; } = "";
        public string BookingId { get; set; } = "";
    }
}
