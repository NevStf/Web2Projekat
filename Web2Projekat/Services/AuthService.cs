using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
using System.Runtime.Intrinsics.Arm;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Web2Projekat.Infrastructure.DBO;
using Web2Projekat.Interfaces;
using Web2Projekat.Models;

namespace Web2Projekat.Services
{
    public class AuthService : IAuth
    {
        private readonly IKorisnik _korisnikService;
        private readonly IConfiguration _configuration;

        public AuthService(IKorisnik korisnikService, IConfiguration configuration)
        {
            _korisnikService = korisnikService;
            _configuration = configuration;
        }

        public async Task<string> Autentikacija(PrijavaForma forma)
        {
            Korisnik kor;
            try
            {
                kor = await _korisnikService.DobaviKorisnika(forma.KorisnickoIme);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            if(kor == null)
            {
                throw new Exception("Ne postoji korisnik sa tim korisnickim imenom, molimo vas registrujte se.");
            }

            if (!LozinkaMatch(forma.Lozinka, kor.Lozinka)) 
            {
                throw new Exception("Neispravna lozinka!");
            }

            string token = GenerisiTokenJWT(kor);

            return token;
            
        }

        public async Task<Korisnik> DobaviKorisnika(string KIme)
        {
           return await _korisnikService.DobaviKorisnika(KIme);
        }

        public async Task<IEnumerable<Korisnik>> DobaviSve()
        {
            return await _korisnikService.SviKorisniciAsync();
        }

        public async Task<bool> IzmeniKorisnika(RegistracionaForma forma, string KIme)
        {
            try 
            {
                Korisnik kor = await _korisnikService.DobaviKorisnika(forma.KIme);
                if(kor == null) 
                {
                    throw new Exception(String.Format("Korisnik sa Korisnickim imenom {0} ne postoji!", KIme));
                }

                IEnumerable<Korisnik> sviKorisnici;
                try
                {
                    sviKorisnici = await _korisnikService.SviKorisniciAsync();
                }
                catch (Exception e)
                {
                    throw new Exception("Konekcija sa bazom nije ok");
                }

                foreach (var k in sviKorisnici)
                {
                    if (k.EmailAdresa.Equals(forma.EmailAdresa) && k.EmailAdresa != kor.EmailAdresa) 
                    {
                        throw new Exception("Uneta email adresa je u upotrebi.");
                    }
                }

                kor.Ime = forma.Ime;
                kor.Prezime = forma.Prezime;
                kor.EmailAdresa = forma.EmailAdresa;
                kor.Adresa = forma.Adresa;
                kor.DatumRodjenja = forma.DatumRodjenja;
                kor.Slika = forma.Slika;

                await _korisnikService.IzmeniKorisnikaAsync(kor);
                
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Konekcija sa bazom nije ok");
            }
        }




        public async Task<string> Registracija(RegistracionaForma forma)
        {
            IEnumerable<Korisnik> sviKorisnici;
            try
            {
                sviKorisnici = await _korisnikService.SviKorisniciAsync();
            }
            catch (Exception e)
            {
                throw new Exception("Konekcija sa bazom nije ok");
            }

            foreach (var k in sviKorisnici)
            {
                if (k.KIme.Equals(forma.KIme))
                {
                    throw new Exception("Uneto korisnicko ime je u upotrebi.");
                }
                else if (k.EmailAdresa.Equals(forma.EmailAdresa))
                {
                    throw new Exception("Uneta email adresa je u upotrebi.");
                }
            }

            string hashLozinka = LozinkaHash(forma.Lozinka);
            Korisnik kor = new Korisnik(forma.KIme, hashLozinka, forma.Ime, forma.Prezime, forma.Adresa,forma.EmailAdresa, forma.DatumRodjenja, forma.Tip, forma.Slika);

            _korisnikService.SacuvajKorisnika(kor);
            
            
            return "";
        }

        private string LozinkaHash(string lozinka)
        {
            using (var sha = SHA256.Create()) 
            { 
                var computedHash = sha.ComputeHash(Encoding.Unicode.GetBytes(lozinka));
                string passwordHash = Convert.ToBase64String(computedHash);
                return passwordHash;
            }
        }

        private bool LozinkaMatch(string lozinka, string lozinkaHash) 
        {
            string hash = LozinkaHash(lozinka);
            return lozinkaHash.Equals(hash);
        }


        private string GenerisiTokenJWT(Korisnik kor)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JWTPotpis"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", kor.KIme.ToString()), new Claim("Role", kor.Tip.ToString()) }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<Korisnik> Verifikuj(string kIme, int status)
        {
            try
            {
                Korisnik korisnik = await _korisnikService.DobaviKorisnika(kIme);

                MailMessage newMail = new MailMessage();
                SmtpClient client = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("monsterchild98@gmail.com", _configuration["email"]),
                    EnableSsl = true,
                };
                newMail.From = new MailAddress("monsterchild98@gmail.com", "WebShoppy");
                newMail.To.Add(korisnik.EmailAdresa);
                newMail.Subject = "Verifikacija naloga";
                newMail.IsBodyHtml = true;
                newMail.Body = "<h3> Vas nalog je verifikovan, postali ste prodavac.<h3>";

                client.Send(newMail);
                var kor = await _korisnikService.VerifikujKorisnika(kIme, status);

                return kor;

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
