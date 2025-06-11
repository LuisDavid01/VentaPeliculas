import mongoose from "mongoose";
const TeatroSchema = new mongoose.Schema({
    
    nombre: 
    { 
        type: String,
        require: true,

    },
    ubicacion: 
    {
        type: String,
        default: "Sin especificar",
    }
    
},
{
	timestamps: true,
	strict: true,
 collection: 'teatro' });

export default mongoose.model('teatro', TeatroSchema)
