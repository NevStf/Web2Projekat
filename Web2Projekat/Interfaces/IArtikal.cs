using Web2Projekat.Models;

namespace Web2Projekat.Interfaces
{
    public interface IArtikal
    {
        public Task<IEnumerable<Artikal>> DobaviSveArtikleAsync();
        public Task<IEnumerable<Artikal>> DobaviArtikleProdavcaAsync(string prodavac);
        public Task<Artikal> KreirajArtikalAsync(Artikal artikal, string prodavac);
        public Task<Artikal> IzmeniArtikalAsync(Artikal artikal);
        public Task<bool> IzbirisiArtikalAsync(int id);
        public Task<Artikal> DobaviPoId(int id);
    }
}
