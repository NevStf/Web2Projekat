using Web2Projekat.Infrastructure.DBO;
using Web2Projekat.Models;

namespace Web2Projekat.Mapping
{
    public class Mapper
    {
        public static Korisnik Map(KorisnikDBO dbo)
        {
            if (dbo == null)
            {
                return null;
            }
            //KIme = kime;
            //Lozinka = lozinka;
            //Ime = ime;
            //Prezime = prezime;
            //Adresa = adresa;
            //EmailAdresa = emailadresa;
            //DatumRodjenja = datumrodjenja;
            //Tip = tp;
            //Slika = slika;
           
            Korisnik korisnik = new Korisnik(
                dbo.KIme,
                dbo.Lozinka,
                dbo.Ime,
                dbo.Prezime,
                dbo.Adresa,
                dbo.EmailAdresa,
                dbo.DatumRodjenja,
                dbo.Tip,
                dbo.Slika
                );

            return korisnik;
        }

        //public static List<Korisnik> Map(List<KorisnikDBO> dbos)
        //{
        //    var list = new List<Korisnik>();

        //    if(dbos == null)
        //    {
        //        return null;
        //    }

        //    Korisnik korisnik = new Korisnik();
        //    foreach(var dbo in dbos)
        //    {
        //        korisnik.Ki
        //    }
        //}
    }
}
