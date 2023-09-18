using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Web2Projekat.Attributes;
using Web2Projekat.Dto;
using Web2Projekat.Interfaces;
using Web2Projekat.Models;

namespace Web2Projekat.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PorudzbinaController : Controller
    {
        private readonly IPorudzbina _porudzbinaService;
        private readonly IMapper _mapper;

        public PorudzbinaController(IPorudzbina porudzbinaService, IMapper mapper)
        {
            _porudzbinaService = porudzbinaService;
            _mapper = mapper;
        }

        [JwtUserAuthorization]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var korisnickoIme = (string)HttpContext.Items["id"] ?? string.Empty;
            var tip = (string)HttpContext.Items["Role"] ?? string.Empty;
            if (korisnickoIme == "")
            {
                return Unauthorized("You must authenticate to create a new product");
            }

            try
            {

                if (tip == "2")
                {
                    //if admin
                    var porudzbine = await _porudzbinaService.DobaviSveZaAdmina();
                    return Ok(porudzbine);
                }
                else 
                {
                    //if korisnik ili prodavac
                    //
                    var porudzbine = await _porudzbinaService.DobaviSveKorisnikove(korisnickoIme);
                    return Ok(porudzbine);
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [JwtUserAuthorization]
        [HttpGet("prodavci")]
        public async Task<IActionResult> GetAllProdavci()
        {
            var korisnickoIme = (string)HttpContext.Items["id"] ?? string.Empty;
            var tip = (string)HttpContext.Items["Role"] ?? string.Empty;
            if (korisnickoIme == "")
            {
                return Unauthorized("You must authenticate to create a new product");
            }

            DateTime now = DateTime.Now;
            string korisnik = "hehexD";
            try
            {
                if (tip=="1" || tip=="2")
                {
                    var porudzbine = await _porudzbinaService.DobaviSveProdavce(korisnik);
                    var porudzbineDtos = porudzbine.Where(x => DateTime.Compare(x.DatumPorucivanja.AddSeconds(x.VremeDostave * 60 * 60), now) > 0);
                    return Ok(porudzbineDtos);
                }
                return Ok("No orders found");
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [JwtUserAuthorization]
        [HttpGet("sellers-old")]
        public async Task<IActionResult> GetAllStariProdavci()
        {
            
            var korisnickoIme = (string)HttpContext.Items["id"] ?? string.Empty;
            var tip = (string)HttpContext.Items["Role"] ?? string.Empty;
            if (korisnickoIme == "")
            {
                return Unauthorized("You must authenticate to create a new product");
            }
            DateTime now = DateTime.Now;
            try
            {
                if (tip == "1" || tip == "2")
                {
                    var porudzbine = await _porudzbinaService.DobaviSveProdavce(korisnickoIme);
                    var porudzbineDtos = porudzbine.Where(x => DateTime.Compare(now, x.DatumPorucivanja.AddSeconds(x.VremeDostave * 60 * 60)) > 0);
                    return Ok(porudzbineDtos);
                }
                return Ok("No orders found");
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [JwtUserAuthorization]
        [HttpPost]
        public IActionResult PostPorudzbina(KreirajPorudzbinuDto dto)
        {
            var korisnickoIme = (string)HttpContext.Items["id"] ?? string.Empty;
            var tip = (string)HttpContext.Items["Role"] ?? string.Empty;
            if (korisnickoIme == "")
            {
                return Unauthorized("You must authenticate to create a new product");
            }

            try
            {
                dto.Kupac = korisnickoIme;
                var porudzbina = _mapper.Map<Porudzbine>(dto);
                var porudzbinaRetVal = _porudzbinaService.DodajAsync(porudzbina);
                if (porudzbinaRetVal.Exception != null)
                {
                    return BadRequest(porudzbinaRetVal.Exception.InnerException.Message);
                }
                return Ok(new { StatusCode = 200, VremeDostave = porudzbinaRetVal.Result.VremeDostave });
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [JwtUserAuthorization]
        [HttpPut("{id:int}")]
        public IActionResult UpdatePorudzbinu(int id, PorudzbinaDto dto) 
        {
            var korisnickoIme = (string)HttpContext.Items["id"] ?? string.Empty;
            if (korisnickoIme == "")
            {
                return Unauthorized("You must authenticate to create a new product");
            }
            try
            {
                var porudzbina = _mapper.Map<Porudzbine>(dto);
                porudzbina.Id = id;
                _porudzbinaService.IzmeniAsync(porudzbina);

                return Ok("Uspesno izmenjena porudzbina.");
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [JwtUserAuthorization]
        [HttpPost("decline/{porudzbinaId}")]
        public async Task<IActionResult> DeclineOrderAsync([FromRoute]int porudzbinaId)
        {
            var korisnickoIme = (string)HttpContext.Items["id"] ?? string.Empty;
            if (korisnickoIme == "")
            {
                return Unauthorized("You must authenticate to create a new product");
            }
            try
            {
                bool declined = await _porudzbinaService.OdbijPorudzbinuAsync(porudzbinaId);

                if (declined)
                {
                    return Ok(new { StatusCode = 200, declined = true });
                }
                return Ok(new { StatusCode = 200, declined = false });

            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

    }
}
