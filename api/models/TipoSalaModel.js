import mongoose from "mongoose";
const TipoSalaSchema = new mongoose.Schema({
    
    nombre: 
    { 
        type: String,
        require: true

    },
    
},
{
	timestamps: true,
	strict: true,
 collection: 'tipoSala' });

export default mongoose.model('tipoSala', TipoSalaSchema)
