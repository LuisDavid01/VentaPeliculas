using System.Net.Http.Headers;
using System.Net.Http;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ventaPeliculaWeb.Models;

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
        public IActionResult RealizarCompra(CompraModel model)
        {

            if (!ModelState.IsValid)
            {
                return View();
            }
            using (var http = _httpClient.CreateClient())
            {
                
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "realizarCompra";
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                //var response = http.GetAsync(url).Result;
                var response = http.PostAsJsonAsync(url, model).Result;
                if (response.IsSuccessStatusCode)
                {
                    //todo hacer que redirija a la pagina de stripe
                   // response.Content.ReadFromJsonAsync();
                    return RedirectToAction("Index", "Factura");
                }
                return RedirectToAction("Index", "Factura");

            }
        }

        public IActionResult Success()
        {

            return View();
        }



    }
}
