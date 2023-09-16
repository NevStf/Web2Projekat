using Microsoft.EntityFrameworkCore;
using Web2Projekat.Infrastructure.DBContext;
using Web2Projekat.Infrastructure.DBO;
using Web2Projekat.Interfaces;

namespace Web2Projekat.Services
{
    public class ArtikalRepository : IArtikalRepository
    {
        private readonly ArtikliDbContext _dbContext;

        public ArtikalRepository( ArtikliDbContext dbContext ) 
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public async Task<ArtikalDBO> DobaviPoId(int id)
        {
            return await _dbContext.Artikli.AsNoTracking().FirstOrDefaultAsync(x => x.ID == id);
        }

        public async Task<IEnumerable<ArtikalDBO>> DobaviSve()
        {
            return await _dbContext.Artikli.Where(x => x.KolicinaNaStanju > 0).AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<ArtikalDBO>> DobaviSveProdavce(string prodavac)
        {
            return await _dbContext.Artikli
                .Where(x => x.Prodavac.ToLower() == prodavac.ToLower())
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<ArtikalDBO> Dodaj(ArtikalDBO artikal)
        {
            await _dbContext.Artikli.AddAsync(artikal);
            await _dbContext.SaveChangesAsync();
            return artikal;
        }

        public async Task<bool> Izbrisi(int id)
        {
            var artikal = await _dbContext.Artikli.FirstOrDefaultAsync(x => x.ID == id);
            if (artikal != null)
            {
                _dbContext.Artikli.Remove(artikal);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<ArtikalDBO> Izmeni(ArtikalDBO artikal)
        {
            var izmena = await _dbContext.Artikli.Where(x => x.ID == artikal.ID).FirstOrDefaultAsync();

            if (izmena != null)
            {
                izmena.Cena = artikal.Cena;
                izmena.Opis = artikal.Opis;
                izmena.Naziv = artikal.Naziv;
                izmena.Fotografija = artikal.Fotografija;
                izmena.Kolicina = artikal.Kolicina;

                await _dbContext.SaveChangesAsync();
                return izmena;
            }
            else
            {
                return izmena;
            }
        }
    }
}
