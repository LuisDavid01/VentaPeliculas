using Microsoft.AspNetCore.Mvc;

namespace ventaPeliculaWeb.Models
{
    public class FacturaModel
    {
        public string? _id { get; set; }
        public UsuariosModel? cliente { get; set; }
        public decimal? precioTotal { get; set; }
        public string? metodoPago { get; set; }
        public Dictionary<string, object>? Items { get; set; }
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }


    }
}
