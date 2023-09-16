using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web2Projekat.Migrations.ArtikliDb
{
    /// <inheritdoc />
    public partial class zzzz : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Artikli");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Artikal",
                table: "Artikal");

            migrationBuilder.AddPrimaryKey(
                name: "PK_IDArikla",
                table: "Artikal",
                column: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_IDArikla",
                table: "Artikal");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Artikal",
                table: "Artikal",
                column: "ID");

            migrationBuilder.CreateTable(
                name: "Artikli",
                columns: table => new
                {
                    ID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Cena = table.Column<float>(type: "REAL", nullable: false),
                    Fotografija = table.Column<string>(type: "TEXT", nullable: false),
                    Kolicina = table.Column<int>(type: "INTEGER", nullable: false),
                    KolicinaNaStanju = table.Column<int>(type: "INTEGER", nullable: false),
                    Naziv = table.Column<string>(type: "TEXT", nullable: false),
                    Opis = table.Column<string>(type: "TEXT", nullable: false),
                    Prodavac = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IDArikla", x => x.ID);
                });
        }
    }
}
