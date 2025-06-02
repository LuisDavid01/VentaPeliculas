using System.Text.Json;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using ventaPeliculaWeb.Models;
using System.Text.Json.Nodes;

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
            if (string.IsNullOrEmpty(model.HCaptchaToken))
            {
                TempData["Mensaje"] = "complete el captcha para continuar";
                return View();
            }

            using (var http = _httpClient.CreateClient())
            {

                var catpchaUrl = _configuration.GetSection("Variables:urlWebApi").Value + "verifyHCaptcha";
                var verifyHCaptcha = await http.PostAsJsonAsync(catpchaUrl, new { token = model.HCaptchaToken });
                if (verifyHCaptcha.IsSuccessStatusCode)
                {

                    var StringResponse = await verifyHCaptcha.Content.ReadAsStringAsync();

                    //convertimos la respuesta en un json para poder evaluarla
                    var jsonResponse = JsonNode.Parse(StringResponse);
                    if (jsonResponse != null)
                    {
                        var success = (bool?)jsonResponse["success"];

                        if (success == null || success != true)
                        {
                            TempData["Mensaje"] = "Complete el captcha nuevamente";
                            return View();

                        }
                    }


                }
                else
                {
                    TempData["Mensaje"] = "HCaptcha No se verifico correctamente";
                    return View();
                }


                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Login";
                var response = await http.PostAsJsonAsync(url, model);

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadFromJsonAsync<UsuariosModel>();

                    if (result != null)
                    {
                        var cookieOptions = new CookieOptions
                        {
                            HttpOnly = true, 
                            Secure = true,   
                            SameSite = SameSiteMode.Strict,
                            Expires = DateTime.UtcNow.AddDays(4) 
                        };
                        // Guardamos la informacion del usuario en cookies
                        Response.Cookies.Append("Token", result!.token!, cookieOptions);
                        Response.Cookies.Append("RefreshToken", result!.refreshtoken!, cookieOptions);
                        Response.Cookies.Append("UsuarioId", result!._id!, cookieOptions);
                        Response.Cookies.Append("Correo", result!.email!, cookieOptions);
                        Response.Cookies.Append("Nombre", result!.nombre!, cookieOptions);
                        Response.Cookies.Append("Username", result!.username!, cookieOptions);
                        Response.Cookies.Append("Rol", result!.rol!, cookieOptions);
                        return RedirectToAction("Index", "Home");
                        
                    }

                    TempData["Mensaje"] = "No ha iniciado sesion correctamente";
                    return View();
                }
            }

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register(UsuariosModel model)
        {
            
            if (string.IsNullOrEmpty(model.HCaptchaToken))
            {
                TempData["Mensaje"] = "complete el captcha para continuar";
                return View();
            }
                using (var http = _httpClient.CreateClient())
                {
                    var catpchaUrl = _configuration.GetSection("Variables:urlWebApi").Value + "verifyHCaptcha";
                    var verifyHCaptcha = await http.PostAsJsonAsync(catpchaUrl, new { token = model.HCaptchaToken });
                    if (verifyHCaptcha.IsSuccessStatusCode)
                    {

                        var StringResponse = await verifyHCaptcha.Content.ReadAsStringAsync();

                        //convertimos la respuesta en un json para poder evaluarla
                        var jsonResponse = JsonNode.Parse(StringResponse);
                        if (jsonResponse != null)
                        {
                            var success = (bool?)jsonResponse["success"];

                            if (success == null || success != true)
                            {
                                TempData["Mensaje"] = "Complete el captcha nuevamente";
                                return View();

                            }
                        }


                    }
                    else {
                        TempData["Mensaje"] = "HCaptcha No se verifico correctamente";
                        return View();
                    }

                    var url = _configuration.GetSection("Variables:urlWebApi").Value + "Register";
                    var response = await http.PostAsJsonAsync(url, model);

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
