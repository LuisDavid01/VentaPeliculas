import TeatroModel from "../models/TeatroModel.js";
import SalasModel from "../models/SalasModel.js";
import mongoose, { Mongoose } from "mongoose";
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
            return await TeatroModel.findById(id);
    }
    /*
    Obtiene todos los cines
    */
    async getTeatros(){
        return await TeatroModel.find();
    }
    /*
    Actualiza un cine
    */
    async updateTeatro(id, data){
        return await TeatroModel.findByIdAndUpdate(id,data, {new: true});
    }
    /*
    borra un cine y borra como consecuencia todas las salas a las que estaba relacionado
    */
    async deleteTeatro(id){
		if(mongoose.isValidObjectId(id)){
			let deletedElements = "";
			const deletedSalas = await SalasModel.deleteMany({id_teatro: id});
			const deletedTeatro = await TeatroModel.findByIdAndDelete(id);
			deletedElements = deletedTeatro + " " + deletedSalas;
			return deletedElements;


		}

	}

}

export default TeatroService;
