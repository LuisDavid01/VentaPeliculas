import TeatroModel from "../models/TeatroModel.js";
import SalasModel from "../models/SalasModel.js";
import mongoose from "mongoose";
class TeatroService {
    async createTeatro(data) {
      
      const Teatro = new TeatroModel(data);
       
      await Teatro.save();
      return Teatro;
    }

    async getTeatro(id){
        if(id != 0){
            return await TeatroModel.findById(id).populate("id_salas", "_id nombre");
        }
        return await TeatroModel.find().populate("id_salas", "_id nombre");
        
    }

    async updateTeatro(id, data){
        return await TeatroModel.findByIdAndUpdate(id,data, {new: true});
    }

    async deleteTeatro(id){
        return await TeatroModel.findByIdAndDelete(id);

    }

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

    async deleteSala(id, idSala){
        if(mongoose.isValidObjectId(id) && mongoose.isValidObjectId(idSala)){
            
             const deleteFromTeatro = await TeatroModel.updateOne
            (
                {_id: id},
                { $pull: { id_salas: idSala } }
            );

            const deleteSala = await SalasModel.deleteOne({_id: idSala});
            if(deleteFromTeatro.acknowledged === false || deleteSala.acknowledged === false){
                return false;
            }
            return true;
        }
        

    }
}

export default TeatroService;