using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ventaPeliculaWeb.Models;
using ventaPeliculaWeb.Services;

namespace ventaPeliculaWeb.Controllers
{

    public class HomeController : Controller
    {
        private readonly IHttpClientFactory _httpClient;
        private readonly IConfiguration _configuration;
        private readonly ILogger<HomeController> _logger;
        private readonly ITrieService _trieService;
        public HomeController(IConfiguration configuration, IHttpClientFactory httpClient, ILogger<HomeController> logger, ITrieService trie)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _logger = logger;
            _trieService = trie;
        }

        public IActionResult Index()
        {
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Movies";
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<List<MoviesModel>>().Result;

                    return View(result);
                }
                return View();

            }
        }
        public IActionResult VerPeliculas()
        {
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Sesiones/Peliculas";
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<List<SalasPeliculasModel>>().Result;

                    return View(result);
                }
                return View();

            }
        }

        public IActionResult VerPelicula(string idMovie)
        {
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Salas/" + idMovie;
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<List<SalasModel>>().Result;

                    return View(result);
                }
                return View();

            }
        }
        [HttpGet]
        public IActionResult BuscarPeliculaPorTitulo(string titulo)
        {
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Sesiones/Pelicula/" + titulo;
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<List<SesionModel>>().Result;
                    _trieService.InsertTrie(titulo);
                    return View(result);
                }
                return View();

            }
        }

        [HttpGet]
        public IActionResult Sesion(string id)
        {
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Sesion/" + id;
                var response = http.GetAsync(url).Result;

                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<SesionModel>().Result;
                    var Item = new ItemModel
                    {
                        PrecioUnitario = result!.sala!.precioAsiento,
                        AsientosSeleccionados = [],
                        FechaInicio = result!.fechaInicio,
                        Cantidad = 0,
                        NombrePelicula = result!.sala!.id_movie!.titulo,
                        TipoSala = result!.sala!.tipo_sala!.nombre,
                        id_sesion = result!._id,
                        asientos = result.asientos

                    };
                    

                    return View(Item);
                }
                return View();

            }
        }

        

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
