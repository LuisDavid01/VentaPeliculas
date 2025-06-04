

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.DependencyInjection; 
using ventaPeliculaWeb.Handlers;
using ventaPeliculaWeb.Services;
using Polly;
using Polly.Extensions.Http;
var builder = WebApplication.CreateBuilder(args);
//politicas de reintento
var retryPolicy = HttpPolicyExtensions
    .HandleTransientHttpError() 
    .OrResult(response => response.StatusCode == System.Net.HttpStatusCode.TooManyRequests) 
    .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)), // Retraso exponencial: 2s, 4s, 8s
        onRetry: (outcome, timespan, retryAttempt, context) =>
        {
            Console.WriteLine($"Intento {retryAttempt} falló. Reintentando en {timespan.TotalSeconds} segundos...");
        });
// Add services to the container.
builder.Services.AddTransient<TokenHandler>();
builder.Services.AddControllersWithViews();
builder.Services.AddScoped<ITrieService, TrieService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddHttpClient("DefaultClient")
    .AddHttpMessageHandler<TokenHandler>()
    .AddPolicyHandler(retryPolicy);
builder.Services.AddHttpClient("RenewTokenClient")
    .AddHttpMessageHandler<TokenHandler>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddSession();

builder.Services.AddAuthentication(options => { 
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
}).AddCookie(options => {
    options.LoginPath = "/Auth/Login";
    options.LogoutPath = "/";
    options.ExpireTimeSpan = TimeSpan.FromDays(7);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSession();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
