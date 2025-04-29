namespace ventaPeliculaWeb.Models
{
    public class SalasModelDto
    {
        public string? _id { get; set; }
        public string? nombre { get; set; }
        public string? id_movie { get; set; }
        public string? id_teatro { get; set; }
        public List<List<AsientosModel>>? asientos { get; set; }
        public float? precioAsiento { get; set; }
    }
}
