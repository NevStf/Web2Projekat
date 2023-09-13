using System.ComponentModel.DataAnnotations;

namespace Web2Projekat.Models
{
    public class PrijavaForma
    {
        [Required]
        public string KorisnickoIme { get; set; }

        [Required]
        public string Lozinka { get; set; }

        public PrijavaForma(string korisnickoIme, string lozinka)
        {
            KorisnickoIme = korisnickoIme;
            Lozinka = lozinka;
        }
    }
}
