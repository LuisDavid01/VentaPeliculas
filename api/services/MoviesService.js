import moviesModel from "../models/moviesModel.js";
class MoviesService {
    async createMovie(data) {
      
      const Movie = new moviesModel(data);
       
      await Movie.save();
      return Movie;
    }

    async getMovies(id){
        if(id != 0){
            return await moviesModel.findById(id);
        }
        return await moviesModel.find();
        
    }

    async updateMovie(id, data){
        return await moviesModel.findByIdAndUpdate(id,data, {new: true});
    }

    async deleteMovie(id){
        return await moviesModel.findByIdAndDelete(id);

    }
}

export default MoviesService;