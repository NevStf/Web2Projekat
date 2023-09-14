using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web2Projekat.Migrations
{
    /// <inheritdoc />
    public partial class DodavanjeStatusa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Korisnici",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Korisnici");
        }
    }
}
