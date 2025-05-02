namespace ventaPeliculaWeb.Models
{
    public class SesionModel
    {
        public string? _id { get; set; }
        public DateTime? fechaInicio { get; set; }
        public DateTime? fechaFinalizacion { get; set; }
        //public SalasModel? id_sala { get; set; }
        public string? id_sala { get; set; }
        public List<List<AsientosModel>>? asientos { get; set; }
    }
}
