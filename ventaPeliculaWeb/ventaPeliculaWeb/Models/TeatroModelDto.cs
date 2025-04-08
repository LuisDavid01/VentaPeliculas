namespace ventaPeliculaWeb.Models
{
    public class TeatroModelDto
    {
        public string? _id { get; set; }
        public string? nombre { get; set; }
        public string? ubicacion { get; set; }
        public List<string> id_salas { get; set; } = new List<string>();
    }
}
