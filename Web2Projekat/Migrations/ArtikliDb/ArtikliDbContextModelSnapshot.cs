﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Web2Projekat.Infrastructure.DBContext;

#nullable disable

namespace Web2Projekat.Migrations.ArtikliDb
{
    [DbContext(typeof(ArtikliDbContext))]
    partial class ArtikliDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.11");

            modelBuilder.Entity("Web2Projekat.Infrastructure.DBO.ArtikalDBO", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<float>("Cena")
                        .HasColumnType("REAL");

                    b.Property<string>("Fotografija")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Kolicina")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Opis")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Prodavac")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("ID")
                        .HasName("PK_IDArikla");

                    b.ToTable("Artikli", (string)null);
                });
#pragma warning restore 612, 618
        }
    }
}