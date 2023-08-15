using Microsoft.AspNetCore.DataProtection.XmlEncryption;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web2Projekat.Models;

namespace Web2Projekat.Infrastructure.Configurations
{
    public class PorudzbinaConfiguartion : IEntityTypeConfiguration<Porudzbine>

    {
        public void Configure(EntityTypeBuilder<Porudzbine> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

        }
    }
}
