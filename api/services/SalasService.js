import SalasModel from "../models/SalasModel.js";
//import MoviesModel from "../models/moviesModel.js";
import mongoose from "mongoose";
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
		if(!mongoose.isValidObjectId(id)) return;
            const result = await SalasModel.aggregate(
			[
  {
    '$match': {
      '_id': mongoose.Types.ObjectId.createFromHexString(id)
    }
  }, {
    '$lookup': {
      'from': 'teatro', 
      'localField': 'id_teatro', 
      'foreignField': '_id', 
      'as': 'teatro'
    }
  }, {
    '$unwind': {
      'path': '$teatro', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$lookup': {
      'from': 'tipoSala', 
      'localField': 'tipoSala', 
      'foreignField': '_id', 
      'as': 'tipoSala'
    }
  }, {
    '$unwind': {
      'path': '$tipoSala', 
      'preserveNullAndEmptyArrays': true
    }
  },
	{
		'$project':{
						'id_teatro': 0
					}
	}
]);
		if(result.length > 0){
			return result[0];
		}
    }
    /*
    Para obtener todas las sala
    */
    async getSalas(){
        return await SalasModel.aggregate(
			[
  {
    '$lookup': {
      'from': 'teatro', 
      'localField': 'id_teatro', 
      'foreignField': '_id', 
      'as': 'teatro'
    }
  }, {
    '$unwind': {
      'path': '$teatro', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$lookup': {
      'from': 'tipoSala', 
      'localField': 'tipoSala', 
      'foreignField': '_id', 
      'as': 'tipoSala'
    }
  }, {
    '$unwind': {
      'path': '$tipoSala', 
      'preserveNullAndEmptyArrays': true
    }
  },
	{
		'$project':{
				'id_teatro': 0
		}
	}

]

		);
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
