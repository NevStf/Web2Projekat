using Microsoft.EntityFrameworkCore;
using Web2Projekat.Models;

namespace Web2Projekat.Infrastructure
{
    public class NevenaTeleshopDbContext:DbContext
    {
        public DbSet<Korisnik> Korisniks { get; set; }
        public DbSet<Artikal> Artikals { get; set; }
        public DbSet<Porudzbine> Porudzbines { get; set; }

        public NevenaTeleshopDbContext(DbContextOptions options) : base(options)
        {}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(NevenaTeleshopDbContext).Assembly);
        }

    }
}
