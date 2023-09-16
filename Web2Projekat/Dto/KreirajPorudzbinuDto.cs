using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Web2Projekat.Dto
{
    public class KreirajPorudzbinuDto
    {
        public List<ArtikalKolicinaDto> ArtikliKolicina { get; set; }
        public string Komentar { get; set; }
        public string AdresaDostave { get; set; }
        [JsonIgnore]
        public string? Kupac { get; set; }
    }

    public class ArtikalKolicinaDto
    {
        public int ArtikalID { get; set; }
        public int Kolicina { get; set; }
    }
}
