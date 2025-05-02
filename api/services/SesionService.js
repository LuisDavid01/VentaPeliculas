import SesionModel from "../models/SesionModel.js";
//import mongoose from "mongoose";
class SesionService {
    /*
    Crea un cine
    */
    async createSesion(data) {
     console.log(data); 
      const Sesion = new SesionModel(data);
       
		console.log(Sesion);
      await Sesion.save();
      return Sesion;
	}
    /*
    Obtiene una sesion por id
    */
    async getSesion(id){
            return await SesionModel.findById(id);
    }
    /*
    Obtiene todos los sesiones
    */
    async getSesiones(){
        return await SesionModel.find();
    }
    /*
    Actualiza una sesion
    */
    async updateSesion(id, data){
        return await SesionModel.findByIdAndUpdate(id,data, {new: true});
    }
    /*
    borra una sesion
    */
    async deleteSesion(id){
        return await SesionModel.findByIdAndDelete(id);

    }
}

export default SesionService;
