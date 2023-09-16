using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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

        //[JwtUserAuthorization]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            string korisnik = "hehexD";
            try
            {
                //if korisnik ili prodavac
                //
                var porudzbine = await _porudzbinaService.DobaviSveKorisnikove(korisnik);
                return Ok(porudzbine);

                
                //if admin
                //
                //var porudzbine = await _porudzbinaService.DobaviSveZaAdmina();
                //return Ok(porudzbine);

                //return Ok("Ne postoje narudzbine.");
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        //[JwtUserAuthorization]
        [HttpGet("prodavci")]
        public async Task<IActionResult> GetAllProdavci()
        {
            string korisnik = "hehexD";
            try
            {
                var porudzbine = await _porudzbinaService.DobaviSveProdavce(korisnik);
                var porudzbineDtos = porudzbine.Where(x => x.VremeDostave > 0);
                return Ok(porudzbineDtos);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        //[JwtUserAuthorization]
        [HttpGet("sellers-old")]
        public async Task<IActionResult> GetAllStariProdavci()
        {
            string prodavac = "hehexD";
            try
            {
                var porudzbine = await _porudzbinaService.DobaviSveProdavce(prodavac);
                var porudzbineDtos = porudzbine.Where(x => x.VremeDostave <= 0);
                return Ok(porudzbineDtos);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        //[JwtUserAuthorization]
        [HttpPost]
        public IActionResult PostPorudzbina(KreirajPorudzbinuDto dto)
        {
            string kupac = "hehexD";
            try
            {
                dto.Kupac = kupac;
                var porudzbina = _mapper.Map<Porudzbine>(dto);
                var porudzbinaRetVal = _porudzbinaService.DodajAsync(porudzbina);
                if (porudzbinaRetVal.Exception != null)
                {
                    return BadRequest(porudzbinaRetVal.Exception.InnerException.Message);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Ok("Uspesno kreirana porudzbina.");
        }

        [HttpPut("{id:int}")]
        public IActionResult UpdatePorudzbinu(int id, PorudzbinaDto dto) 
        {
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

        [HttpPost("decline/{porudzbinaId}")]
        public async Task<IActionResult> DeclineOrderAsync([FromRoute]int porudzbinaId)
        {
            try
            {
                await _porudzbinaService.OdbijPorudzbinuAsync(porudzbinaId);
                return Ok("Uspesno odbijena porudzbina");
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }


    }
}
