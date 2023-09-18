using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Web2Projekat.Attributes;
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

        [JwtUserAuthorization]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var kime = (string)HttpContext.Items["id"] ?? string.Empty;
            var tip = (string)HttpContext.Items["Role"] ?? string.Empty;

            try
            {
                if (tip == "1")
                {
                    //if prodavac
                    var artikliProdavca = await _artikalService.DobaviArtikleProdavcaAsync(kime);
                    var artikliProdavcaDto = _mapper.Map<IEnumerable<ArtikalDto>>(artikliProdavca);
                    return Ok(artikliProdavcaDto);
                }
                else 
                {
                    //if kupac
                    var artikli = await _artikalService.DobaviSveArtikleAsync();
                    var artikliDtos = _mapper.Map<IEnumerable<ArtikalDto>>(artikli);
                    return Ok(artikliDtos);
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [JwtUserAuthorization]
        [HttpGet("{artikalId}")]
        public async Task<IActionResult> GetById([FromRoute]int artikalId)
        {
            var kime = (string)HttpContext.Items["id"] ?? string.Empty;
            var tip = (string)HttpContext.Items["Role"] ?? string.Empty;
            if (kime == "") 
            {
                return Unauthorized("You must authenticate to create a new product");
            }

            try
            {
                if (tip == "1") 
                {
                    var artikal = await _artikalService.DobaviPoId(artikalId);
                    var artikalDto = artikal;
                    return Ok(artikalDto);
                }
                return Ok("No article found");
                
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [JwtUserAuthorization]
        [HttpPost]
        public async Task<IActionResult> PostArtikal(KreirajArtikalDto dto)
        {
            var kime = (string)HttpContext.Items["id"] ?? string.Empty;
            var tip = (string)HttpContext.Items["Role"] ?? string.Empty;
            if (kime == "")
            {
                return Unauthorized("You must authenticate to create a new product");
            }
            if (tip != "1")
            {
                return Unauthorized("You must be an seller to create a new product");
            }
            
            try
            {
                var artikal = _mapper.Map<Artikal>(dto);
                await _artikalService.KreirajArtikalAsync(artikal, kime);

            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Ok(new { StatusCode = 200, Message = "Uspesno kreiran artikal." });

        }

        [JwtUserAuthorization]
        [HttpPut("/Artikal/update")]
        public async Task<IActionResult> UpdateArtikal(ArtikalDto dto)
        {
            var kime = (string)HttpContext.Items["id"] ?? string.Empty;
            var tip = (string)HttpContext.Items["Role"] ?? string.Empty;
            if (kime == "")
            {
                return Unauthorized("You must authenticate to create a new product");
            }
            if (tip != "1")
            {
                return Unauthorized("You must be an seller to create a new product");
            }
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

        [JwtUserAuthorization]
        [HttpDelete("/Artikal/delete/{artikalId}")]
        public async Task<IActionResult> DeleteProduct([FromRoute]int artikalId)
        {
            var kime = (string)HttpContext.Items["id"] ?? string.Empty;
            var tip = (string)HttpContext.Items["Role"] ?? string.Empty;
            if (kime == "")
            {
                return Unauthorized("You must authenticate to create a new product");
            }
            if (tip != "1")
            {
                return Unauthorized("You must be an seller to create a new product");
            }
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
