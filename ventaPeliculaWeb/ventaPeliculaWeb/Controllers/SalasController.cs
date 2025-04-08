using Microsoft.AspNetCore.Mvc;
using ventaPeliculaWeb.Models;


namespace ventaSalaWeb.Controllers
{
    public class SalasController : Controller
    {
        private readonly IHttpClientFactory _httpClient;
        private readonly IConfiguration _configuration;

        public SalasController(IConfiguration configuration, IHttpClientFactory httpClient)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }
        public IActionResult Index()
        {
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Salas/0";
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<List<SalasModel>>().Result;

                    return View(result);
                }
                return View(null);

            }
        }
        [HttpGet]
        public IActionResult CrearSala()
        {
            return View();
        }
        [HttpPost]
        public IActionResult CrearSala(SalasModelDto model)
        {
            
            model.asientos = new List<AsientosModel>(30);
            for (var i = 0; i < 30; i++) {
                model.asientos.Add(new AsientosModel
                {
                    numAsiento = $"A{i + 1}", 
                    ocupado = false
                });
            }

            if (!ModelState.IsValid)
            {
                return View(model);
            }
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Salas";
                var response = http.PostAsJsonAsync(url, model).Result;
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction("Index", "Salas");
                }
                return RedirectToAction("Index", "Salas");

            }
        }

        public IActionResult VerSala(string id)
        {
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Salas/" + id;
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<SalasModel>().Result;

                    return View(result);
                }
                return View(null);

            }
        }

        public IActionResult EditarSala(string id)
        {
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Salas/" + id;
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<SalasModel>().Result;
                    if (result != null ) {
                        var salasParsed = new SalasModelDto();
                        salasParsed.nombre = result.nombre;
                        salasParsed.id_movie = result.id_movie._id;
                        salasParsed.asientos = result.asientos;
                        salasParsed.precioAsiento = result.precioAsiento;
                        salasParsed._id = result._id;

                        return View(salasParsed);
                    }
                    
                }
                return View(null);

            }
        }

        [HttpPost]
        public IActionResult EditarSala(SalasModelDto model)
        {
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Salas/" + model._id;
                var response = http.PutAsJsonAsync(url, model).Result;

                return RedirectToAction("Index", "Salas");

            }
        }

        public IActionResult EliminarSala(string id)
        {

            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Salas/" + id;
                var response = http.DeleteAsync(url).Result;

                return RedirectToAction("Index", "Salas");

            }
        }
    }
}
