using Microsoft.EntityFrameworkCore;
using Web2Projekat.Infrastructure.DBO;

namespace Web2Projekat.Infrastructure.DBContext
{
    public class ArtikliDbContext : DbContext
    {

        public ArtikliDbContext() { }
        public ArtikliDbContext(DbContextOptions<ArtikliDbContext> options) : base(options) { }

        public DbSet<PorudzbinaDBO> Porudbine { get; set; }
        public DbSet<ArtikalDBO> Artikli { get; set; }
        public DbSet<KorpaArtikalDBO> KorpaArtikli { get; set; }


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


            modelBuilder.Entity<PorudzbinaDBO>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_Id");

                entity.ToTable("Porudzbine");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Kupac)
                    .IsRequired();

                entity.Property(e => e.AdresaDostave)
                    .IsRequired();

                entity.Property(e => e.Komentar)
                    .IsRequired();

                entity.Property(e => e.DatumPorucivanja)
                   .IsRequired();

                entity
                    .HasMany(e => e.listaArtikla)
                    .WithOne(e => e.Porudzbina)
                    .HasForeignKey(e => e.PorudzbinaId);
            });
            
            modelBuilder.Entity<KorpaArtikalDBO>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_Id");

                entity.ToTable("KorpaArtikli");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Kolicina)
                    .IsRequired();

                entity.Property(e => e.PorudzbinaId)
                   .IsRequired();
                entity
                   .HasOne(e => e.Artikal);
            });

            modelBuilder.Entity<ArtikalDBO>(entitet =>
            {
                entitet.HasKey(e => e.ID)
                .HasName("PK_IDArikla");

                entitet.ToTable("Artikal");

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
