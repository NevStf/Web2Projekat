using AutoMapper;
using Web2Projekat.Infrastructure.DBO;
using Web2Projekat.Interfaces;
using Web2Projekat.Models;

namespace Web2Projekat.Services
{
    public class ArtikalService : IArtikal
    {
        private readonly IArtikalRepository _artikalRepository;
        private IMapper _mapper;

        public ArtikalService(IArtikalRepository artikalRepository, IMapper mapper)
        {
            _artikalRepository = artikalRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Artikal>> DobaviArtikleProdavcaAsync(string prodavac)
        {
            try
            {
                var artikli = await _artikalRepository.DobaviSveProdavce(prodavac);
                return _mapper.Map<IEnumerable<ArtikalDBO>, IEnumerable<Artikal>>(artikli);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Artikal> DobaviPoId(int id)
        {
            try
            {
                var artikal = await _artikalRepository.DobaviPoId(id);
                return _mapper.Map<ArtikalDBO, Artikal>(artikal);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<Artikal>> DobaviSveArtikleAsync()
        {
            try
            {
                var artikli = await _artikalRepository.DobaviSve();
                return _mapper.Map<IEnumerable<ArtikalDBO>, IEnumerable<Artikal>>(artikli);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> IzbirisiArtikalAsync(int id)
        {
            try
            {
                return await _artikalRepository.Izbrisi(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Artikal> IzmeniArtikalAsync(Artikal artikal)
        {
            try
            {
                var artikalDbo = _mapper.Map<Artikal, ArtikalDBO>(artikal);
                var rezultat = await _artikalRepository.Izmeni(artikalDbo);
                return _mapper.Map<ArtikalDBO, Artikal>(rezultat);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Artikal> KreirajArtikalAsync(Artikal artikal, string prodavac)
        {
            try
            {
                var artikalDbo = _mapper.Map<Artikal, ArtikalDBO>(artikal);
                artikalDbo.Prodavac = prodavac;
                var rezultat = await _artikalRepository.Dodaj(artikalDbo);
                return _mapper.Map<Artikal>(rezultat);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
