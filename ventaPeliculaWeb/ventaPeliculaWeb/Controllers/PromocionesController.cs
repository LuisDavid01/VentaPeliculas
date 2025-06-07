using Microsoft.AspNetCore.Mvc;

namespace ventaPeliculaWeb.Controllers
{
    public class PromocionesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
