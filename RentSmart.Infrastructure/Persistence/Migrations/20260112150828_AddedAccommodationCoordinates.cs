using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RentSmart.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedAccommodationCoordinates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Accommodations",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Accommodations",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Accommodations");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Accommodations");
        }
    }
}
