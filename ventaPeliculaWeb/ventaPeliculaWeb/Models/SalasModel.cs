using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ventaPeliculaWeb.Models
{
    public class SalasModel
    {
        public string? _id { get; set; }
        public string? nombre { get; set; }
        public TeatroModel? teatro { get; set; }
        public TipoSalaModel? tipoSala { get; set; }
        public decimal? precioAsiento { get; set; }
    }
}
