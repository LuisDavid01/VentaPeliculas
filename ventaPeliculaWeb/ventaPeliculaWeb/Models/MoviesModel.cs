﻿

namespace ventaPeliculaWeb.Models
{
    public class MoviesModel
    {
        public string? _id { get; set; }
        public string? titulo { get; set; }
        public string? sinopsis { get; set; }
        public float? duracion { get; set; }
        public string? productora { get; set; } 
        public string? cartelera { get; set; }
        public IFormFile? imgFile { get; set; }
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }

    }
}
