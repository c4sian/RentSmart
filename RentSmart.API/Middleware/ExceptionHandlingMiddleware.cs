using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using RentSmart.API.Errors;

namespace RentSmart.API.Middleware
{
    public class ExceptionHandlingMiddleware(ILogger<ExceptionHandlingMiddleware> logger, IHostEnvironment env) : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleException(context, ex);
            }
        }

        private Task HandleException(HttpContext context, Exception ex)
        {
            logger.LogError(ex, ex.Message);
            context.Response.ContentType = "application/json";

            var response = ex switch
            {
                UnauthorizedAccessException => new ErrorResponse(
                    StatusCode: StatusCodes.Status401Unauthorized,
                    Message: "Unauthorised",
                    Details: env.IsDevelopment() ? ex.Message : null
                    ),

                KeyNotFoundException => new ErrorResponse(
                    StatusCode: StatusCodes.Status404NotFound,
                    Message: ex.Message,
                    Details: env.IsDevelopment() ? ex.Message : null),

                _ => new ErrorResponse(
                    StatusCode: StatusCodes.Status500InternalServerError,
                    Message: "An unexpected error occurred.",
                    Details: env.IsDevelopment() ? ex.Message : null)
            };

            context.Response.StatusCode = response.StatusCode;
            return context.Response.WriteAsJsonAsync(response);
        }

        //private static async Task HandleValidationException(HttpContext context, ValidationException ex)
        //{
        //    var validationErrors = new Dictionary<string, string[]>();

        //    if (ex.Errors is not null)
        //    {
        //        foreach (var error in ex.Errors)
        //        {
        //            if (validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
        //            {
        //                validationErrors[error.PropertyName] = existingErrors.Append(error.ErrorMessage).ToArray();
        //            }
        //            else
        //            {
        //                validationErrors[error.PropertyName] = [error.ErrorMessage];
        //            }
        //        }
        //    }

        //    context.Response.StatusCode = StatusCodes.Status400BadRequest;

        //    var validationProblemDetails = new ValidationProblemDetails(validationErrors)
        //    {
        //        Status = StatusCodes.Status400BadRequest,
        //        Type = "ValidationFailure",
        //        Title = "Validation error",
        //        Detail = "One or more validation errors occured."
        //    };

        //    await context.Response.WriteAsJsonAsync(validationProblemDetails);
        //}
    }
}
