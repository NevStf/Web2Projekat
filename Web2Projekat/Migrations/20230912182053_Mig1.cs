using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web2Projekat.Migrations
{
    /// <inheritdoc />
    public partial class Mig1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Korisnici",
                columns: table => new
                {
                    KIme = table.Column<string>(type: "TEXT", nullable: false),
                    Lozinka = table.Column<string>(type: "TEXT", nullable: false),
                    Ime = table.Column<string>(type: "TEXT", nullable: false),
                    Prezime = table.Column<string>(type: "TEXT", nullable: false),
                    Adresa = table.Column<string>(type: "TEXT", nullable: false),
                    EmailAdresa = table.Column<string>(type: "TEXT", nullable: false),
                    DatumRodjenja = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DRodjenja = table.Column<string>(type: "TEXT", nullable: false),
                    Tip = table.Column<int>(type: "INTEGER", nullable: false),
                    Slika = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kime", x => x.KIme);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Korisnici");
        }
    }
}
