using Web2Projekat.Models;

namespace Web2Projekat.Interfaces
{
    public interface IAuth
    {
        public Task<IEnumerable<Korisnik>> DobaviSve();

        //public Task<IEnumerable<Korisnik>>

        public Task<Korisnik> DobaviKorisnika(string KIme);
        Task<string> Registracija(RegistracionaForma forma);
        Task<string> Autentikacija(PrijavaForma forma);
        Task<bool> IzmeniKorisnika(RegistracionaForma forma, string KIme);
       

    }
}
