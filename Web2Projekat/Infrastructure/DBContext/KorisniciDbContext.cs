using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using Web2Projekat.Infrastructure.DBO;

namespace Web2Projekat.Infrastructure.DBContext
{
    public class KorisniciDbContext : DbContext
    {
        public KorisniciDbContext() { }
        public KorisniciDbContext(DbContextOptions<KorisniciDbContext> options) : base(options) { }

        public DbSet<KorisnikDBO> Korisnici { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var builder = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json");

                IConfiguration configuration = builder.Build();

                var connectionString = configuration.GetConnectionString("BazaPodataka");

                optionsBuilder.UseSqlite(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<KorisnikDBO>(entitet =>
            {
                entitet.HasKey(e => e.KIme)
                .HasName("PK_Kime");

                entitet.ToTable("Korisnici");

                entitet.Property(e => e.Tip)
                .IsRequired();

                entitet.Property(e => e.Ime)
                .IsRequired();

                entitet.Property(e => e.Prezime)
                .IsRequired();

                entitet.Property(e => e.EmailAdresa)
                .IsRequired();

                entitet.Property(e => e.DatumRodjenja)
                .IsRequired();

                entitet.Property(e => e.Lozinka)
                .IsRequired();

                entitet.Property(e => e.Slika)
                .IsRequired();
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
