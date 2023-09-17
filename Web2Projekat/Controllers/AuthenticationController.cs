using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Web2Projekat.Interfaces;
using Web2Projekat.Models;
using Web2Projekat.Services;

namespace Web2Projekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        IAuth _authService;

        public AuthenticationController(IAuth authService)
        {
            _authService = authService;
        }

        //[JwtUserAuthorization]
        [HttpGet]
        public IActionResult GetKorisnik() 
        {
            var korisnickoIme = (string)HttpContext.Items["id"] ?? string.Empty;
            try
            {
                var response = _authService.DobaviKorisnika("hehexD");
                return Ok(new { StatusCode = 200, User = response.Result });
            }
            catch (Exception e)
            {
                if (e.Message.Equals("Konekcija sa bazom nije ok"))
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
                return BadRequest(new { StatusCode = 403, Message = e.Message });
            }
        }

        [HttpGet("prodavci")]
        public IActionResult GetProdavce()
        {
            var korisnickoIme = (string)HttpContext.Items["id"] ?? string.Empty;
            try
            {
                var response = _authService.DobaviSve();
                var prodavci = response.Result.Where(x => x.Tip == 1);
                return Ok(new { StatusCode = 200, Users = prodavci });
            }
            catch (Exception e)
            {
                if (e.Message.Equals("Konekcija sa bazom nije ok"))
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
                return BadRequest(new { StatusCode = 403, Message = e.Message });
            }
        }


        [HttpPost("authenticate")]
        public IActionResult Authenticate(PrijavaForma forma)
        {
            try
            {
                var response = _authService.Autentikacija(forma);
                return Ok(new { StatusCode = 200, Token = response.Result });
            }
            catch (Exception e)
            {
                if (e.Message.Equals("Konekcija sa bazom nije ok"))
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
                return BadRequest(new { StatusCode = 403, Message = e.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegistracionaForma forma)
        {
            if (forma.Lozinka == "")
            {
                forma.Lozinka = "somedummypass98/A";
                forma.PotvrdaLozinka = "somedummypass98/A";
            }

            try
            {
                string token = await _authService.Registracija(forma);
                return Ok(new { StatusCode = 200, Token = token });
            }
            catch (Exception e)
            {
                if (e.Message.Equals("Konekcija sa bazom nije ok"))
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
                return BadRequest(new { StatusCode = 400, Message = e.Message });
            }
        }

        //[JwtUserAuthorization]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateUserInfo(RegistracionaForma forma)
        {
            var korisnickoIme = (string)HttpContext.Items["id"] ?? string.Empty;
            var role = (string)HttpContext.Items["Role"] ?? string.Empty;
            if (korisnickoIme == null)
            {
                return Unauthorized("Morate se ulogovati!");
            }
            try
            {
                try
                {
                    var v = await _authService.IzmeniKorisnika(forma, korisnickoIme);
                    if (!v)
                    {
                        return BadRequest(new { StatusCode = 400, Message = "Uneta email adresa je u upotrebi." });
                    }
                    return Ok(new { StatusCode = 200, Message = "Uspesno izmenjen korisnik." });
                }
                catch (Exception e)
                {
                    if (e.Message.Equals("Konekcija sa bazom nije ok."))
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError);
                    }

                    return BadRequest(new { StatusCode = 400, Message = e.Message });
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }

        }

        //[JwtUserAuthorization]
        [HttpPost("verifikuj/{korisnickoIme}")]
        public async Task<IActionResult> Verifikuj([FromRoute] string korisnickoIme, int status)
        {
            try
            {
                var users = await _authService.Verifikuj(korisnickoIme, status);
                return Ok(users);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }


    }
}
