using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace Web2Projekat.Models
{
    public class PromenaLozinkeForma
    {
        public string Lozinka { get; set; }

        public string NovaLozinka { get; set; } 
        public string NovaPotvrda { get; set; }

        public PromenaLozinkeForma(string lozinka, string novaLozinka, string novaPotvrda) 
        {
            Lozinka = lozinka;
            NovaLozinka = novaLozinka;
            NovaPotvrda = novaPotvrda;
        }
        public PromenaLozinkeForma() { }
    }
}
