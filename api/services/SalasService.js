import SalasModel from "../models/SalasModel.js";
import MoviesModel from "../models/moviesModel.js";
class SalasService {
    async createSala(data) {
      
      const Sala = new SalasModel(data);
       
      await Sala.save();
      return Sala;
    }

    async getSalas(id){
        if(id != 0){
            return await SalasModel.findById(id).populate("id_movie");
        }
        return await SalasModel.find().populate("id_movie");
        
    }

    async updateSala(id, data){
        return await SalasModel.findByIdAndUpdate(id,data, {new: true});
    }

    async deleteSala(id){
        return await SalasModel.findByIdAndDelete(id);

    }

    async modificarPelicula(id, idMovie){
        const newMovie = await MoviesModel.findById(idMovie);
        return await SalasModel.updateOne
         (
            {_id: id},
            {$set: { id_movie: newMovie._id }}
         );
         
    }
}

export default SalasService;