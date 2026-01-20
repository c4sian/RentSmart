using Microsoft.AspNetCore.Mvc.ModelBinding;
using RentSmart.Application.DTOs.Profiles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.DTOs.Reviews
{
    public class AccommodationReviewDto
    {
        public string Id { get; set; } = "";
        public int Rating { get; set; }
        public string Comment { get; set; } = "";
        public DateTime CreatedAt { get; set; }

        public ReviewerDto Reviewer { get; set; } = new ReviewerDto();
    }
}
