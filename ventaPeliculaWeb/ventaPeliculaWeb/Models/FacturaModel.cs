using Microsoft.AspNetCore.Mvc;

namespace ventaPeliculaWeb.Models
{
    public class FacturaModel
    {
        public string? _id { get; set; }
        public string? nombreCliente { get; set; }
        public decimal? precioTotal { get; set; }
        public string? metodoPago { get; set; }
        public List<ItemModel>? Items { get; set; }


    }
}
