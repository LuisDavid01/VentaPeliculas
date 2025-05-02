namespace ventaPeliculaWeb.Models
{
    public class SalasModelDto
    {
        public string? _id { get; set; }
        public string? nombre { get; set; }
        public string? tipo_sala { get; set; }
        public string? id_movie { get; set; }
        public string? id_teatro { get; set; }
        public float? precioAsiento { get; set; }

        public List<TipoSalaModel>? ListaTipo_sala { get; set; }
        public List<MoviesModel>? ListaMovie { get; set; }
        public List<TeatroModel>? ListaTeatro { get; set; }
    }
}
