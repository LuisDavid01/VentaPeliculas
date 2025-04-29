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
    
},{ collection: 'teatro' });

export default mongoose.model('teatro', TeatroSchema)
