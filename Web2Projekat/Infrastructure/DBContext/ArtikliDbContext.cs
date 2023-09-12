using Microsoft.EntityFrameworkCore;
using Web2Projekat.Infrastructure.DBO;

namespace Web2Projekat.Infrastructure.DBContext
{
    public class ArtikliDbContext : DbContext
    {

        public ArtikliDbContext() { }
        public ArtikliDbContext(DbContextOptions<ArtikliDbContext> options) : base(options) { }

        public DbSet<ArtikalDBO> Korisnici { get; set; }

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
            modelBuilder.Entity<ArtikalDBO>(entitet =>
            {
                entitet.HasKey(e => e.ID)
                .HasName("PK_IDArikla");
          
                entitet.ToTable("Artikli");

                entitet.Property(e => e.ID).ValueGeneratedOnAdd();

                entitet.Property(e => e.Naziv)
                .IsRequired();

                entitet.Property(e => e.Kolicina)
                .IsRequired();

                entitet.Property(e => e.Prodavac)
                .IsRequired();

                entitet.Property(e => e.Cena)
                .IsRequired();

                entitet.Property(e => e.Opis)
                .IsRequired();

                entitet.Property(e => e.Fotografija)
                .IsRequired();

            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
