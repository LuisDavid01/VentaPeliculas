import SalasModel from "../models/SalasModel.js";
import MoviesModel from "../models/moviesModel.js";
class SalasService {
    /*
    Crea una nueva sala
    */
    async createSala(data) {
      
      const Sala = new SalasModel(data);
       
      await Sala.save();
      return Sala;
    }
    /*
    Para obtener una sala por id
    */
    async getSala(id){
            return await SalasModel.findById(id).populate("id_movie");
    }
    /*
    Para obtener todas las sala
    */
    async getSalas(){
        return await SalasModel.find().populate("id_movie");
    }
    /*
    Para modificar salapor el id
    */
    async updateSala(id, data){
        return await SalasModel.findByIdAndUpdate(id,data, {new: true});
    }
    /*
    Para borrar sala por el id
    */
    async deleteSala(id){
        return await SalasModel.findByIdAndDelete(id);

    }
    /*
    Para poder modificar la pelicula de la sala
    */
    async ModificarPeliculaSala(id, idMovie){
        
         const modificarPeliSala = await SalasModel.updateOne
         (
            {_id: id},
            {$set: { id_movie: idMovie }}
         );
         if(modificarPeliSala.modifiedCount === 0){
            return (undefined);
         }
         return("Se modifico la pelicula")
         
    }
    /*
    Para poder cambiar el estado a un asiento
    */
    async ModificarAsiento(id, asiento){
         const asientoModificado =  await SalasModel.updateOne
        (
            {_id: id},
            {$set: 
                {
                    [`asientos.${asiento.row}.${asiento.col}.ocupado`]: asiento.ocupado
                }
            }

        );
        
        return asientoModificado
    }
}

export default SalasService;