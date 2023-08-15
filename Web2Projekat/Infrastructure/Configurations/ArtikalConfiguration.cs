using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web2Projekat.Models;

namespace Web2Projekat.Infrastructure.Configurations
{
    public class ArtikalConfiguration : IEntityTypeConfiguration<Artikal>
    {
        public void Configure(EntityTypeBuilder<Artikal> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.ID).ValueGeneratedOnAdd();

            builder.Property(x => x.Naziv).HasMaxLength(30);

        }
    }
}
