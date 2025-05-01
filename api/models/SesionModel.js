import mongoose from "mongoose";
const SesionSchema = new mongoose.Schema({
    
    fechaInicio: 
    { 
        type: Date,
        required: true

    },
	fechaFinalizacion: 
    { 
        type: Date,
        required: true

    },
	asientos: 
	[[{ 
		numAsiento: { type: String },
		ocupado: { type: Boolean }
	}]],
    id_sala: 
    { 
        type: mongoose.Types.ObjectId,
		required: true,
		ref: "salas"
    }


    
},{ collection: 'sesion' });

export default mongoose.model('sesion', SesionSchema)
