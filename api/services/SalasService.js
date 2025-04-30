import SalasModel from "../models/SalasModel.js";
import MoviesModel from "../models/moviesModel.js";
class SalasService {
    /*
    Crea una nueva sala
    */
    async createSala(data) {
     console.log(data); 
      const Sala = new SalasModel(data);
       
      await Sala.save();
      return Sala;
    }
    /*
    Para obtener una sala por id
    */
    async getSala(id){
            return await SalasModel.findById(id).populate(["id_movie", "id_teatro","tipo_sala"]);
    }
    /*
    Para obtener todas las sala
    */
    async getSalas(){
        return await SalasModel.find().populate(["id_movie", "id_teatro","tipo_sala"]);
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
         if(modificarPeliSala.modifiedCount != 0){
			return("Se modifico la pelicula")
        
         }
         
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

	 /*
    Para poder modificar el tipo de la sala
    */
    async ModificarTipoSala(id, idTipoSala){
        
         const modificarPeliSala = await SalasModel.updateOne
         (
            {_id: id},
            {$set: { tipo_sala: idTipoSala }}
         );
         if(modificarPeliSala.modifiedCount != 0){
			return("Se modifico la pelicula")
        
         }
         
    }

	/*
    Para poder modificar el cine al que pertenece la sala
    */
    async ModificarTeatroSala(id, idTeatro){
        
         const modificarPeliSala = await SalasModel.updateOne
         (
            {_id: id},
            {$set: { id_teatro: idTeatro }}
         );
         if(modificarPeliSala.modifiedCount != 0){
			return("Se modifico la pelicula")
        
         }
         
    }


}

export default SalasService;
