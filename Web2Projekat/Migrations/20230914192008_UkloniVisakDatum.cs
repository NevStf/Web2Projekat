using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web2Projekat.Migrations
{
    /// <inheritdoc />
    public partial class UkloniVisakDatum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DRodjenja",
                table: "Korisnici");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DRodjenja",
                table: "Korisnici",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
