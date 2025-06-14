﻿namespace ventaPeliculaWeb.Models
{
    public class Sesion { 
        public string? _id { get; set; }
        public DateTime? fechaInicio { get; set; }
        public DateTime? fechaFinalizacion { get; set; }
        public MoviesModel? peliculaSesion { get; set; }
    }
    public class Sala { 
        public string? nombre {  get; set; }
        public List<Sesion>? sesiones { get; set; }

    }
    public class Peliculas { 
        public MoviesModel? pelicula { get; set; }
        public List<Sala>? salas { get; set; }
    }
    public class SesionesPorPelicula
    {
        public string? teatro {  get; set; }

        public List<Peliculas>? Peliculas { get; set; }
    }
}
