import DulceriaModel from "../models/DulceriaModel.js";
//import mongoose from "mongoose";
class DulceriaService {
    /*
    Crea un dulceria
    */
    async createDulceria(data) {
	  if(!data) return;
	const exist = await this.dulceriaExist(data.nombre);
	console.log(exist)
     if(exist != false) return; 
      const Dulceria = new DulceriaModel(data);
	  await Dulceria.save();
      return Dulceria;
    }
    /*
    Obtiene un producto por id
    */
    async getDulceria(id){
            return await DulceriaModel.findById(id)
				.populate('id_teatro')
				.populate('createdBy')
				.exec();
    }
    /*
    Obtiene todos los productos
    */
    async getDulcerias(){
        return await DulceriaModel.find()
				.populate('id_teatro')
				.populate('createdBy')
				.exec();
;
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

	//verficiar si una dulceria existe
	async dulceriaExist(nombre){
		if(!nombre) throw new Error('Nombre faltante');
		const exist = await DulceriaModel.exists({ nombre: nombre});
		return !!exist

	}

}

export default DulceriaService;
