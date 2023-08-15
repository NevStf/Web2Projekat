using Web2Projekat.Models;

namespace Web2Projekat.Dto
{
    public class KorisnikDto
    {
        public string KIme { get; set; }
        public string Lozinka { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Adresa { get; set; }
        public string EmailAdresa { get; set; }
        public DateTime DatumRodjenja { get; set; }

        //overriduj datum
        public string DRodjenja { get; set; }

        public TIP_KORISNIKA Tip { get; set; }

        //dodaj upload slike
    }
}
