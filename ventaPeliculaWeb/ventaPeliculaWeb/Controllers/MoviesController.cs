using System.Net.Http.Headers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ventaPeliculaWeb.Models;
namespace ventaPeliculaWeb.Controllers
{
    [FiltroSesion]
    [FiltroAdmin]
    public class MoviesController : Controller
    {
        private readonly IHttpClientFactory _httpClient;
        private readonly IConfiguration _configuration;

        public MoviesController(IConfiguration configuration, IHttpClientFactory httpClient)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }
        public IActionResult Index()
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Movies";
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<List<MoviesModel>>().Result;

                    return View(result);
                }
                return View(null);

            }
        }
        
        public IActionResult CrearPelicula()
        {
            return View();
        }
        [HttpPost]
        public IActionResult CrearPelicula(MoviesModel model)
        {

            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var formData = new MultipartFormDataContent();
                formData.Add(new StringContent(content: model.titulo!), "titulo");
                formData.Add(new StringContent(content: model!.duracion!.ToString()!), "duracion");
                formData.Add(new StringContent(content: model.productora!), "productora");
                formData.Add(new StringContent(content: model.sinopsis!), "sinopsis");
                if (model.imgFile != null && model.imgFile.Length > 0)
                {
                    var streamContent = new StreamContent(model.imgFile.OpenReadStream());
                    streamContent.Headers.ContentType = new MediaTypeHeaderValue(model.imgFile.ContentType);
                    formData.Add(streamContent, "imgFile", model.imgFile.FileName);
                }
                Console.WriteLine("modelo de la imagen: " + model.imgFile);
            var url = _configuration.GetSection("Variables:urlWebApi").Value + "Movies";
            http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
            var response = http.PostAsync(url, formData).Result;
            if (response.IsSuccessStatusCode)
            {
                return RedirectToAction("Index", "Movies");
            }
            return RedirectToAction("Index", "Movies");
            };
        }
        

        public IActionResult VerPelicula(string id)
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Movies/" + id;
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<MoviesModel>().Result;

                    return View(result);
                }
                return View(null);

            }
        }
        [HttpPost]
        public IActionResult EditarPelicula(MoviesModel model)
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var formData = new MultipartFormDataContent();
                formData.Add(new StringContent(content: model.titulo!), "titulo");
                formData.Add(new StringContent(content: model!.duracion!.ToString()!), "duracion");
                formData.Add(new StringContent(content: model.productora!), "productora");
                formData.Add(new StringContent(content: model.sinopsis!), "sinopsis");
                formData.Add(new StringContent(content: model.cartelera!), "cartelera");
                
                if (model.imgFile != null && model.imgFile.Length > 0)
                {
                    Console.WriteLine(" largo de la imagen: " + model.imgFile.Length);
                    var streamContent = new StreamContent(model.imgFile.OpenReadStream());
                    streamContent.Headers.ContentType = new MediaTypeHeaderValue(model.imgFile.ContentType);
                    formData.Add(streamContent, "imgFile", model.imgFile.FileName);
                }

                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Movies/" + model._id;
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.PutAsync(url, formData).Result;

                return RedirectToAction("Index", "Movies");

            }
        }

        public IActionResult EliminarPelicula(string id)
        {

            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Movies/" + id;
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.DeleteAsync(url).Result;

                return RedirectToAction("Index", "Movies");

            }
        }
    }
}
