using Web2Projekat.Infrastructure.DBO;
using Web2Projekat.Models;

namespace Web2Projekat.Interfaces
{
    public interface IKorisnikRepository
    {
        public Task<KorisnikDBO> KreirajKorisnika(KorisnikDBO korisnik);

        public Task IzmeniKorisnikaAsync(KorisnikDBO korisnik);
        public Task<KorisnikDBO> VerifikujKorisnika(string KIme, int status);
        public Task<List<KorisnikDBO>> SviKorisniciAsync();
        public Task<KorisnikDBO> DobaviKorisnika(string KIme);
    }
}
