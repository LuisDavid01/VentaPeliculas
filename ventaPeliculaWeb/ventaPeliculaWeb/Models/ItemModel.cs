namespace ventaPeliculaWeb.Models
{
    public class ItemModel
    {
        public string? _id { get; set; }
        public decimal? PrecioUnitario { get; set; }

        public List<string>? AsientosSeleccionados { get; set; }
        public DateTime? FechaInicio { get; set; }
        public int? Cantidad { get; set; }

        public string? NombrePelicula { get; set; }
        public string? NombreCine { get; set; }
        public string? TipoSala { get; set; }

        public string? idTeatro { get; set; }
        public string? idMovie { get; set; }
        public string? idTipoSala { get; set; }

        public List<List<AsientosModel>>? asientos { get; set; }

    }
}
