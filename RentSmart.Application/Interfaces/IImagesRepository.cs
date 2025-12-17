using Microsoft.AspNetCore.Http;
using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Images;
using RentSmart.Application.DTOs.Photos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Application.Interfaces
{
    public interface IImagesRepository
    {
        Task<Result<List<ImageDto>>> GetImages(string accommodationId);
        Task<Result<UploadResultDto>> AddImage(IFormFile file, string accommodationId, ClaimsPrincipal user);
    }
}
