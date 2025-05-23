﻿namespace ventaPeliculaWeb.Models
{
    public class SesionModel
    {
        public string? _id { get; set; }
        public DateTime? fechaInicio { get; set; }
        public DateTime? fechaFinalizacion { get; set; }
        public SalasModel? sala { get; set; }
        public List<List<AsientosModel>>? asientos { get; set; }
        public List<SalasModel>? salas { get; set; }
        public string? IdSalaTemp { get; set; }
    }
}
