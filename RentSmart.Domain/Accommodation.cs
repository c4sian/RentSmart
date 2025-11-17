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
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string Location { get; set; }
        public required decimal PricePerNight { get; set; }
        public required string Type { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    }
}
