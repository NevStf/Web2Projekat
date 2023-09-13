using Web2Projekat.Models;

namespace Web2Projekat.Interfaces
{
    public interface IKorisnik
    {
        public void SacuvajKorisnika(Korisnik korisnik);

        public Task IzmeniKorisnikaAsync(Korisnik korisnik);
        //dodaj kasnije
        //public Task VerifikujKorisnika(string KIme, int status);
        public Task<List<Korisnik>> SviKorisniciAsync();
        public Task<Korisnik> DobaviKorisnika(string KIme);
    }
}
