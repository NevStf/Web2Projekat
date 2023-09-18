using AutoMapper;
using System.Globalization;
using Web2Projekat.Infrastructure.DBO;
using Web2Projekat.Interfaces;
using Web2Projekat.Models;

namespace Web2Projekat.Services
{
    public class PorudzbinaService : IPorudzbina
    {
        private readonly IPorudzbinaRepository _porudzbinaRepository;
        private readonly IArtikal _artikalRepository;
        private readonly IMapper _mapper;

        public PorudzbinaService(IPorudzbinaRepository porudzbinaRepository, IMapper mapper, IArtikal artikalRepository)
        {
            _porudzbinaRepository = porudzbinaRepository;
            _mapper = mapper;
            _artikalRepository = artikalRepository;
        }

        public async Task<IEnumerable<Porudzbine>> DobaviSveKorisnikove(string korisnik)
        {
            try
            {
                var porudzbine = await _porudzbinaRepository.DobaviSve(korisnik);
                return _mapper.Map<IEnumerable<PorudzbinaDBO>, IEnumerable<Porudzbine>>(porudzbine);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<Porudzbine>> DobaviSveProdavce(string korisnik)
        {
            try
            {
                var porudzbine = await _porudzbinaRepository.DobaviSveProdavac(korisnik);
                return _mapper.Map<IEnumerable<PorudzbinaDBO>, IEnumerable<Porudzbine>>(porudzbine);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<Porudzbine>> DobaviSveZaAdmina()
        {
            try
            {
                var porudzbine = await _porudzbinaRepository.DobaviSveAdmin();
                return _mapper.Map<IEnumerable<PorudzbinaDBO>, IEnumerable<Porudzbine>>(porudzbine);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Porudzbine> DodajAsync(Porudzbine porudzbina)
        {
            foreach (var korpaArtikal in porudzbina.listaArtikla)
            {
                var naStanju = await _porudzbinaRepository.ProizvodNaStanju(korpaArtikal.ArtikalId, korpaArtikal.Kolicina);
                if (!naStanju)
                {
                    throw new Exception("Nema dovoljno artikla na stanju!");
                }
            }

            try
            {
                var porudzbinaDbo = _mapper.Map<Porudzbine, PorudzbinaDBO>(porudzbina);
                porudzbinaDbo.DatumPorucivanja = DateTime.Now;
                porudzbinaDbo.VremeDostave = HelperVremeDostave();
                porudzbinaDbo.listaArtikla.ForEach(x => x.Cena = _artikalRepository.DobaviSveArtikleAsync().Result.Where(i => i.ID == x.ArtikalId).FirstOrDefault().Cena);
                porudzbinaDbo.UkupnaCena = porudzbinaDbo.listaArtikla.Sum(x => x.Cena * x.Kolicina) + 200;

                var rezultat = await _porudzbinaRepository.Dodaj(porudzbinaDbo);
                return _mapper.Map<Porudzbine>(rezultat);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private double HelperVremeDostave()
        {
            Random r = new Random();
            int ceoBroj = r.Next(1, 7);
            int decimala = r.Next(0, 60);

            double nasumicanBroj = Convert.ToDouble($"{ceoBroj}.{decimala:D2}", CultureInfo.InvariantCulture);
            return nasumicanBroj;

        }

        public Task<bool> IzbrisiAsync(int porudzbinaId)
        {
            throw new NotImplementedException();
        }

        public Task<Porudzbine> IzmeniAsync(Porudzbine porudzbina)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> OdbijPorudzbinuAsync(int porudzbinaId)
        {
            try
            { 
                bool retVal = await _porudzbinaRepository.OdbijPorudzbinuAsync(porudzbinaId);
                return retVal;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
