import mongoose from "mongoose";
const SalasSchema = new mongoose.Schema({
    nombre:
    { 
        type: String
    },
	id_teatro:
	{
		type: mongoose.Types.ObjectId,
		required: true,
		ref: "teatro"
	
	},
	tipoSala:{
		type: mongoose.Types.ObjectId,
		required: true,
		ref: "tipoSala"
	},
    precioAsiento: 
    { 
        type: Number
    }
},{ collection: 'salas' });

export default mongoose.model('salas', SalasSchema)
