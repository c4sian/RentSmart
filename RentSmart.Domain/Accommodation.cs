using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Domain
{
    public class Accommodation
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Title { get; set; } = default!;
        public string Description { get; set; } = default!;
        public string Location { get; set; } = default!;
        public decimal PricePerNight { get; set; }
        public string Type { get; set; } = default!;
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    }
}
