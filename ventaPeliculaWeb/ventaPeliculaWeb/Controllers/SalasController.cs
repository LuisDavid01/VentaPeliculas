using System.ComponentModel.Design;
using System.Net.Http.Headers;
using System.Reflection;
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
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Salas";
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
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
        public IActionResult CrearSalaNueva()
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url1 = _configuration.GetSection("Variables:urlWebApi").Value + "Movies";
                var url2 = _configuration.GetSection("Variables:urlWebApi").Value + "Teatro";
                var url3 = _configuration.GetSection("Variables:urlWebApi").Value + "TipoSala";

                var response1 = http.GetAsync(url1).Result;
                var response2 = http.GetAsync(url2).Result;
                var response3 = http.GetAsync(url3).Result;
                if (response1.IsSuccessStatusCode && response2.IsSuccessStatusCode && response3.IsSuccessStatusCode)
                {
                    var result1 = response1.Content.ReadFromJsonAsync<List<MoviesModel>>().Result;
                     var result2 = response2.Content.ReadFromJsonAsync<List<TeatroModel>>().Result;
                    var result3 = response3.Content.ReadFromJsonAsync<List<TipoSalaModel>>().Result;

                    var SelectsParsed = new SalasModelDto {
                        ListaMovie = result1,
                        ListaTeatro = result2,
                        ListaTipo_sala = result3,
                    };
                    return View(SelectsParsed);
                }
                return View();

            }
            
        }
        [HttpPost]
        public IActionResult CrearSala(SalasModelDto model)
        {


            if (!ModelState.IsValid)
            {
                return View(model);
            }
            using (var http = _httpClient.CreateClient("DefaultClient"))
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
            using (var http = _httpClient.CreateClient("DefaultClient"))
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
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Salas/" + id;
                var response = http.GetAsync(url).Result;
                var url1 = _configuration.GetSection("Variables:urlWebApi").Value + "Movies";
                var url2 = _configuration.GetSection("Variables:urlWebApi").Value + "Teatro";
                var url3 = _configuration.GetSection("Variables:urlWebApi").Value + "TipoSala";

                var response1 = http.GetAsync(url1).Result;
                var response2 = http.GetAsync(url2).Result;
                var response3 = http.GetAsync(url3).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<SalasModel>().Result;
                    if (result != null ) {
                        var result1 = response1.Content.ReadFromJsonAsync<List<MoviesModel>>().Result;
                        var result2 = response2.Content.ReadFromJsonAsync<List<TeatroModel>>().Result;
                        var result3 = response3.Content.ReadFromJsonAsync<List<TipoSalaModel>>().Result;
                        var salasParsed = new SalasModelDto
                        {
                            nombre = result.nombre,
                            tipoSala = result.tipoSala!._id,
                            id_teatro = result.teatro!._id,

                            precioAsiento = result.precioAsiento,
                            _id = result._id,
                            ListaMovie = result1,
                            ListaTeatro = result2,
                            ListaTipo_sala = result3,
                        };

                        return View(salasParsed);
                    }
                    
                }
                return View(null);

            }
        }

        [HttpPost]
        public IActionResult EditarSala(SalasModelDto model)
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Salas/" + model._id;
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.PutAsJsonAsync(url, model).Result;

                return RedirectToAction("Index", "Salas");

            }
        }

        public IActionResult EliminarSala(string id)
        {

            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Salas/" + id;
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.DeleteAsync(url).Result;

                return RedirectToAction("Index", "Salas");

            }
        }
    }
}
