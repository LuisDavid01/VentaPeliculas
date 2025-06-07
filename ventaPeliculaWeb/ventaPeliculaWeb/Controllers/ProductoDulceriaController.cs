using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using ventaPeliculaWeb.Models;

namespace ventaPeliculaWeb.Controllers
{
    public class ProductoProductoDulceriaController : Controller
    {
        private readonly IHttpClientFactory _httpClient;
        private readonly IConfiguration _configuration;


        public ProductoProductoDulceriaController(IConfiguration configuration, IHttpClientFactory httpClient)
        {
            _httpClient = httpClient;
            _configuration = configuration;

        }
        public IActionResult Index()
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "ProductoDulceria";
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<List<ProductoDulceriaModel>>().Result;

                    return View(result);
                }
                return View();

            }
        }

        [FiltroAdmin]
        public IActionResult VerProductoDulcerias()
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "ProductoDulceria";
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<List<ProductoDulceriaModel>>().Result;

                    return View(result);
                }
                return View();

            }
        }
        [FiltroAdmin]
        public IActionResult CrearProductoDulceria()
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Teatro";

                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<List<DulceriaModel>>().Result;
                    var model = new ProductoDulceriaModel
                    {
                        ListaDulcerias = result!.ToList(),
                    };
                    return View(model);
                }
                return View();

            }
        }

        [FiltroAdmin]
        [HttpPost]

        public IActionResult CrearProductoDulceria(ProductoDulceriaModel model)
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var ProductoDulceriaModelDto = new
                {
                    nombre = model.nombre,
                    model.precio,
                    model.cantidad,
                    model.descripcion,
                    id_dulceria = model.id_dulceria
                };
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "ProductoDulceria";
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.PostAsJsonAsync(url, ProductoDulceriaModelDto).Result;
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction("VerProductoDulcerias", "ProductoDulceria");
                }
                return RedirectToAction("VerProductoDulcerias", "ProductoDulceria");

            }
        }

        [FiltroAdmin]
        public IActionResult EditarProductoDulceria(string id)
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Dulceria";
                var urlProductoDulceria = _configuration.GetSection("Variables:urlWebApi").Value + "ProductoDulceria/" + id;
                var response = http.GetAsync(url).Result;
                var ProductoDulceriaResponse = http.GetAsync(urlProductoDulceria).Result;
                if (response.IsSuccessStatusCode && ProductoDulceriaResponse.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<List<DulceriaModel>>().Result;
                    var resultProductoDulceria = ProductoDulceriaResponse.Content.ReadFromJsonAsync<ProductoDulceriaModel>().Result;
                    var model = resultProductoDulceria;
                    model!.ListaDulcerias = result;
                    return View(model);
                }
                return RedirectToAction("VerProductoDulcerias", "ProductoDulceria");

            }
        }

        [FiltroAdmin]
        [HttpPost]
        public IActionResult EditarProductoDulceria(ProductoDulceriaModel model)
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var ProductoDulceriaModelDto = new
                {
                    nombre = model.nombre,
                    model.precio,
                    model.cantidad,
                    model.descripcion,
                    id_dulceria = model.id_dulceria,
                    model.createdBy,
                    model.createdAt,
                    model.updatedAt
                };
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "ProductoDulceria/" + model._id;
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.PutAsJsonAsync(url, ProductoDulceriaModelDto).Result;
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction("VerProductoDulcerias", "ProductoDulceria");
                }
                return RedirectToAction("VerProductoDulcerias", "ProductoDulceria");

            }
        }
        [FiltroAdmin]
        public IActionResult EliminarProductoDulceria(string id)
        {

            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "ProductoDulceria/" + id;
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.DeleteAsync(url).Result;

                return RedirectToAction("VerProductoDulcerias", "ProductoDulceria");

            }
        }
    }
}
