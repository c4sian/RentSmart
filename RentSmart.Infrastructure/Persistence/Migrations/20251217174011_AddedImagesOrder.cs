using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RentSmart.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedImagesOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrderIndex",
                table: "AccommodationImages",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderIndex",
                table: "AccommodationImages");
        }
    }
}
