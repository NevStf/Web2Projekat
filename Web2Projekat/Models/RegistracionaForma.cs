namespace Web2Projekat.Models
{
    public class RegistracionaForma
    {
        public string KIme { get; set; }
        public string Lozinka { get; set; }
        public string PotvrdaLozinka { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Adresa { get; set; }
        public string EmailAdresa { get; set; }
        public DateTime DatumRodjenja { get; set; }

        //overriduj datum
        // public string DRodjenja { get; set; }

        public TIP_KORISNIKA Tip { get; set; }

        public string Slika { get; set; }
        //public int Status { get; set; }

        public int Status { get; set; } = 0;

        public RegistracionaForma(string emailadresa, string ime, string prezime, string kime, string lozinka, string potvrdalozinke, DateTime datumrodjenja, int tp, string adresa, string slika)
        {
            EmailAdresa = emailadresa;
            Ime = ime;
            Prezime = prezime;
            KIme = kime;
            Lozinka = lozinka;
            PotvrdaLozinka = potvrdalozinke;
            DatumRodjenja = datumrodjenja;
            Tip = (TIP_KORISNIKA)tp;
            Adresa = adresa;
            Slika = slika;
        }
    }
}
