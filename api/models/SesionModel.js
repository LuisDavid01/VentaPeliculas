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
	id_movie:{
		type: mongoose.Types.ObjectId,
		required: true,
		ref: "movies"

	},
	asientos: 
	[{ 
		numAsiento: { type: String },
		ocupado: { type: Boolean }
	}],
    id_sala: 
    { 
        type: mongoose.Types.ObjectId,
		required: true,
		ref: "salas"
    }


    
},
{
	timestamps: true,
	strict: true,
 collection: 'sesion' });

export default mongoose.model('sesion', SesionSchema)
