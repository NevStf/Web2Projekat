using Web2Projekat.Infrastructure.DBO;
using Web2Projekat.Models;
using AutoMapper;
using Web2Projekat.Models.Helpers;

namespace Web2Projekat.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Korisnik, KorisnikDBO>().ReverseMap();
            CreateMap<Porudzbine, PorudzbinaDBO>().ReverseMap();
            CreateMap<Artikal, ArtikalDBO>().ReverseMap();
            CreateMap<KorpaArtikal, KorpaArtikalDBO>().ReverseMap();
        }
    }
}
