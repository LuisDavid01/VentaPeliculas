using System.Net.Http.Headers;
using Microsoft.AspNetCore.Http;
using ventaPeliculaWeb.Services;

namespace ventaPeliculaWeb.Handlers
{
    public class TokenHandler : DelegatingHandler
    {
        private readonly ITokenService _tokenService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private bool _isRefreshingToken = false;

        public TokenHandler(ITokenService tokenService, IHttpContextAccessor httpContextAccessor)
        {
            _tokenService = tokenService;
            _httpContextAccessor = httpContextAccessor;
        }
        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var response = await base.SendAsync(request, cancellationToken);

            if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized) // 401
            {
                if (!_isRefreshingToken)
                {
                    lock (this)
                    {
                        _isRefreshingToken = true;
                    }

                    try
                    {
                        var tokenGenerated = await _tokenService.GenerateToken();

                        if (tokenGenerated != null)
                        {
                            // Obtener colocamos el nuevo token
                            var cookieOptions = new CookieOptions
                            {
                                HttpOnly = true,
                                Secure = true,
                                SameSite = SameSiteMode.Strict,
                                Expires = DateTime.UtcNow.AddDays(7)
                            };
                            _httpContextAccessor.HttpContext?.Response.Cookies.Append("Token", tokenGenerated, cookieOptions);

                            // Actualizar la solicitud con el nuevo token
                            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", tokenGenerated);
                            // Reintentar la solicitud
                            response = await base.SendAsync(request, cancellationToken);

                        }
                    }



                    finally
                    {
                        lock (this)
                        {
                            _isRefreshingToken = false;
                        }
                    }
                }
            }

            return response;
        }
    }
}
