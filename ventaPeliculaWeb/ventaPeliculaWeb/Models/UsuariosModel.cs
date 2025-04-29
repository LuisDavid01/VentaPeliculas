namespace ventaPeliculaWeb.Models
{
    public class UsuariosModel
    {
        public string? _id { get; set; }
        public string? nombre { get; set; }
        public string? username { get; set; }
        public string? rol { get; set; }
        public string? password { get; set; }
        public string? token { get; set; }
        public string? refreshtoken { get; set; }
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }
    }
}
