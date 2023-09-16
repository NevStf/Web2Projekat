using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Web2Projekat.Dto;
using Web2Projekat.Interfaces;
using Web2Projekat.Models;

namespace Web2Projekat.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ArtikalController : Controller
    {
        private readonly IArtikal _artikalService;
        private readonly IMapper _mapper;

        public ArtikalController(IArtikal artikalService, IMapper mapper)
        {
            _artikalService = artikalService;
            _mapper = mapper;
        }

        //[JwtUserAuthorization]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                //if kupac
                var artikli = await _artikalService.DobaviSveArtikleAsync();
                var artikliDtos = _mapper.Map<IEnumerable<ArtikalDto>>(artikli);
                return Ok(artikliDtos);

                //if prodavac
                //var artikliProdavca = await _artikalService.DobaviArtikleProdavcaAsync(korisnickoIme);
                //var artikliProdavcaDto = _mapper.Map<IEnumerable<ArtikalDto>>(artikliProdavca);
                //return Ok(artikliProdavcaDto);

            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        //[JwtUserAuthorization]
        [HttpGet("{artikalId}")]
        public async Task<IActionResult> GetById([FromRoute]int artikalId)
        {
            try
            {
                var artikal = await _artikalService.DobaviPoId(artikalId);
                var artikalDto = artikal;
                return Ok(artikalDto);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        //[JwtUserAuthorization]
        [HttpPost]
        public async Task<IActionResult> PostArtikal(KreirajArtikalDto dto)
        {
            string prodavac = "hehexD";
            try
            {
                var artikal = _mapper.Map<Artikal>(dto);
                await _artikalService.KreirajArtikalAsync(artikal, prodavac);

            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Ok(new { StatusCode = 200, Message = "Uspesno kreiran artikal." });

        }

        //[JwtUserAuthorization]
        [HttpPut("/Artikal/update")]
        public async Task<IActionResult> UpdateArtikal(ArtikalDto dto)
        {
            try
            {
                var artikal = _mapper.Map<Artikal>(dto);
                await _artikalService.IzmeniArtikalAsync(artikal);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Ok(new { StatusCode = 200, Message = "Uspesno izmenjen artikal." });
        }

        //[JwtUserAuthorization]
        [HttpDelete("/Artikal/delete/{artikalId}")]
        public async Task<IActionResult> DeleteProduct([FromRoute]int artikalId)
        {
            try
            {
                await _artikalService.IzbirisiArtikalAsync(artikalId);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Ok(new { StatusCode = 200, Message = "Uspesno izbrisan artikal." });
        }


    }
}
