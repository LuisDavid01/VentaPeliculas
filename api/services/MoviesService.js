import moviesModel from "../models/moviesModel.js";
import { isValidObjectId } from 'mongoose'
import FirebaseService from "./FirebaseService.js";
const firebaseService = new FirebaseService;
class MoviesService {
    /*
    Crea una nueva pelicula
    */
    async createMovie(data) {

	  const imgUrl = await firebaseService.UploadImage(data.file,'movies');
      const movie = new moviesModel(data);
       movie.cartelera = imgUrl.signedUrl;
	   movie.storagePath = imgUrl.fileName;	
      await movie.save();
      return movie;
    }
    /*
    Para poder obtener pelicula por el id
    */
    async getMovie(id){
		if(!isValidObjectId(id)) return;
        return await moviesModel.findById(id);
    }
    /*
    Para poder obtener todas las peliculas
    */
    async getMovies(){
        return await moviesModel.find();
    }
    /*
    Actualiza pelicula
    */
    async updateMovie(id, data){
		if(!isValidObjectId(id)) return;
		//Si no hay un archivo de imagen,
		//la imagen de la pelicula permanece
		if(data.file != null){
		const imgUrl = await firebaseService.UploadImage(data.file,'movies');
		if(!imgUrl) return;
		let oldImage = data.storagePath;
		await firebaseService.deleteImage(oldImage);
		data.cartelera = imgUrl.signedUrl;
		data.storagePath = imgUrl.fileName;	
		
		}
		return await moviesModel.findByIdAndUpdate(id,data, {new: true});
    }
    /*
    Elimina una pelicula
    */
    async deleteMovie(id){
		if(!isValidObjectId(id)) return;
		//busca la pelicula por el id para eliminar la imagen
		const movie = await moviesModel.findById(id);
		firebaseService.deleteImage(movie.cartelera);
        return await moviesModel.findByIdAndDelete(id);

    }
}

export default MoviesService;
