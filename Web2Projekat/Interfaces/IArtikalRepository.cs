using Web2Projekat.Infrastructure.DBO;

namespace Web2Projekat.Interfaces
{
    public interface IArtikalRepository
    {
        public Task<ArtikalDBO> Dodaj(ArtikalDBO artikal);
        public Task<ArtikalDBO> Izmeni(ArtikalDBO artikal);
        public Task<bool> Izbrisi(int id);
        public Task<IEnumerable<ArtikalDBO>> DobaviSve();
        public Task<ArtikalDBO> DobaviPoId(int id);
        public Task<IEnumerable<ArtikalDBO>> DobaviSveProdavce(string prodavac);
    }
}
