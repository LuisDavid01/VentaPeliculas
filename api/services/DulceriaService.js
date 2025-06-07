import DulceriaModel from "../models/DulceriaModel.js";
//import mongoose from "mongoose";
class DulceriaService {
    /*
    Crea un dulceria
    */
    async createDulceria(data) {
      
      const Dulceria = new DulceriaModel(data);
       
      await Dulceria.save();
      return Dulceria;
    }
    /*
    Obtiene un producto por id
    */
    async getDulceria(id){
            return await DulceriaModel.findById(id);
    }
    /*
    Obtiene todos los productos
    */
    async getDulcerias(){
        return await DulceriaModel.find();
    }
    /*
    Actualiza un dulceria
    */
    async updateDulceria(id, data){
        return await DulceriaModel.findByIdAndUpdate(id,data, {new: true});
    }
    /*
    borra un dulceria
    */
    async deleteDulceria(id){
        return await DulceriaModel.findByIdAndDelete(id);

    }
}

export default DulceriaService;
