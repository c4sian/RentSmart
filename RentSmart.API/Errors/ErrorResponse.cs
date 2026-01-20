namespace RentSmart.API.Errors
{
    public record ErrorResponse(
        int StatusCode,
        string Message,
        string? Details
        );
}
