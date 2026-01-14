using RentSmart.Application.DTOs.Geocoding;
using RentSmart.Application.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace RentSmart.Infrastructure.Geocoding
{
    public class GeocodingService : IGeocodingService
    {
        private readonly HttpClient _httpClient;

        public GeocodingService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<CoordinatesDto?> GeocodeAsync(string address)
        {
            var url = "https://nominatim.openstreetmap.org/search" +
                $"?q={Uri.EscapeDataString(address)}" +
                "&format=json" +
                "&limit=1";

            var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.UserAgent.ParseAdd(
                "RentSmart/1.0 (casian.stirbe@yahoo.com)"
            );
            
            var response = await _httpClient.SendAsync(request);
            if (!response.IsSuccessStatusCode) return null;

            var data = await response.Content.ReadFromJsonAsync<NominatimResult>();

            if (data == null) return null;

            double.TryParse(data.lat, NumberStyles.Float, CultureInfo.InvariantCulture, out var lat);
            double.TryParse(data.lon, NumberStyles.Float, CultureInfo.InvariantCulture, out var lon);

            return new CoordinatesDto
            {
                Latitude = lat,
                Longitude = lon,
            };
        }
    }
}
