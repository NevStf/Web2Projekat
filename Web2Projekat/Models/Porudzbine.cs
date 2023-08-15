namespace Web2Projekat.Models
{
    public class Porudzbine
    {
        public long Id { get; set; }
        public string Kupac { get; set; }
        public List<Artikal> listaArtikla { get; set; }
        public float Cena { get; set; } 

    }
}
