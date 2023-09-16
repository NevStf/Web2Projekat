using Web2Projekat.Models;

namespace Web2Projekat.Infrastructure.DBO
{
    public class KorpaArtikalDBO
    {
        public int Id { get; set; }
        public int ArtikalId { get; set; }
        public ArtikalDBO Artikal { get; set; }
        public int Kolicina { get; set; }
        public double Cena { get; set; }
        public PorudzbinaDBO Porudzbina { get; set; }
        public int PorudzbinaId { get; set; }
    }
}
