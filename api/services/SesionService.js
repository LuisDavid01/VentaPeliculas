import SesionModel from "../models/SesionModel.js";
import mongoose from "mongoose";
//import mongoose from "mongoose";
class SesionService {
    /*
    Crea un cine
    */
    async createSesion(data) {
     console.log(data); 
      const Sesion = new SesionModel(data);
       
		console.log(Sesion);
      await Sesion.save();
      return Sesion;
	}
    /*
    Obtiene una sesion por id
    */
    async getSesion(id){
            return await SesionModel.aggregate(
[
  {
    '$match': {
      '_id': new mongoose.Types.ObjectId(id)
    }
  }, {
    '$lookup': {
      'from': 'salas', 
      'localField': 'id_sala', 
      'foreignField': '_id', 
      'as': 'sala'
    }
  }, {
    '$unwind': {
      'path': '$sala', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$lookup': {
      'from': 'movies', 
      'localField': 'sala.id_movie', 
      'foreignField': '_id', 
      'as': 'sala.movie'
    }
  }, {
    '$unwind': {
      'path': '$sala.movie', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$lookup': {
      'from': 'teatro', 
      'localField': 'sala.id_teatro', 
      'foreignField': '_id', 
      'as': 'sala.teatro'
    }
  }, {
    '$unwind': {
      'path': '$sala.teatro', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$lookup': {
      'from': 'tipoSala', 
      'localField': 'sala.tipo_sala', 
      'foreignField': '_id', 
      'as': 'sala.tipoSala'
    }
  }, {
    '$unwind': {
      'path': '$sala.tipoSala', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$project': {
      '_id': 1, 
      'fechaInicio': 1, 
      'fechaFinalizacion': 1, 
      'sala': 1
    }
  }
]


		);

    }
    /*
    Obtiene todos los sesiones
    */

	async getSesiones() {
		return await SesionModel.aggregate(
			[
  {
    '$lookup': {
      'from': 'salas', 
      'localField': 'id_sala', 
      'foreignField': '_id', 
      'as': 'sala'
    }
  }, {
    '$unwind': {
      'path': '$sala', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$lookup': {
      'from': 'movies', 
      'localField': 'sala.id_movie', 
      'foreignField': '_id', 
      'as': 'sala.movie'
    }
  }, {
    '$unwind': {
      'path': '$sala.movie', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$lookup': {
      'from': 'teatro', 
      'localField': 'sala.id_teatro', 
      'foreignField': '_id', 
      'as': 'sala.teatro'
    }
  }, {
    '$unwind': {
      'path': '$sala.teatro', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$lookup': {
      'from': 'tipoSala', 
      'localField': 'sala.tipo_sala', 
      'foreignField': '_id', 
      'as': 'sala.tipoSala'
    }
  }, {
    '$unwind': {
      'path': '$sala.tipoSala', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$project': {
      '_id': 1, 
      'fechaInicio': 1, 
      'fechaFinalizacion': 1, 
      'sala.nombre': 1, 
      'sala.precioAsiento': 1, 
      'sala.movie': 1, 
      'sala.teatro': 1, 
      'sala.tipoSala': 1
    }
  }
]
				);
  }
    /*
    Actualiza una sesion
    */
    async updateSesion(id, data){
        return await SesionModel.findByIdAndUpdate(id,data, {new: true});
    }
    /*
    borra una sesion
    */
    async deleteSesion(id){
        return await SesionModel.findByIdAndDelete(id);

    }
}

export default SesionService;
