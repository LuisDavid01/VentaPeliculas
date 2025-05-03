namespace ventaPeliculaWeb.Models
{
    public class ItemModel : MoviesModel
    {
        public ItemModel(MoviesModel model) { 
            this.titulo = model.titulo;
            this.cartelera = model.cartelera;
            this._id = model._id;
            this.duracion = model.duracion;
            this.sinopsis = model.sinopsis;
        }
        public new string? _id { get; set; }
        public new string? titulo { get; set; }
        public new string? sinopsis { get; set; }
        public new float? duracion { get; set; }
        public new string? productora { get; set; }
        public new string? cartelera { get; set; }
    }
}
