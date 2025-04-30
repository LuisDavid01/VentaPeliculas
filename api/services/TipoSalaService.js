import TipoSalaModel from "../models/TipoSalaModel.js";
//import mongoose from "mongoose";
class TipoSalaService {
    /*
    Crea un cine
    */
    async createSala(data) {
      
      const Sala = new TipoSalaModel(data);
       
      await Sala.save();
      return Sala;
    }
    /*
    Obtiene un cine por id
    */
    async getSala(id){
            return await TipoSalaModel.findById(id);
    }
    /*
    Obtiene todos los cines
    */
    async getSalas(){
        return await TipoSalaModel.find();
    }
    /*
    Actualiza un cine
    */
    async updateSala(id, data){
        return await TipoSalaModel.findByIdAndUpdate(id,data, {new: true});
    }
    /*
    borra un cine
    */
    async deleteSala(id){
        return await TipoSalaModel.findByIdAndDelete(id);

    }
}

export default TipoSalaService;
