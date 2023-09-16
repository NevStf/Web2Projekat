using Web2Projekat.Models;

namespace Web2Projekat.Interfaces
{
    public interface IPorudzbina
    {
        public Task<Porudzbine> DodajAsync(Porudzbine porudzbina);
        public Task<Porudzbine> IzmeniAsync(Porudzbine porudzbina);
        public Task<bool> IzbrisiAsync(int porudzbinaId);
        public Task<IEnumerable<Porudzbine>> DobaviSveKorisnikove(string korisnik);
        public Task<IEnumerable<Porudzbine>> DobaviSveProdavce(string korisnik);
        public Task<IEnumerable<Porudzbine>> DobaviSveZaAdmina();
        public Task<bool> OdbijPorudzbinuAsync(int porudzbinaId);
    }
}
