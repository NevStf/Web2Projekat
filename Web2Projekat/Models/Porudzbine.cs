using Web2Projekat.Models.Helpers;

namespace Web2Projekat.Models
{
    public class Porudzbine
    {
        public long Id { get; set; }
        public string Kupac { get; set; }
        public List<KorpaArtikal> listaArtikla { get; set; }
        public double UkupnaCena { get; set; }
        public double VremeDostave { get; set; }
        public DateTime DatumPorucivanja { get; set; }
        public string Komentar { get; set; }
        public string AdresaDostave { get; set; }
    }
}
