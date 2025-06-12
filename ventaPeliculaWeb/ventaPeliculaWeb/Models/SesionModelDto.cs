namespace ventaPeliculaWeb.Models
{
    public class SesionModelDto
    {
    
        public string? _id { get; set; }
        public DateTime? fechaInicio { get; set; }
        public DateTime? fechaFinalizacion { get; set; }
        //public SalasModel? id_sala { get; set; }
        public string? id_sala { get; set; }
        public string? id_movie { get; set; }
        public List<AsientosModel>? asientos { get; set; }

        public List<SalasModel>? salas { get; set; }
        public List<MoviesModel>? peliculas { get; set; }
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }
    }
}
