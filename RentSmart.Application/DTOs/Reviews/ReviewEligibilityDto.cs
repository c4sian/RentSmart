using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.DTOs.Reviews
{
    public class ReviewEligibilityDto
    {
        public bool CanReview { get; set; }
        public string BookingId { get; set; } = "";
    }
}
