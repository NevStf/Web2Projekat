using Microsoft.EntityFrameworkCore;
using Web2Projekat.Infrastructure.DBContext;
using Web2Projekat.Infrastructure.DBO;
using Web2Projekat.Interfaces;

namespace Web2Projekat.Services
{
    public class PorudzbinaRepository : IPorudzbinaRepository
    {
        private readonly ArtikliDbContext _dbContext;
        public PorudzbinaRepository(ArtikliDbContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public async Task<IEnumerable<PorudzbinaDBO>> DobaviSve(string kupac)
        {
            var porudzbine = await _dbContext.Porudbine
                .Include(x => x.listaArtikla)
                .Where(x => x.Kupac.ToLower() == kupac.ToLower())
                .AsNoTracking()
                .ToListAsync();

            foreach (var p in porudzbine)
            {
                foreach (var artikal in p.listaArtikla)
                {
                    artikal.Artikal = await NadjiArtikal(artikal.ArtikalId);
                }
            }

            return porudzbine;
        }

        private async Task<ArtikalDBO> NadjiArtikal(int id)
        {
            return await _dbContext.Artikli.FirstOrDefaultAsync(x => x.ID == id);
        }

        public async Task<IEnumerable<PorudzbinaDBO>> DobaviSveAdmin()
        {
            var porudzbine = await _dbContext.Porudbine
                .Include(x => x.listaArtikla)
                .AsNoTracking()
                .ToListAsync();

            foreach (var p in porudzbine)
            {
                foreach (var artikal in p.listaArtikla)
                {
                    artikal.Artikal = await NadjiArtikal(artikal.ArtikalId);
                }
            }

            return porudzbine;
        }

        public async Task<IEnumerable<PorudzbinaDBO>> DobaviSveProdavac(string prodavac)
        {
            var artikliPoKorisniku = await _dbContext.Artikli
                .Where(x => x.Prodavac.ToLower() == prodavac.ToLower())
                .ToListAsync();

            var artikliIds = artikliPoKorisniku.Select(p=>p.ID).ToList();

            var porudzbine = await _dbContext.Porudbine
                .Include(x => x.listaArtikla)
                .ThenInclude(i => i.Artikal)
                .AsNoTracking()
                .ToListAsync();

            var porudzbineSaProdavcevimArtiklima = porudzbine
                .Where(p => p.listaArtikla.Any(a => artikliIds.Contains(a.ArtikalId)))
                .ToList();

            foreach (var p in porudzbineSaProdavcevimArtiklima)
            {
                p.listaArtikla = p.listaArtikla
                    .Where(a => artikliIds.Contains(a.ArtikalId))
                    .ToList();
            }

            return porudzbineSaProdavcevimArtiklima;
        }

        public async Task<PorudzbinaDBO> Dodaj(PorudzbinaDBO porudzbina)
        {
            foreach (var a in porudzbina.listaArtikla)
            {
                await RefresujKolicinuNaStanju(a.ArtikalId, a.Kolicina);
            }
            await _dbContext.Porudbine.AddAsync(porudzbina);
            await _dbContext.SaveChangesAsync();
            return porudzbina;
        }

        private async Task RefresujKolicinuNaStanju(int artikalId, int kolicina)
        {
            var artikal = await _dbContext.Artikli.FindAsync(artikalId);

            if (artikal != null)
            {
                artikal.KolicinaNaStanju = artikal.KolicinaNaStanju - kolicina;
                await _dbContext.SaveChangesAsync();
                return;
            }
            else
            {
                return;
            }
        }

        public async Task<bool> Izbrisi(int id)
        {
            var porudzbina = await _dbContext.Porudbine.FirstOrDefaultAsync(x => x.Id == id);
            if (porudzbina != null)
            {
                _dbContext.Porudbine.Remove(porudzbina);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<PorudzbinaDBO> Izmeni(PorudzbinaDBO porudzbina)
        {
            var por = await _dbContext.Porudbine
                .Where(x => x.Id == porudzbina.Id)
                .Include(i => i.listaArtikla)
                .FirstOrDefaultAsync();

            if (por != null)
            {
                por.AdresaDostave = porudzbina.AdresaDostave;
                por.Komentar = porudzbina.Komentar;
                por.DatumPorucivanja = porudzbina.DatumPorucivanja;
                por.listaArtikla = porudzbina.listaArtikla;
                por.Kupac = porudzbina.Kupac;
                await _dbContext.SaveChangesAsync();
                return por;
            }
            else
            {
                return por;
            }
        }

        public async Task<bool> OdbijPorudzbinuAsync(int porudzbinaId)
        {
            var porudzbina = await _dbContext.Porudbine
                .Where(x => x.Id == porudzbinaId)
                .Include(x => x.listaArtikla)
                .AsNoTracking()
                .FirstOrDefaultAsync();

            foreach (var a in porudzbina.listaArtikla)
            {
                var artikal = _dbContext.Artikli.FirstOrDefaultAsync(x => x.ID == a.ArtikalId);
                artikal.Result.KolicinaNaStanju = artikal.Result.KolicinaNaStanju + a.Kolicina;
            }

            _dbContext.SaveChanges();

            _dbContext.Porudbine.Remove(porudzbina);
            _dbContext.SaveChanges();
            return true;
        }

        public Task<bool> ProizvodNaStanju(int artikalId, int kolicina)
        {
            var artikal = _dbContext.Artikli.FirstOrDefaultAsync(x => x.ID == artikalId);

            if (artikal != null)
            {
                if (artikal.Result.KolicinaNaStanju >= kolicina)
                {
                    return Task.FromResult(true);
                }
                else
                {
                    return Task.FromResult(false);
                }
            }
            else { return Task.FromResult(false); }
        }

        public async Task<PorudzbinaDBO> DobaviPoID(int id)
        {
            return await _dbContext.Porudbine.FindAsync(id);
        }
    }
}
