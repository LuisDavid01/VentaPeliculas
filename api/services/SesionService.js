import SesionModel from "../models/SesionModel.js";
import mongoose from "mongoose";
//import mongoose from "mongoose";
class SesionService {
    /*
    Crea un cine
    */
    async createSesion(data) { 
      const Sesion = new SesionModel(data);
      await Sesion.save();
      return Sesion;
	}
    /*
    Obtiene una sesion por id
    */
    async getSesion(id){
            const result = await SesionModel.aggregate(
[
  {
    '$match': {
      '_id':  mongoose.Types.ObjectId.createFromHexString(id)   }
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
      'as': 'sala.id_movie'
    }
  }, {
    '$unwind': {
      'path': '$sala.id_movie', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$lookup': {
      'from': 'teatro', 
      'localField': 'sala.id_teatro', 
      'foreignField': '_id', 
      'as': 'sala.id_teatro'
    }
  }, {
    '$unwind': {
      'path': '$sala.id_teatro', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$lookup': {
      'from': 'tipoSala', 
      'localField': 'sala.tipo_sala', 
      'foreignField': '_id', 
      'as': 'sala.tipo_sala'
    }
  }, {
    '$unwind': {
      'path': '$sala.tipo_sala', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$project': {
      'id_sala': 0, 
         }
  }
]

		);

		return result[0] ?? null;

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
      'as': 'sala.id_movie'
    }
  }, {
    '$unwind': {
      'path': '$sala.id_movie', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$lookup': {
      'from': 'teatro', 
      'localField': 'sala.id_teatro', 
      'foreignField': '_id', 
      'as': 'sala.id_teatro'
    }
  }, {
    '$unwind': {
      'path': '$sala.id_teatro', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$lookup': {
      'from': 'tipoSala', 
      'localField': 'sala.tipo_sala', 
      'foreignField': '_id', 
      'as': 'sala.tipo_sala'
    }
  }, {
    '$unwind': {
      'path': '$sala.tipo_sala', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$project': {
      'asientos': 0, 
      'id_sala': 0 
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



	   /*
    Obtiene una sesion por id de la sala
    */
    async getSesionPorSala(idSala){
            const result = await SesionModel.aggregate(
[
  {
    '$match': {
      'id_sala':  mongoose.Types.ObjectId.createFromHexString(idSala)   }
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
      'as': 'sala.id_movie'
    }
  }, {
    '$unwind': {
      'path': '$sala.id_movie', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$lookup': {
      'from': 'teatro', 
      'localField': 'sala.id_teatro', 
      'foreignField': '_id', 
      'as': 'sala.id_teatro'
    }
  }, {
    '$unwind': {
      'path': '$sala.id_teatro', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$lookup': {
      'from': 'tipoSala', 
      'localField': 'sala.tipo_sala', 
      'foreignField': '_id', 
      'as': 'sala.tipo_sala'
    }
  }, {
    '$unwind': {
      'path': '$sala.tipo_sala', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$project': {
      'id_sala': 0,
	'asientos': 0,
         }
  }
]

		);

		return result;

    }
//agrupa todas las sesiones por su respectiva sala
	async getAllSesionesPorSala(){
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
      'as': 'sala.id_movie'
    }
  }, {
    '$unwind': {
      'path': '$sala.id_movie', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$lookup': {
      'from': 'teatro', 
      'localField': 'sala.id_teatro', 
      'foreignField': '_id', 
      'as': 'sala.id_teatro'
    }
  }, {
    '$unwind': {
      'path': '$sala.id_teatro', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$lookup': {
      'from': 'tipoSala', 
      'localField': 'sala.tipo_sala', 
      'foreignField': '_id', 
      'as': 'sala.tipo_sala'
    }
  }, {
    '$unwind': {
      'path': '$sala.tipo_sala', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$group': {
      '_id': '$sala', 
      'sesiones': {
        '$push': {
          '_id': '$_id', 
          'fechaInicio': '$fechaInicio'
        }
      }
    }
  }, {
    '$project': {
      'sala': '$_id', 
      'sesiones': 1, 
      '_id': 0
    }
  }
]



		);}

/*
 * obtener las sesiones y salas agrupadas por pelicula
*/ 
	async getSesionesPeliculas(){
		return SesionModel.aggregate(
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
      'as': 'sala.id_movie'
    }
  }, {
    '$unwind': {
      'path': '$sala.id_movie', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$lookup': {
      'from': 'teatro', 
      'localField': 'sala.id_teatro', 
      'foreignField': '_id', 
      'as': 'sala.id_teatro'
    }
  }, {
    '$unwind': {
      'path': '$sala.id_teatro', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$lookup': {
      'from': 'tipoSala', 
      'localField': 'sala.tipo_sala', 
      'foreignField': '_id', 
      'as': 'sala.tipo_sala'
    }
  }, {
    '$unwind': {
      'path': '$sala.tipo_sala', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$group': {
      '_id': '$sala.id_movie.titulo', 
      'salas': {
        '$addToSet': '$sala'
      }, 
      'sesiones': {
        '$push': {
          '_id': '$_id', 
          'fechaInicio': '$fechaInicio'
        }
      }
    }
  }, {
    '$project': {
      '_id': 1, 
      'salas': '$salas', 
      'sesiones': 1
    }
  }
]

		);


	}

	async searchSessionByMovieTitle(title){
		if(!title) return;
		if(typeof(title) != 'string') throw new Error("El titulo debe ser string");
		title = title.trim();	
		return SesionModel.aggregate(
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
      'as': 'sala.id_movie'
    }
  }, {
    '$unwind': {
      'path': '$sala.id_movie', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$match': {
      'sala.id_movie.titulo': {
        '$regex': `.*${title}.*`, 
        '$options': 'i'
      }
    }
  }, {
    '$lookup': {
      'from': 'teatro', 
      'localField': 'sala.id_teatro', 
      'foreignField': '_id', 
      'as': 'sala.id_teatro'
    }
  }, {
    '$unwind': {
      'path': '$sala.id_teatro', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$lookup': {
      'from': 'tipoSala', 
      'localField': 'sala.tipo_sala', 
      'foreignField': '_id', 
      'as': 'sala.tipo_sala'
    }
  }, {
    '$unwind': {
      'path': '$sala.tipo_sala', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$group': {
      '_id': '$sala.id_movie.titulo', 
      'salas': {
        '$addToSet': '$sala'
      }, 
      'sesiones': {
        '$addToSet': {
          '_id': '$_id', 
          'fechaInicio': '$fechaInicio', 
          'sala': '$sala'
        }
      }
    }
  }, {
    '$project': {
      '_id': 1, 
      'sesiones': 1
    }
  }
]
		);
	}

	async updateAsientos(id, items){
		const asientos = SesionModel.updateOne({_id: id});



	}

}

export default SesionService;
