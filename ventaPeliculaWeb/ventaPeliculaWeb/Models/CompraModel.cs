namespace ventaPeliculaWeb.Models
{
    public class CompraModel
    {
        public string? StripeToken { get; set; }

        public string? id_sesion { get; set; }

        public List<string>? asientosSeleccionados { get; set; }

    }
}
