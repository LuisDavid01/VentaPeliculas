namespace ventaPeliculaWeb.Models
{
    public class SalasModelDto
    {
        public string? _id { get; set; }
        public string? nombre { get; set; }
        public string? tipoSala { get; set; }
        public string? id_teatro { get; set; }
        public decimal? precioAsiento { get; set; }

        public List<TipoSalaModel>? ListaTipo_sala { get; set; }
        public List<MoviesModel>? ListaMovie { get; set; }
        public List<TeatroModel>? ListaTeatro { get; set; }
    }
}
