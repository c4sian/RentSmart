using Microsoft.AspNetCore.Http;
using RentSmart.Application.DTOs.Photos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.Interfaces
{
    public interface IImageService
    {
        Task<UploadResultDto> UploadPhoto(IFormFile file, string folder);
        Task<string> DeletePhoto(string publicId);
    }
}
