using Microsoft.AspNetCore.Mvc;
using ventaPeliculaWeb.Services;

namespace ventaPeliculaWeb.Controllers
{
    public class AutocompletadoController : Controller
    {
        private readonly ITrieService _trieService;
        public AutocompletadoController(ITrieService trieService)
        {
            _trieService = trieService;   
        }
        public JsonResult Buscar(string prefix)
        {
            var results = _trieService.StartWith(prefix);
            return Json(results);
        }
    }
}
