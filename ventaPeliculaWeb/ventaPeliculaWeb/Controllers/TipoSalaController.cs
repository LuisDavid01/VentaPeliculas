using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using ventaPeliculaWeb.Models;

namespace ventaPeliculaWeb.Controllers
{
    [FiltroSesion]
    [FiltroAdmin]
    public class TipoSalaController : Controller
    {
        private readonly IHttpClientFactory _httpClient;
        private readonly IConfiguration _configuration;

        public TipoSalaController(IConfiguration configuration, IHttpClientFactory httpClient)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }
        public IActionResult Index()
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "TipoSala";
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {

                    var result = response.Content.ReadFromJsonAsync<List<TipoSalaModel>>().Result;



                    return View(result);
                }
                return View();

            }
        }
        public IActionResult CrearTipoSala()
        {
            return View();
        }

        [HttpPost]
        public IActionResult CrearTipoSala(TipoSalaModel model)
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "TipoSala";
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.PostAsJsonAsync(url, model).Result;
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction("Index", "TipoSala");
                }
                return RedirectToAction("Index", "TipoSala");

            }
        }

        public IActionResult VerTipoSala(string id)
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "TipoSala/" + id;
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<TipoSalaModel>().Result;

                    return View(result);
                }
                return View(null);

            }
        }
        [HttpPost]
        public IActionResult EditarTipoSala(TipoSalaModel model)
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "TipoSala/" + model._id;
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.PutAsJsonAsync(url, model).Result;

                return RedirectToAction("Index", "TipoSala");

            }
        }

        public IActionResult EliminarTipoSala(string id)
        {

            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "TipoSala/" + id;
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.DeleteAsync(url).Result;

                return RedirectToAction("Index", "TipoSala");

            }
        }

    }
}
