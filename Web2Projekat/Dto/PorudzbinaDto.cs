namespace Web2Projekat.Dto
{
    public class PorudzbinaDto
    {
        public List<KorpaArtikalDto> listaArtikla { get; set; }
        public string Komentar { get; set; }
        public string AdresaDostave { get; set; }
        public string Kupac { get; set; }
        public double UkupnaCena { get; set; }
        public double VremeDostave { get; set; }
    }
}
