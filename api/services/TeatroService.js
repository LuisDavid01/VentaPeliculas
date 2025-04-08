import TeatroModel from "../models/TeatroModel.js";
import SalasModel from "../models/SalasModel.js";
import mongoose from "mongoose";
class TeatroService {
    /*
    Crea un cine
    */
    async createTeatro(data) {
      
      const Teatro = new TeatroModel(data);
       
      await Teatro.save();
      return Teatro;
    }
    /*
    Obtiene un cine por id
    */
    async getTeatro(id){
            return await TeatroModel.findById(id).populate("id_salas", "_id nombre");
    }
    /*
    Obtiene todos los cines
    */
    async getTeatros(){
        return await TeatroModel.find().populate("id_salas", "_id nombre");
    }
    /*
    Actualiza un cine
    */
    async updateTeatro(id, data){
        return await TeatroModel.findByIdAndUpdate(id,data, {new: true});
    }
    /*
    borra un cine
    */
    async deleteTeatro(id){
        return await TeatroModel.findByIdAndDelete(id);

    }
    /*
    Agrega una sala al array de salas en cine 
    */
    async addSala(id, data){
        if(mongoose.isValidObjectId(id)){
            
            const Sala = new SalasModel(data);
            await Sala.save();
            
            return await TeatroModel.updateOne
            (
                {_id: id},
                { $push: { id_salas: Sala._id } }
            );
        }
        
    }
    /*
    Saca del array de salas la sala que se pase como id y actializa el cine
    */
    async deleteSala(id, idSala){
        if(mongoose.isValidObjectId(id) && mongoose.isValidObjectId(idSala)){
            
             const deleteFromTeatro = await TeatroModel.updateOne
            (
                {_id: id},
                { $pull: { id_salas: idSala } }
            );

            if(deleteFromTeatro.acknowledged === false ){
                return ("No se encontro la sala");
            }
            return ("Se elimino la sala del cine");
        }
        

    }
}

export default TeatroService;