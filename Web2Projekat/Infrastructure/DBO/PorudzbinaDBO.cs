namespace Web2Projekat.Infrastructure.DBO
{
    public class PorudzbinaDBO
    {
        public int Id { get; set; }
        public string Komentar { get; set; }
        public string AdresaDostave { get; set; }
        public DateTime DatumPorucivanja { get; set; }
        public List<KorpaArtikalDBO> listaArtikla { get; set; }
        public string Kupac { get; set; }
        public double UkupnaCena { get; set; }
        public double VremeDostave { get; set; }
    }
}
