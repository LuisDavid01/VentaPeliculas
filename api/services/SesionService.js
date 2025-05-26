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
      '_id': mongoose.Types.ObjectId.createFromHexString(id)
    }
  }, {
    '$lookup': {
      'from': 'movies', 
      'localField': 'id_movie', 
      'foreignField': '_id', 
      'as': 'id_movie'
    }
  }, {
    '$unwind': {
      'path': '$id_movie', 
      'preserveNullAndEmptyArrays': true
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
      'id_sala': 0, 
      'sala.id_teatro': 0, 
      'sala.tipo_sala': 0
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
      'from': 'movies', 
      'localField': 'id_movie', 
      'foreignField': '_id', 
      'as': 'id_movie'
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
      'path': '$id_movie', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$unwind': {
      'path': '$sala', 
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
      'asientos': 0, 
      'id_sala': 0, 
      'sala.id_movie': 0, 
      'sala.id_teatro': 0, 
      'sala.tipo_sala': 0
    }
  }
]);
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
    '$project': {
      'asientos': 0
    }
  }, {
    '$lookup': {
      'from': 'salas', 
      'localField': 'id_sala', 
      'foreignField': '_id', 
      'as': 'sala'
    }
  }, {
    '$unwind': '$sala'
  }, {
    '$lookup': {
      'from': 'movies', 
      'localField': 'id_movie', 
      'foreignField': '_id', 
      'as': 'movie'
    }
  }, {
    '$unwind': {
      'path': '$movie'
    }
  }, {
    '$lookup': {
      'from': 'teatro', 
      'localField': 'sala.id_teatro', 
      'foreignField': '_id', 
      'as': 'teatro'
    }
  }, {
    '$unwind': {
      'path': '$teatro', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$group': {
      '_id': {
        'teatro': '$teatro.nombre', 
        'sala': '$sala.nombre'
      }, 
      'sesiones': {
        '$push': {
          '_id': '$_id', 
          'fechaInicio': '$fechaInicio', 
          'fechaFinalizacion': '$fechaFinalizacion', 
          'movie': '$movie'
        }
      }
    }
  }, {
    '$group': {
      '_id': '$_id.teatro', 
      'salas': {
        '$push': {
          'nombre': '$_id.sala', 
          'sesiones': '$sesiones'
        }
      }
    }
  }, {
    '$sort': {
      '_id': 1
    }
  }, {
    '$project': {
      '_id': 0,
	  'teatro': "$_id", 
      'salas': 1
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
    '$project': {
      'asientos': 0
    }
  }, {
    '$lookup': {
      'from': 'salas', 
      'localField': 'id_sala', 
      'foreignField': '_id', 
      'as': 'sala'
    }
  }, {
    '$unwind': '$sala'
  }, {
    '$lookup': {
      'from': 'teatro', 
      'localField': 'sala.id_teatro', 
      'foreignField': '_id', 
      'as': 'teatro'
    }
  }, {
    '$unwind': '$teatro'
  }, {
    '$lookup': {
      'from': 'movies', 
      'localField': 'id_movie', 
      'foreignField': '_id', 
      'as': 'pelicula'
    }
  }, {
    '$unwind': '$pelicula'
  }, {
    '$group': {
      '_id': {
        'teatro': '$teatro.nombre', 
        'pelicula': '$pelicula.titulo', 
        'sala': '$sala.nombre'
      }, 
      'sesiones': {
        '$push': {
          '_id': '$_id', 
          'fechaInicio': '$fechaInicio', 
          'fechaFinalizacion': '$fechaFinalizacion'
        }
      }
    }
  }, {
    '$group': {
      '_id': {
        'teatro': '$_id.teatro', 
        'pelicula': '$_id.pelicula'
      }, 
      'salas': {
        '$push': {
          'nombre': '$_id.sala', 
          'sesiones': '$sesiones'
        }
      }
    }
  }, {
    '$group': {
      '_id': '$_id.teatro', 
      'peliculas': {
        '$push': {
          'nombre': '$_id.pelicula', 
          'salas': '$salas'
        }
      }
    }
  }, {
    '$sort': {
      '_id': 1
    }
  }, {
    '$project': {
      '_id': 0, 
      'teatro': '$_id', 
      'peliculas': 1
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
    '$project': {
      'asientos': 0
    }
  }, {
    '$lookup': {
      'from': 'movies', 
      'localField': 'id_movie', 
      'foreignField': '_id', 
      'as': 'movie'
    }
  }, {
    '$unwind': {
      'path': '$movie'
    }
  }, {
    '$match': {
      'movie.titulo': {
        '$regex': `.*${title}.*`, 
        '$options': 'i'
      }
    }
  }, {
    '$lookup': {
      'from': 'salas', 
      'localField': 'id_sala', 
      'foreignField': '_id', 
      'as': 'sala'
    }
  }, {
    '$unwind': '$sala'
  }, {
    '$lookup': {
      'from': 'teatro', 
      'localField': 'sala.id_teatro', 
      'foreignField': '_id', 
      'as': 'teatro'
    }
  }, {
    '$unwind': {
      'path': '$teatro', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$group': {
      '_id': {
        'teatro': '$teatro.nombre', 
        'sala': '$sala.nombre'
      }, 
      'sesiones': {
        '$push': {
          '_id': '$_id', 
          'fechaInicio': '$fechaInicio', 
          'fechaFinalizacion': '$fechaFinalizacion', 
          'movie': '$movie'
        }
      }
    }
  }, {
    '$group': {
      '_id': '$_id.teatro', 
      'salas': {
        '$push': {
          'nombre': '$_id.sala', 
          'sesiones': '$sesiones'
        }
      }
    }
  }, {
    '$sort': {
      '_id': 1
    }
  }, {
    '$project': {
      '_id': 0, 
      'teatro': '$_id', 
      'salas': 1
    }
  }
]
					);
	}

	async updateAsientos(id, items){
		const result = await SesionModel.updateOne(
		{ _id: mongoose.Types.ObjectId.createFromHexString(id)
			, "asientos.items": items },
		{ $set: { "asientos.$.ocupado": true } }
	);

	console.log(result);
	return result;

	}

}

export default SesionService;
