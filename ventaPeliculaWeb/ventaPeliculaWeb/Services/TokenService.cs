using static System.Net.WebRequestMethods;
using System.Reflection;
using System.Net.Http.Headers;
using ventaPeliculaWeb.Models;

namespace ventaPeliculaWeb.Services
{
    public class TokenService : ITokenService
    {
        private readonly IHttpClientFactory _httpClient;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TokenService(IHttpClientFactory httpClient, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<bool> GenerateToken()
        {
            using (var http = _httpClient.CreateClient("RenewTokenClient"))
            {
                var refreshToken = _httpContextAccessor.HttpContext?.Request.Cookies["refreshtoken"];
                if (string.IsNullOrEmpty(refreshToken))
                {
                    return false;
                }
                http.DefaultRequestHeaders.Add("X-Refresh-Token", refreshToken);
                var url = _configuration.GetSection("Variables:urlWebApi").Value + "auth/token";
                var response = await http.PostAsJsonAsync(url, new {});
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadFromJsonAsync<Dictionary<string, string>>().Result;
                    var cookieOptions = new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = true,
                        SameSite = SameSiteMode.Strict,
                        Expires = DateTime.UtcNow.AddDays(7)
                    };
                    _httpContextAccessor.HttpContext?.Response.Cookies.Append("Token", result!["token"], cookieOptions);
                    return true;
                }
                return false;
            }
               
        }
    }
}
