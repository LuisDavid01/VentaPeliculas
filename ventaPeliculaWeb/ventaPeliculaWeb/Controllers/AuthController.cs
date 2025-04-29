using System.Text.Json;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
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
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Login";
                var response =  http.PostAsJsonAsync(url, model).Result;

                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<UsuariosModel>().Result;

                    if (result != null)
                    {

                        /*
                            HttpContext.Session.SetString("Token", result!.token!);
                            HttpContext.Session.SetString("UsuarioId", result._id!.ToString()!);
                            HttpContext.Session.SetString("Correo", result.email!.ToString()!);
                            HttpContext.Session.SetString("Nombre", result.nombre!.ToString());
                            HttpContext.Session.SetString("Username", result.username!.ToString());
                            HttpContext.Session.SetString("Rol", result.rol!.ToString()!);
                            //HttpContext.Session.SetString("ImagenPerfil", result.Imagen!.ToString()!);
                        */
                        var cookieOptions = new CookieOptions
                        {
                            HttpOnly = true, 
                            Secure = true,   
                            SameSite = SameSiteMode.Strict,
                            Expires = DateTime.UtcNow.AddDays(1) 
                        };

                        // Guardamos la informacion del usuario en cookies
                        Response.Cookies.Append("Token", result!.token!, cookieOptions);
                        Response.Cookies.Append("UsuarioId", result!._id!, cookieOptions);
                        Response.Cookies.Append("Correo", result!.email!, cookieOptions);
                        Response.Cookies.Append("Nombre", result!.nombre!, cookieOptions);
                        Response.Cookies.Append("Username", result!.username!, cookieOptions);
                        Response.Cookies.Append("Rol", result!.rol!, cookieOptions);
                        return RedirectToAction("Index", "Home");
                        
                    }

                    TempData["Mensaje"] = "No ha iniciado sesion correctamente";
                    return View(model);
                }
            }

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register(UsuariosModel model)
        {


            using (var http = _httpClient.CreateClient())
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Register";
                var response = http.PostAsJsonAsync(url, model).Result;

                if (response.IsSuccessStatusCode)
                {
                   

                    
                    return RedirectToAction("Login", "Auth");
                }
            }
            TempData["Mensaje"] = "No se ha registrado correctamente";
            return View();
        }


        
        public async Task<IActionResult> Logout() {
            var cookiesEliminar = new [] { "Token", "UsuarioId", "Correo", "Nombre", "Username", "Rol" };
            foreach (var Cookie in cookiesEliminar) {
                Response.Cookies.Delete(Cookie);
            }
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Auth");
        }


    }
}
