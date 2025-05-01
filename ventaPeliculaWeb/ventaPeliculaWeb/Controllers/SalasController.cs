using System.Net.Http.Headers;
using System.Reflection;
using AgendaTuLookWeb.Models;
using Microsoft.AspNetCore.Mvc;
using ventaPeliculaWeb.Models;


namespace ventaSalaWeb.Controllers
{
    [FiltroSesion]
    [FiltroAdmin]
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
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Salas";
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                  
                    var result = response.Content.ReadFromJsonAsync<List<SalasModel>>().Result;
                    
                    for (int i = 0; i < result!.Count; i++)
                    {
                        int conteoAsientos = 0;
                        for (int j = 0; j < result[i].asientos!.Count; j++) {
                            conteoAsientos += result[i].asientos![j].Count;
                        }
                        result[i].totalAsientos = conteoAsientos;
                    }
                    
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

            int letraAscii = 65;
            var newAsientos = new List<List<AsientosModel>>();
                for (int i = 0; i < 20; i++)
                {
                    newAsientos.Add(new List<AsientosModel>());                    
                    int numeroDeAsiento = 1; 
                    for (int j = 0; j < 20; j++)
                    {
                        newAsientos[i].Add(new AsientosModel
                        {
                            numAsiento = $"{(char)letraAscii}{numeroDeAsiento++}", 
                            ocupado = false,
                            
                        });
                    }
                    letraAscii = letraAscii++;
            }
            model.asientos = newAsientos;

            if (!ModelState.IsValid)
            {
                return View(model);
            }
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Salas";
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
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
                    int conteoAsientos = 0;
                        for (int i = 0; i < result!.asientos!.Count; i++)
                        {
                            conteoAsientos += result.asientos[i].Count;
                        }
                    result.totalAsientos = conteoAsientos;
                   
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
                        salasParsed.tipo_sala = result.tipo_sala!._id;
                        salasParsed.id_teatro = result.id_teatro!._id;
                        salasParsed.id_movie = result.id_movie!._id;
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
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.PutAsJsonAsync(url, model).Result;

                return RedirectToAction("Index", "Salas");

            }
        }

        public IActionResult EliminarSala(string id)
        {

            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Salas/" + id;
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.DeleteAsync(url).Result;

                return RedirectToAction("Index", "Salas");

            }
        }
    }
}
