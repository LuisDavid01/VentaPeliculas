using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using ventaPeliculaWeb.Models;

namespace ventaPeliculaWeb.Controllers
{
    [FiltroSesion]
    [FiltroAdmin]
    public class SesionController : Controller
    {
        private readonly IHttpClientFactory _httpClient;
        private readonly IConfiguration _configuration;

        public SesionController(IConfiguration configuration, IHttpClientFactory httpClient)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public IActionResult Index()
        {
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Sesion";
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {

                    var result = response.Content.ReadFromJsonAsync<List<SesionModel>>().Result;

                    return View(result);
                }
                return View(null);

            }
        }
        [HttpGet]
        public IActionResult CrearSesionNueva()
        {
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Salas";
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {

                    var result = response.Content.ReadFromJsonAsync<List<SalasModel>>().Result;
                    var selectSalas = new SesionModelDto
                    {
                        salas = result
                    };
                    return View(selectSalas);
                }
                return View();

            }
        }
        [HttpPost]
        public IActionResult CrearSesion(SesionModelDto model)
        {

            int letraAscii = 65;
            var newAsientos = new List<List<AsientosModel>>();
            for (int i = 0; i < 20; i++)
            {
                newAsientos.Add(new List<AsientosModel>());
                int numeroDeAsiento = 1;
                for (int j = 0; j < 20; j++)
                {
                    Console.WriteLine(letraAscii);
                    newAsientos[i].Add(new AsientosModel
                    {
                        numAsiento = $"{(char)letraAscii}{numeroDeAsiento++}",
                        ocupado = false,

                    });
                }
                letraAscii++;
            }
            model.asientos = newAsientos;

            if (!ModelState.IsValid)
            {
                return View(model);
            }
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Sesion";
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.PostAsJsonAsync(url, model).Result;
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction("Index", "Sesion");
                }
                return RedirectToAction("Index", "Sesion");

            }
        }


        public IActionResult VerSesion(string id)
        {
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Sesion/" + id;
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<SesionModel>().Result;
                    
                    return View(result);
                }
                return View(null);

            }
        }

        public IActionResult EditarSesion(string id)
        {
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Sesion/" + id;
                var response = http.GetAsync(url).Result;
                var urlSalas = _configuration.GetSection("Variables:urlWebApi").Value + "Salas";
                var responseSalas = http.GetAsync(urlSalas).Result;
                if (response.IsSuccessStatusCode && responseSalas.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<SesionModel>().Result;
                    var resultSalas = responseSalas.Content.ReadFromJsonAsync<List<SalasModel>>().Result;
                    if (result != null)
                    {
                        /*
                        var SesionParsed = new SesionModelDto
                        {
                            fechaInicio = result.fechaInicio,
                            fechaFinalizacion = result.fechaFinalizacion,
                            asientos = result.asientos,
                            //id_sala = result!.id_sala!._id,
                            id_sala= result.id_sala!.nombre,
                            _id = result._id,
                            salas = resultSalas
                        };
                        */
                        result.salas = resultSalas;
                        return View(result);
                    }

                }
                return View(null);

            }
        }

        [HttpPost]
        public IActionResult EditarSesion(SesionModel model)
        {
            
            using (var http = _httpClient.CreateClient())
            {
                var sesionEditada = new SesionModelDto
                {
                    fechaInicio = model.fechaInicio,
                    fechaFinalizacion = model.fechaFinalizacion,
                    asientos = model.asientos,
                    id_sala = model.IdSalaTemp,
                    _id= model._id,
                };
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Sesion/" + model._id;
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.PutAsJsonAsync(url, sesionEditada).Result;

                return RedirectToAction("Index", "Sesion");

            }
        }

        public IActionResult EliminarSesion(string id)
        {

            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Sesion/" + id;
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.DeleteAsync(url).Result;

                return RedirectToAction("Index", "Sesion");

            }
        }
    }
}

