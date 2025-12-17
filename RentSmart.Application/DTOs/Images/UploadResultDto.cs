using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.DTOs.Photos
{
    public class UploadResultDto
    {
        public required string Url { get; set; }
        public required string PublicId { get; set; }
        public long Bytes { get; set; }
    }
}
