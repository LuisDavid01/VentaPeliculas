using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using ventaPeliculaWeb.Models;

namespace ventaPeliculaWeb.Controllers
{
    public class PromocionesController : Controller
    {
        private readonly IHttpClientFactory _httpClient;
        private readonly IConfiguration _configuration;

        public PromocionesController(IConfiguration configuration, IHttpClientFactory httpClient)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }
        public IActionResult Index()
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Promociones";
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<List<PromocionesModel>>().Result;

                    return View(result);
                }
                return View();

            }
        }

        public IActionResult Admin()
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "admin/Promociones";
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<List<PromocionesModel>>().Result;
                    ViewData["Exito"] = TempData["Exito"]?.ToString();
                    ViewData["Error"] = TempData["Error"]?.ToString();
                    return View(result);
                }
                return View();

            }
        }


        public IActionResult Detalle(string id)
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Promociones/" + id;
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<PromocionesModel>().Result;

                    return View(result);
                }
                return View();

            }
        }

        public IActionResult CrearPromocion()
        {
            return View();
        }

        [HttpPost]
        public IActionResult CrearPromocion(PromocionesModel model)
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Promociones";
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.PostAsJsonAsync(url,model).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<List<PromocionesModel>>().Result;

                    TempData["Exito"] = "Se creo correctamente";
                    return RedirectToAction("Admin", "Promociones");
                }
                TempData["Error"] = "No se creo la promocion correctamente";
                return RedirectToAction("Admin", "Promociones");

            }
        }

        public IActionResult EliminarPromocion(string id)
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Promociones/" + id;
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.DeleteAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {

                    TempData["Exito"] = "Se elimino correctamente";
                    return RedirectToAction("Admin","Promociones");
                }
                TempData["Error"] = "No se elimino correctamente";
                return RedirectToAction("Admin", "Promociones");

            }
        }
    }
}
