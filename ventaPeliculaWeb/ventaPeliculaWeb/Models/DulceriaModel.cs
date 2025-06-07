namespace ventaPeliculaWeb.Models
{
    public class DulceriaModel
    {
		public string? _id { get; set; }
        public string? nombre { get; set; }
		public TeatroModel? id_teatro { get; set; }
        public string? idDelteatro { get; set; }

        public UsuariosModel? createdBy { get; }

        public List<TeatroModel>? listaTeatros { get; set; }

    }
}
