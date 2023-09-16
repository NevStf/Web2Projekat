namespace Web2Projekat.Models
{
    public class Artikal
    {
        public int ID { get; set; }
        public string Naziv { get; set; }
        public string Prodavac { get; set; }
        public double Cena { get; set; }
        public int Kolicina { get; set; }
        public string Opis { get; set; }    
        public string Fotografija { get; set; }
        public int KolicinaNaStanju { get; set; }

    }
}
