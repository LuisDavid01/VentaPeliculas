using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using ventaPeliculaWeb.Models;

namespace ventaPeliculaWeb.Controllers
{
    public class AuthController : Controller
    {
        private readonly IHttpClientFactory _httpClient;
        private readonly IConfiguration _configuration;


        public AuthController(IHttpClientFactory httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            
        }
        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Register()
        {
            return View();
        }


        [HttpPost]
        public async Task<IActionResult> Login(UsuariosModel model)
        {
            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Autenticacion/Login";
                var response =  http.PostAsJsonAsync(url, model).Result;

                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<UsuariosModel>().Result;

                    if (result != null)
                    {
                            

                            HttpContext.Session.SetString("Token", result!.token!);
                            HttpContext.Session.SetString("UsuarioId", result._id!.ToString()!);
                            HttpContext.Session.SetString("Correo", result.email!.ToString()!);
                            HttpContext.Session.SetString("Nombre", result.nombre!.ToString());
                            HttpContext.Session.SetString("Username", result.username!.ToString());
                            HttpContext.Session.SetString("Rol", result.rol!.ToString()!);
                            //HttpContext.Session.SetString("ImagenPerfil", result.Imagen!.ToString()!);
                            return RedirectToAction("Index", "Home");
                        
                    }

                    TempData["Mensaje"] = "ha iniciado sesion correctamente";
                    return View(model);
                }
            }

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register(UsuariosModel model)
        {
            

            return View();
        }


    }
}
