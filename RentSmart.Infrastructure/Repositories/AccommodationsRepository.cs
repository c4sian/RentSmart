using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RentSmart.Application.Core;
using RentSmart.Application.DTOs.Accommodations;
using RentSmart.Application.Interfaces;
using RentSmart.Domain;
using RentSmart.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Infrastructure.Repositories
{
    public class AccommodationsRepository(AppDbContext dbContext, IMapper mapper) : IAccommodationsRepository
    {
        public async Task<Result<List<AccommodationDto>>> GetAllAsync()
        {
            var accommodations = await dbContext.Accommodations.ToListAsync();

            return Result<List<AccommodationDto>>.Success(
                mapper.Map<List<AccommodationDto>>(accommodations));
        }

        public async Task<Result<AccommodationDto>> GetByIdAsync(string id)
        {
            var accommodation = await dbContext.Accommodations.FirstOrDefaultAsync(x => x.Id == id);

            if (accommodation == null) return Result<AccommodationDto>.Failure("Accommodation not found.", 404);

            return Result<AccommodationDto>.Success(
                mapper.Map<AccommodationDto>(accommodation));
        }
        public async Task<Result<Unit>> CreateAsync(CreateAccommodationDto createAccommodationDto)
        {
            var accommodation = mapper.Map<Accommodation>(createAccommodationDto);

            await dbContext.Accommodations.AddAsync(accommodation);
            var result = await dbContext.SaveChangesAsync() > 0;

            if (!result) return Result<Unit>.Failure("Failed to create the activity.", 400);

            return Result<Unit>.Success(Unit.Value);
        }

        public async Task<Result<Unit>> UpdateAsync(UpdateAccommodationDto updateAccommodationDto)
        {
            var accommodation = await dbContext.Accommodations.FirstOrDefaultAsync(x => x.Id == updateAccommodationDto.Id);

            if (accommodation == null) return Result<Unit>.Failure("Accommodation not found.", 404);

            mapper.Map(updateAccommodationDto, accommodation);

            var result = await dbContext.SaveChangesAsync() > 0;

            if (!result) return Result<Unit>.Failure("Failed to update the accommodation.", 400);

            return Result<Unit>.Success(Unit.Value);
        }

        public async Task<Result<Unit>> DeleteAsync(string id)
        {
            var accommodation = await dbContext.Accommodations.FirstOrDefaultAsync(x => x.Id == id);

            if (accommodation == null) return Result<Unit>.Failure("Accommodation not found.", 404);

            dbContext.Accommodations.Remove(accommodation);

            var result = await dbContext.SaveChangesAsync() > 0;

            if(!result) return Result<Unit>.Failure("Failed to delete the accommodation.", 400);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
