﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Web2Projekat.Infrastructure.DBContext;

#nullable disable

namespace Web2Projekat.Migrations
{
    [DbContext(typeof(KorisniciDbContext))]
    [Migration("20230916135932_NewDB")]
    partial class NewDB
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.11");

            modelBuilder.Entity("Web2Projekat.Infrastructure.DBO.KorisnikDBO", b =>
                {
                    b.Property<string>("KIme")
                        .HasColumnType("TEXT");

                    b.Property<string>("Adresa")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DatumRodjenja")
                        .HasColumnType("TEXT");

                    b.Property<string>("EmailAdresa")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Lozinka")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Slika")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Status")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Tip")
                        .HasColumnType("INTEGER");

                    b.HasKey("KIme")
                        .HasName("PK_Kime");

                    b.ToTable("Korisnici", (string)null);
                });
#pragma warning restore 612, 618
        }
    }
}
