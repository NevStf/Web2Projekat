using AutoMapper;
using Web2Projekat.Infrastructure.DBO;
using Web2Projekat.Interfaces;
using Web2Projekat.Models;

namespace Web2Projekat.Services
{
    public class KorisnikService : IKorisnik
    {
        private readonly IKorisnikRepository _korisnikRepository;
        private readonly IMapper _mapper;

        public KorisnikService(IKorisnikRepository korisnikRepository, IMapper mapper)
        {
            _korisnikRepository = korisnikRepository;
            _mapper = mapper;
        }

        public async Task<Korisnik> DobaviKorisnika(string KIme)
        {
            var kor = await _korisnikRepository.DobaviKorisnika(KIme);
            return _mapper.Map<KorisnikDBO, Korisnik>(kor);
        }

        public async Task IzmeniKorisnikaAsync(Korisnik korisnik)
        {
            await _korisnikRepository.IzmeniKorisnikaAsync(_mapper.Map<Korisnik, KorisnikDBO>(korisnik));
        }

        public void SacuvajKorisnika(Korisnik korisnik)
        {
            _korisnikRepository.KreirajKorisnika(_mapper.Map<Korisnik, KorisnikDBO>(korisnik));
        }

        public async Task<List<Korisnik>> SviKorisniciAsync()
        {
            var lista = await _korisnikRepository.SviKorisniciAsync();
            return _mapper.Map<List<KorisnikDBO>, List<Korisnik>>(lista);
        }

        public async Task<Korisnik> VerifikujKorisnika(string KIme, int status)
        {
           var kor = await _korisnikRepository.VerifikujKorisnika(KIme, status);
            return _mapper.Map<KorisnikDBO, Korisnik>(kor);
        }
    }
}
