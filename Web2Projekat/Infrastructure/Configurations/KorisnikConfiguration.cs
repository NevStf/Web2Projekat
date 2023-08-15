using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web2Projekat.Models;

namespace Web2Projekat.Infrastructure.Configurations
{
    public class KorisnikConfiguration : IEntityTypeConfiguration<Korisnik>
    {
        public void Configure(EntityTypeBuilder<Korisnik> builder)
        {
            builder.HasKey(x => x.KIme);

            
        }
    }
}
