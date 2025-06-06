﻿using System.Net.Http.Headers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ventaPeliculaWeb.Models;
using ventaPeliculaWeb.Services;

namespace ventaPeliculaWeb.Controllers
{
    [FiltroSesion]
    [FiltroAdmin]
    public class UsuariosController : Controller
    {
        private readonly IHttpClientFactory _httpClient;
        private readonly IConfiguration _configuration;
        private readonly ITokenService _TokenService;

        public UsuariosController(IConfiguration configuration, IHttpClientFactory httpClient, ITokenService tokenService)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _TokenService = tokenService;
        }
        [FiltroAdmin]
        public IActionResult Index()
        {
                using (var http = _httpClient.CreateClient("DefaultClient"))
                {
                    var url = _configuration.GetSection("Variables:urlWebApi").Value + "Usuarios/0";
                    http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                    var response = http.GetAsync(url).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        var result = response.Content.ReadFromJsonAsync<List<UsuariosModel>>().Result;

                        return View(result);
                    }

                

                    return View();
                }
                
           
            

        }
        /*
         * innecesario
        public IActionResult CrearUsuario()
        {
            return View();
        }
        [HttpPost]
        public IActionResult CrearUsuario(UsuariosModel model)
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Usuarios";
                var response = http.PostAsJsonAsync(url, model).Result;
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction("Index", "Usuarios");
                }
                return RedirectToAction("Index", "Usuarios");

            }
        }
        */
        public IActionResult VerUsuario(string id)
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Usuarios/" + id;
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<UsuariosModel>().Result;

                    return View(result);
                }
                return View(null);

            }
        }

        public IActionResult EditarUsuario(string id)
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Usuarios/" + id;
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<UsuariosModel>().Result;

                    return View(result);
                }
                return View(null);

            }
        }

        [HttpPost]
        public IActionResult EditarUsuario(UsuariosModel model)
        {
            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Usuarios/" + model._id;
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.PutAsJsonAsync(url, model).Result;

                return RedirectToAction("Index", "Usuarios");

            }
        }
        
        public IActionResult EliminarUsuario(string id)
        {

            using (var http = _httpClient.CreateClient("DefaultClient"))
            {
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "Usuarios/" + id;
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Request.Cookies["Token"]);
                var response = http.DeleteAsync(url).Result;

                return RedirectToAction("Index", "Usuarios");

            }
        }
    }
}
