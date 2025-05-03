using Microsoft.AspNetCore.Mvc;

namespace ventaPeliculaWeb.Controllers
{
    public class CarritoController : Controller
    {
        public IActionResult VerCarrito()
        {
            return View();
        }
        public IActionResult CompletarCompra()
        {
            return View();
        }
    }
}
