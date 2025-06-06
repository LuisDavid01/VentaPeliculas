namespace ventaPeliculaWeb.Services
{
    public interface ITokenService
    {
        public Task<String?> GenerateToken();
    }
}
