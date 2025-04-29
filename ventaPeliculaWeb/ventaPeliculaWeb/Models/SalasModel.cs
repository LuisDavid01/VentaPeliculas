using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ventaPeliculaWeb.Models
{
    public class SalasModel
    {
        public string? _id { get; set; }
        public string? nombre { get; set; }
        public MoviesModel? id_movie { get; set; }
        public List<List<AsientosModel>>? asientos { get; set; }
        public float? precioAsiento { get; set; }
    }
}
