using System.Net.Http.Headers;
using System.Net.Http;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ventaPeliculaWeb.Models;
using System.Reflection.Metadata.Ecma335;

namespace ventaPeliculaWeb.Controllers
{
    [FiltroSesion]
    public class CompraController : Controller
    {
        private readonly IHttpClientFactory _httpClient;
        private readonly IConfiguration _configuration;
        public CompraController(IConfiguration configuration, IHttpClientFactory httpClient)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }
        [HttpPost]
        public IActionResult RealizarCompra(ItemModel model)
        {
            if (model.AsientosSeleccionados == null || model.AsientosSeleccionados.Count <= 0) { 
                return RedirectToAction("VerPeliculas", "Home");
            }

            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var compra = new CompraModel
                {
                    id_sesion = model.id_sesion,
                    asientosSeleccionados = model.AsientosSeleccionados
                };
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "createCheckoutSession";
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.PostAsJsonAsync(url, compra).Result;
                if (response.IsSuccessStatusCode)
                {
                    //todo hacer que redirija a la pagina de stripe
                    var result = response.Content.ReadFromJsonAsync<CompraModel>().Result;

                    return View(result);
                }
                return View();

            }
        }

        [HttpPost]
        public IActionResult RealizarCompraDulceria(DulceriaItemModel model)
        {
            if (model.ProductosSeleccionados == null || model.ProductosSeleccionados.Count <= 0)
            {
                return RedirectToAction("Index", "ProductoDulceria");
            }
            model.ProductosSeleccionados = model.ProductosSeleccionados
            ?.Where(p => p.cantidad > 0)
            .ToList();

            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "createCheckoutSessionDulceria";
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.PostAsJsonAsync(url, model).Result;
                if (response.IsSuccessStatusCode)
                {
                    //todo hacer que redirija a la pagina de stripe
                    var result = response.Content.ReadFromJsonAsync<CompraModel>().Result;

                    return View(result);
                }
                return View();

            }
        }

        public IActionResult Success()
        {

            return View();
        }



    }
}
