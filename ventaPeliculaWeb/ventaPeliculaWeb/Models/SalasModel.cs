﻿using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ventaPeliculaWeb.Models
{
    public class SalasModel
    {
        public string? _id { get; set; }
        public string? nombre { get; set; }
        public MoviesModel? id_movie { get; set; }
        public TeatroModel? id_teatro { get; set; }
        public TipoSalaModel? tipo_sala { get; set; }
        public decimal? precioAsiento { get; set; }
    }
}
