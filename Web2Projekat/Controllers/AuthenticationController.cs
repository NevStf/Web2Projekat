using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using Web2Projekat.Attributes;
using Web2Projekat.Interfaces;
using Web2Projekat.Models;
using Web2Projekat.Services;
using Web2Projekat.Validators;
using FluentValidation.Results;

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

        [JwtUserAuthorization]
        [HttpGet]
        public IActionResult GetKorisnik() 
        {
            var korisnickoIme = (string)HttpContext.Items["id"] ?? string.Empty;
            try
            {
                var response = _authService.DobaviKorisnika(korisnickoIme);
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

        [JwtUserAuthorization]
        [HttpGet("prodavci")]
        public IActionResult GetProdavce()
        {
            var korisnickoIme = (string)HttpContext.Items["id"] ?? string.Empty;
            var tip = (string)HttpContext.Items["Role"] ?? string.Empty;
            if (korisnickoIme == "" )
            {
                return Unauthorized("You must authenticate as admin to see sellers!");
            }
            try
            {
                if (tip == "2")
                {
                    var response = _authService.DobaviSve();
                    var prodavci = response.Result.Where(x => x.Tip == 1);
                    return Ok(new { StatusCode = 200, Users = prodavci });
                }
                return Ok("No user found!");
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
            KorisnikValidator validator = new KorisnikValidator();
            List<string> ValidationMessages = new List<string>();
            var validationResult = validator.Validate(forma);
            var response = new ResponseModel();

            if (!validationResult.IsValid)
            {
                response.IsValid = false;
                foreach (FluentValidation.Results.ValidationFailure failure in validationResult.Errors)
                {
                    ValidationMessages.Add(failure.ErrorMessage);
                }
                response.ValidationMessages = ValidationMessages;
                return BadRequest(new { StatusCode = 400, Message = response.ValidationMessages });
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

        [AllowAnonymous]
        [HttpPost("register-google")]
        public async Task<IActionResult> RegisterGoogle(RegistracionaForma forma)
        {
            if (forma.Lozinka == "")
            {
                forma.Lozinka = "somedummypass98/A";
                forma.PotvrdaLozinka = "somedummypass98/A";
            }

            try
            {
                var response = _authService.DobaviKorisnika(forma.KIme);
                if (response.Result == null) 
                {
                    string t = await _authService.Registracija(forma);
                    return Ok(new { StatusCode = 200, Token = t });
                }
                var token = await _authService.Autentikacija(new PrijavaForma(forma.KIme, forma.Lozinka) );
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

        [JwtUserAuthorization]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateUserInfo(RegistracionaForma forma)
        {
            var korisnickoIme = (string)HttpContext.Items["id"] ?? string.Empty;
            var tip = (string)HttpContext.Items["Role"] ?? string.Empty;
            if (korisnickoIme == "")
            {
                return Unauthorized("Morate se ulogovati!");
            }

            try
            {
                IzmeniKorisnikaValidator validator = new IzmeniKorisnikaValidator();
                List<string> validationMessages = new List<string>();
                var validationResult = validator.Validate(forma);
                var response = new ResponseModel();

                if (!validationResult.IsValid)
                {
                    response.IsValid = false;
                    foreach (FluentValidation.Results.ValidationFailure failure in validationResult.Errors)
                    {
                        validationMessages.Add(failure.ErrorMessage);
                    }

                    response.ValidationMessages = validationMessages;
                    return BadRequest(new { StatusCode = 400, Message = response.ValidationMessages });
                }

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

        [JwtUserAuthorization]
        [HttpPut("update-pass")]
        public async Task<IActionResult> UpdatePassword(PromenaLozinkeForma forma)
        {
            var korisnickoIme = (string)HttpContext.Items["id"] ?? string.Empty;
            var tip = (string)HttpContext.Items["Role"] ?? string.Empty;
            if (korisnickoIme == "")
            {
                return Unauthorized("Morate se ulogovati!");
            }
            try
            {
                try
                {
                    var v = await _authService.IzmeniLozinku(forma, korisnickoIme);
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




        [JwtUserAuthorization]
        [HttpPost("verifikuj/{korisnickoIme}")]
        public async Task<IActionResult> Verifikuj([FromRoute] string korisnickoIme, int status)
        {
            var kime = (string)HttpContext.Items["id"] ?? string.Empty;
            var tip = (string)HttpContext.Items["Role"] ?? string.Empty;
            if (kime == "" )
            {
                return Unauthorized("You must authenticate as admin to verify users!");
            }
            try
            {
                if (tip == "2") 
                {
                    var users = await _authService.Verifikuj(korisnickoIme, status);
                    return Ok(users);
                }
                return Ok("No user found!");
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }


    }
}
