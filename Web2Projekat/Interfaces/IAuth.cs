using Web2Projekat.Models;

namespace Web2Projekat.Interfaces
{
    public interface IAuth
    {
        public Task<IEnumerable<Korisnik>> DobaviSve();

        //public Task<IEnumerable<Korisnik>>

        public Task<Korisnik> DobaviKorisnika(string KIme);
        Task<string> Registracija(RegistracionaForma rf, string KIme);
        Task<string> Autentikacija(RegistracionaForma rf);
        Task<bool> IzmeniKorisnika(RegistracionaForma rf, string KIme);
       

    }
}
