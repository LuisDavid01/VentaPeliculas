using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ventaPeliculaWeb.Models
{
    public class ProductoDulceriaModel
    {
        public string? _id { get; set; }
        public string? nombre { get; set; }
        public string? imagen { get; set; }
        public IFormFile? imgFile { get; set; }
        public string? descripcion { get; set; }
        public decimal? precio { get; set; }
        public uint? cantidad { get; set; }
        public DulceriaModel? dulceria { get; set; }
        public List<DulceriaModel>? ListaDulcerias { get; set; }
        public string? id_dulceria { get; set; }
        public UsuariosModel? createdBy { get; }
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }
    }
}