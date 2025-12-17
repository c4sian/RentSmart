using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace RentSmart.Domain
{
    public class AccommodationImage
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Url { get; set; } = default!;
        public string PublicId { get; set; } = default!;
        public long Bytes { get; set; }
        public string AccommodationId { get; set; } = default!;

        [JsonIgnore]
        public Accommodation Accommodation { get; set; } = default!;
    }
}
