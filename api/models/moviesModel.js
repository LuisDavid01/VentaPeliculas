import mongoose from "mongoose";
const MoviesSchema = new mongoose.Schema({
    
    titulo: 
    { 
        type: String,
        default: "Sin titulo",
    },
    sinopsis: 
    { 
        type: String,
        default: "sin sinopsis",
    },
    duracion: 
    { 
        type: Number,
        default: "Sin especificar",
    },
    productora: 
    { 
        type: String,
        default: "Sin especificar",
     },
    cartelera: 
    { 
        type: String,
    },

},	{ collection: 'movies' });

export default mongoose.model('movies', MoviesSchema)
