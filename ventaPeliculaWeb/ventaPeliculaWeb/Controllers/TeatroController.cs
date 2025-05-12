using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using ventaPeliculaWeb.Models;

namespace ventaPeliculaWeb.Controllers
{

    [FiltroSesion]
    [FiltroAdmin]
    public class TeatroController : Controller
    {
        private readonly IHttpClientFactory _httpClient;
        private readonly IConfiguration _configuration;

        public TeatroController(IConfiguration configuration, IHttpClientFactory httpClient)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }
        public IActionResult Index()
        {
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Teatro";
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<List<TeatroModel>>().Result;

                    return View(result);
                }
                return View(null);

            }
        }
        [HttpGet]
        public IActionResult CrearTeatro()
        {
            return View();
        }
        [HttpPost]
        public IActionResult CrearTeatro(TeatroModelDto model)
        {
            
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Teatro";
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.PostAsJsonAsync(url, model).Result;
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction("Index", "Teatro");
                }
                return RedirectToAction("Index", "Teatro");

            }
        }

        public IActionResult VerTeatro(string id)
        {
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Teatro/" + id;
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<TeatroModel>().Result;

                    return View(result);
                }
                return View();

            }
        }

        public IActionResult EditarTeatro(string id)
        {
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Teatro/" + id;
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<TeatroModel>().Result;
                    return View( result);

                }
                return View(null);

            }
        }

        [HttpPost]
        public IActionResult EditarTeatro(TeatroModel model)
        {
            var teatroParsed = new TeatroModelDto
            {
                _id = model._id,
                nombre = model.nombre,
                ubicacion = model.ubicacion,
                
            };
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Teatro/" + teatroParsed._id;
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.PutAsJsonAsync(url, teatroParsed).Result;

                return RedirectToAction("Index", "Teatro");

            }
        }

        public IActionResult EliminarTeatro(string id)
        {

            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Teatro/" + id;
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.DeleteAsync(url).Result;

                return RedirectToAction("Index", "Teatro");

            }
        }
    }
}
