using AutoMapper;
using Web2Projekat.Dto;
using Web2Projekat.Models;
using Web2Projekat.Models.Helpers;

namespace Web2Projekat.Mapping
{
    public class MappingProfileDtos : Profile
    {
        public MappingProfileDtos() 
        {
            CreateMap<Artikal, ArtikalDto>().ReverseMap();
            CreateMap<Porudzbine, PorudzbinaDto>().ReverseMap();
            CreateMap<KorpaArtikal, KorpaArtikalDto>().ReverseMap();
            CreateMap<Artikal, KreirajArtikalDto>().ReverseMap();
            CreateMap<Porudzbine, KreirajPorudzbinuDto>();
            CreateMap<Porudzbine, KreirajPorudzbinuDto>()
            .ForMember(dest => dest.ArtikliKolicina, opt => opt.MapFrom(src => src.listaArtikla.Select(i => new ArtikalKolicinaDto { ArtikalID = i.ArtikalId, Kolicina = i.Kolicina }).ToList()))
            .ForMember(dest => dest.Kupac, opt => opt.MapFrom(src => src.Kupac))
            .ReverseMap()
            .ForMember(dest => dest.listaArtikla, opt => opt.MapFrom(src => src.ArtikliKolicina.Select(pq => new KorpaArtikal { ArtikalId = pq.ArtikalID, Kolicina = pq.Kolicina }).ToList()))
            .ForMember(dest => dest.Kupac, opt => opt.MapFrom(src => src.Kupac));

            CreateMap<List<Porudzbine>, List<PorudzbinaDto>>().ConvertUsing(MapirajPorudzbineNaPorudzbinuDtos);
        }

        private List<PorudzbinaDto> MapirajPorudzbineNaPorudzbinuDtos(List<Porudzbine> porudzbine, List<PorudzbinaDto> porudzbineDtos, ResolutionContext context)
        {
            porudzbineDtos ??= new List<PorudzbinaDto>();

            foreach (var order in porudzbine)
            {
                var porudzbinaDto = context.Mapper.Map<PorudzbinaDto>(order);
                porudzbineDtos.Add(porudzbinaDto);
            }

            return porudzbineDtos;
        }

    }
}
