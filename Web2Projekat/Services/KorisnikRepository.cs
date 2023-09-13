using Microsoft.EntityFrameworkCore;
using Web2Projekat.Infrastructure.DBContext;
using Web2Projekat.Infrastructure.DBO;
using Web2Projekat.Interfaces;

namespace Web2Projekat.Services
{
    public class KorisnikRepository : IKorisnikRepository
    {
        private readonly KorisniciDbContext _dbcontext;

        public KorisnikRepository(KorisniciDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }


        public async Task<KorisnikDBO> DobaviKorisnika(string KIme)
        {
            try
            {
                return await _dbcontext.Korisnici.FirstOrDefaultAsync(x => x.KIme == KIme);
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                throw;
            }
        }

        public async Task IzmeniKorisnikaAsync(KorisnikDBO korisnik)
        {
            var izkorisnik = _dbcontext.Korisnici.FirstOrDefault(x => x.KIme == korisnik.KIme);
            try
            {
                izkorisnik.Lozinka = korisnik.Lozinka;
                izkorisnik.Slika = korisnik.Slika;
                izkorisnik.Adresa = korisnik.Adresa;
                izkorisnik.DatumRodjenja = korisnik.DatumRodjenja;
                izkorisnik.EmailAdresa = korisnik.EmailAdresa;
                izkorisnik.Ime = korisnik.Ime;
                izkorisnik.Prezime = korisnik.Prezime;

                await _dbcontext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                throw;
            }
        }

        public async Task<KorisnikDBO> KreirajKorisnika(KorisnikDBO korisnik)
        {
            korisnik.Status = 0;
            try
            {
                await _dbcontext.Korisnici.AddAsync(korisnik);
                await _dbcontext.SaveChangesAsync();
                return korisnik;
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                throw;
            }
        }

        public async Task<List<KorisnikDBO>> SviKorisniciAsync()
        {
            try
            {
                return await _dbcontext.Korisnici.ToListAsync();
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                throw;
            }
        }
    }
}
