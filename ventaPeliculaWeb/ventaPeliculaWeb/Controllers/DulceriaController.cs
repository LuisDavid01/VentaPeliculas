using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using ventaPeliculaWeb.Models;

namespace ventaPeliculaWeb.Controllers
{
    
    public class DulceriaController : Controller
    {
        private readonly IHttpClientFactory _httpClient;
        private readonly IConfiguration _configuration;


        public DulceriaController(IConfiguration configuration, IHttpClientFactory httpClient)
        {
            _httpClient = httpClient;
            _configuration = configuration;

        }
        public IActionResult Index()
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Dulceria";
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<List<DulceriaModel>>().Result;

                    return View(result);
                }
                return View();

            }
        }
        [FiltroSesion]
        [FiltroAdmin]
        public IActionResult VerDulcerias()
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Dulceria";
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<List<DulceriaModel>>().Result;

                    return View(result);
                }
                return View();

            }
        }
        [FiltroSesion]
        [FiltroAdmin]
        public IActionResult CrearDulceria()
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Teatro";
                
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<List<TeatroModel>>().Result;
                    var model = new DulceriaModel
                    {
                        listaTeatros = result!.ToList(),
                    };
                    return View(model);
                }
                return View();

            }
        }
        [FiltroSesion]
        [FiltroAdmin]
        [HttpPost]
        
        public IActionResult CrearDulceria(DulceriaModel model)
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var DulceriaModelDto = new
                {
                    nombre = model.nombre,
                    id_teatro = model.idDelteatro
                };
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Dulceria";
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.PostAsJsonAsync(url, DulceriaModelDto).Result;
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction("VerDulcerias", "Dulceria");
                }
                return RedirectToAction("VerDulcerias", "Dulceria");

            }
        }
        [FiltroSesion]
        [FiltroAdmin]
        public IActionResult EditarDulceria(string id)
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Teatro";
                var urlDulceria = _configuration.GetSection("Variables:urlWebApi").Value + "Dulceria/" + id;
                var response = http.GetAsync(url).Result;
                var dulceriaResponse = http.GetAsync(urlDulceria).Result;
                if (response.IsSuccessStatusCode && dulceriaResponse.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<List<TeatroModel>>().Result;
                    var resultDulceria = dulceriaResponse.Content.ReadFromJsonAsync<DulceriaModel>().Result;
                    var model = resultDulceria;
                    model!.listaTeatros = result;
                    return View(model);
                }
                return RedirectToAction("VerDulcerias", "Dulceria");

            }
        }
        [FiltroSesion]
        [FiltroAdmin]
        [HttpPost]
        public IActionResult EditarDulceria(DulceriaModel model)
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var DulceriaModelDto = new
                {
                    model.nombre,
                    model.createdBy,
                    id_teatro = model.idDelteatro
                };
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Dulceria/" + model._id;
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.PutAsJsonAsync(url, DulceriaModelDto).Result;
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction("VerDulcerias", "Dulceria");
                }
                return RedirectToAction("VerDulcerias", "Dulceria");

            }
        }
        [FiltroSesion]
        [FiltroAdmin]
        public IActionResult EliminarDulceria(string id)
        {

            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Dulceria/" + id;
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.DeleteAsync(url).Result;

                return RedirectToAction("VerDulcerias", "Dulceria");

            }
        }
    }
}
