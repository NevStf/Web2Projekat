using Microsoft.AspNetCore.Mvc;

namespace Web2Projekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : Controller
    {
        private
        public IActionResult Index()
        {
            return View();
        }
    }
}
