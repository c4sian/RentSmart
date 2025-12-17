using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Domain
{
    public class Amenity
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;

        public ICollection<Accommodation> Accommodations { get; set; } = [];
    }
}
