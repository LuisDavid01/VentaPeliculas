namespace ventaPeliculaWeb.Models
{
    public class CompraModel
    {
        public string? StripeToken { get; set; }

        public string? id_sesion { get; set; }

        public List<string>? asientosSeleccionados { get; set; }
        public string? clientSecret { get; set;}
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }
    }
}
