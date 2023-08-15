using Web2Projekat.Dto;
using Web2Projekat.Models;

namespace Web2Projekat.Interfaces
{
    public interface IKorisnikService
    {
        List<Korisnik> GetKorisniks();

        KorisnikDto GetByKorisnickoIme(string korisnickoIme);

        KorisnikDto UpdateKorisnik(string korisnickoIme, KorisnikDto korisnikDto);

        void DeleteKorisnik(string korisnickoIme);

        KorisnikDto AddKorisnik(KorisnikDto korisnik);
    }
}
