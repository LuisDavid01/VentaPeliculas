namespace ventaPeliculaWeb.Services
{
    public interface ITokenService
    {
        public Task<bool> GenerateToken();
    }
}
