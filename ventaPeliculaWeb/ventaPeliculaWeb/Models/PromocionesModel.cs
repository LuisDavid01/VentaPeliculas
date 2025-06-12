namespace ventaPeliculaWeb.Models
{
    public class PromocionesModel
    {
        public string? code { get; set; }
        public string? descripcion { get; set; }
        public DateTime? expirationDate { get; set; }
        public float? discountPercentage { get; set; }
        public string? promoCodoId { get; set; }
        public string? couponId { get; set; }
        public string? createdBy { get; set; }
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }
    }
}
