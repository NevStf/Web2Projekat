using Web2Projekat.Infrastructure.DBO;

namespace Web2Projekat.Interfaces
{
    public interface IPorudzbinaRepository
    {
        public Task<PorudzbinaDBO> Dodaj(PorudzbinaDBO porudzbina);
        public Task<PorudzbinaDBO> Izmeni(PorudzbinaDBO porudzbina);
        public Task<bool> Izbrisi(int id);
        public Task<PorudzbinaDBO> DobaviPoID(int id);
        public Task<IEnumerable<PorudzbinaDBO>> DobaviSve(string kupac);
        public Task<IEnumerable<PorudzbinaDBO>> DobaviSveProdavac(string prodavac);
        public Task<IEnumerable<PorudzbinaDBO>> DobaviSveAdmin();

        public Task<bool> OdbijPorudzbinuAsync(int porudzbinaId);
        public Task<bool> ProizvodNaStanju(int artikalId, int kolicina);
    }
}
