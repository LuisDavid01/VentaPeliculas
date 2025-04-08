import mongoose from "mongoose";
const MoviesSchema = new mongoose.Schema({
    
    titulo: { type: String},
    sinopsis: { type: String},
    duracion: { type: Number},
    productora: { type: String },
    cartelera: { type: String}
},{ collection: 'movies' });

export default mongoose.model('movies', MoviesSchema)