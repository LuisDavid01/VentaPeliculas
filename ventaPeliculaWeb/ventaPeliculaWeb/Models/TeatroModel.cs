namespace ventaPeliculaWeb.Models
{
    public class TeatroModel
    {

        public string? _id { get; set; }
        public string? nombre { get; set; }
        public string? ubicacion { get; set; }
        public List<SalasModel> id_salas { get; set; } 
    }
}
