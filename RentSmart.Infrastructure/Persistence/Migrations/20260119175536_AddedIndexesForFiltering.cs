using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RentSmart.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedIndexesForFiltering : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Bookings_AccommodationId",
                table: "Bookings");

            migrationBuilder.AlterColumn<string>(
                name: "Type",
                table: "Accommodations",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_AccommodationId_CheckInDate_CheckOutDate",
                table: "Bookings",
                columns: new[] { "AccommodationId", "CheckInDate", "CheckOutDate" });

            migrationBuilder.CreateIndex(
                name: "IX_Accommodations_AverageRating",
                table: "Accommodations",
                column: "AverageRating");

            migrationBuilder.CreateIndex(
                name: "IX_Accommodations_PricePerNight",
                table: "Accommodations",
                column: "PricePerNight");

            migrationBuilder.CreateIndex(
                name: "IX_Accommodations_Type",
                table: "Accommodations",
                column: "Type");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Bookings_AccommodationId_CheckInDate_CheckOutDate",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Accommodations_AverageRating",
                table: "Accommodations");

            migrationBuilder.DropIndex(
                name: "IX_Accommodations_PricePerNight",
                table: "Accommodations");

            migrationBuilder.DropIndex(
                name: "IX_Accommodations_Type",
                table: "Accommodations");

            migrationBuilder.AlterColumn<string>(
                name: "Type",
                table: "Accommodations",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_AccommodationId",
                table: "Bookings",
                column: "AccommodationId");
        }
    }
}
