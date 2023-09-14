using Web2Projekat.Infrastructure.DBO;
using Web2Projekat.Models;
using AutoMapper;

namespace Web2Projekat.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Korisnik, KorisnikDBO>().ReverseMap();
        }
    }
}
