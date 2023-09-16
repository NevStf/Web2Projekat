using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web2Projekat.Migrations.ArtikliDb
{
    /// <inheritdoc />
    public partial class PorudzbineArtikliKorpa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "KolicinaNaStanju",
                table: "Artikli",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Artikal",
                columns: table => new
                {
                    ID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Naziv = table.Column<string>(type: "TEXT", nullable: false),
                    Prodavac = table.Column<string>(type: "TEXT", nullable: false),
                    Cena = table.Column<double>(type: "REAL", nullable: false),
                    Kolicina = table.Column<int>(type: "INTEGER", nullable: false),
                    Opis = table.Column<string>(type: "TEXT", nullable: false),
                    Fotografija = table.Column<string>(type: "TEXT", nullable: false),
                    KolicinaNaStanju = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Artikal", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Porudzbine",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Komentar = table.Column<string>(type: "TEXT", nullable: false),
                    AdresaDostave = table.Column<string>(type: "TEXT", nullable: false),
                    DatumPorucivanja = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Kupac = table.Column<string>(type: "TEXT", nullable: false),
                    UkupnaCena = table.Column<double>(type: "REAL", nullable: false),
                    VremeDostave = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Id", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "KorpaArtikli",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ArtikalId = table.Column<int>(type: "INTEGER", nullable: false),
                    Kolicina = table.Column<int>(type: "INTEGER", nullable: false),
                    Cena = table.Column<double>(type: "REAL", nullable: false),
                    PorudzbinaId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Id", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KorpaArtikli_Artikal_ArtikalId",
                        column: x => x.ArtikalId,
                        principalTable: "Artikal",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_KorpaArtikli_Porudzbine_PorudzbinaId",
                        column: x => x.PorudzbinaId,
                        principalTable: "Porudzbine",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_KorpaArtikli_ArtikalId",
                table: "KorpaArtikli",
                column: "ArtikalId");

            migrationBuilder.CreateIndex(
                name: "IX_KorpaArtikli_PorudzbinaId",
                table: "KorpaArtikli",
                column: "PorudzbinaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KorpaArtikli");

            migrationBuilder.DropTable(
                name: "Artikal");

            migrationBuilder.DropTable(
                name: "Porudzbine");

            migrationBuilder.DropColumn(
                name: "KolicinaNaStanju",
                table: "Artikli");
        }
    }
}
