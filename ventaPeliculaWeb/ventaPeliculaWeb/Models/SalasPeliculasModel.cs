using AspNetCoreGeneratedDocument;

namespace ventaPeliculaWeb.Models
{
    public class SalasPeliculasModel
    {
        public string? _id { get; set; }

        public List<SesionModel>? sesiones { get; set; } 
        public List<SalasModel>? salas { get; set; }

    }
}
