namespace ventaPeliculaWeb.Models
{
    public class CarritoModel : MoviesModel
    {
        public List<ItemModel>? Items { get; set; }
        public int? itemCount { get; set; }
        public decimal? precioTotal { get; set; }


    }
}
