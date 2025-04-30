import mongoose from "mongoose";
const SalasSchema = new mongoose.Schema({
    nombre:
    { 
        type: String
    },
   id_movie: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "movies",
   },
	id_teatro:
	{
		type: mongoose.Types.ObjectId,
		required: true,
		ref: "teatro"
	
	},
	tipo_sala:{
		type: mongoose.Types.ObjectId,
		required: true,
		ref: "tipoSala"
	},
   asientos: 
   [[{ 
    numAsiento: { type: String },
    ocupado: { type: Boolean }
    }]],
    precioAsiento: 
    { 
        type: Number
    }
},{ collection: 'salas' });

export default mongoose.model('salas', SalasSchema)
