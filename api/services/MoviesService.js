import moviesModel from "../models/moviesModel.js";
class MoviesService {
    /*
    Crea una nueva pelicula
    */
    async createMovie(data) {
      
      const Movie = new moviesModel(data);
       
      await Movie.save();
      return Movie;
    }
    /*
    Para poder obtener pelicula por el id
    */
    async getMovie(id){
            return await moviesModel.findById(id).lean();
    }
    /*
    Para poder obtener todas las peliculas
    */
    async getMovies(){
        return await moviesModel.find().lean();
    }
    /*
    Actualiza pelicula
    */
    async updateMovie(id, data){
        return await moviesModel.findByIdAndUpdate(id,data, {new: true});
    }
    /*
    Elimina una pelicula
    */
    async deleteMovie(id){
        return await moviesModel.findByIdAndDelete(id);

    }
}

export default MoviesService;
