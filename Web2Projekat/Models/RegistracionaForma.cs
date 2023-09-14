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
        public int Tip { get; set; }
        public string Slika { get; set; }
        public int Status { get; set; } = 0;

        public RegistracionaForma(string kime, string lozinka, string potvrdalozinke, string ime, string prezime, string adresa, string emailadresa, DateTime datumrodjenja, int tp, string slika)
        {
            KIme = kime;
            Lozinka = lozinka;
            PotvrdaLozinka = potvrdalozinke;
            Ime = ime;
            Prezime = prezime;
            Adresa = adresa;
            EmailAdresa = emailadresa;
            DatumRodjenja = datumrodjenja;
            Tip = tp;
            Slika = slika;

        }

        public RegistracionaForma() {}
    }
}
