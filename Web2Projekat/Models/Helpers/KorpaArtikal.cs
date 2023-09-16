namespace Web2Projekat.Models.Helpers
{
    public class KorpaArtikal
    {
        public int Id { get; set; }
        public int ArtikalId { get; set; }
        public Artikal Artikal { get; set; }
        public int Kolicina { get; set; }
        public double Cena { get; set; }
    }
}
