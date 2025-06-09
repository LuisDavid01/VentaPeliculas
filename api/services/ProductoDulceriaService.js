import ProductoDulceriaModel from "../models/ProductoDulceriaModel.js";
import mongoose, { isValidObjectId } from "mongoose";
import FirebaseService from "./FirebaseService.js";
const firebaseService = new FirebaseService;
class ProductoDulceriaService {
    /*
    Crea un dulceria
    */
    async createProductoDulceria(data) {
     const imgUrl = await firebaseService.UploadImage(data.file,'products');
		if(!imgUrl) throw new Error('Imagen no generada  correctamente');
      const ProductoDulceria = new ProductoDulceriaModel(data);
       ProductoDulceria.imagen = imgUrl.signedUrl;
	   ProductoDulceria.storagePath = imgUrl.fileName;
      await ProductoDulceria.save();
      return ProductoDulceria;
    }
    /*
    Obtiene un producto por id
    */
    async getProductoDulceria(id){
            return await ProductoDulceriaModel.findById(id).populate({
    path: 'dulceria',
    populate: {
      path: 'id_teatro'
    }
  });
    }
    /*
    Obtiene todos los productos
    */
    async getProductosDulceria(){
        return await ProductoDulceriaModel.find().populate({
    path: 'dulceria',
    populate: {
      path: 'id_teatro'
    }
  });
    }
    /*
    Actualiza un dulceria
    */
    async updateProductoDulceria(id, data){
		if(!isValidObjectId(id)) return;
		//Si no hay un archivo de imagen,
		//la imagen de la pelicula permanece
		if(data.file != null){
		const imgUrl = await firebaseService.UploadImage(data.file,'products');
		if(!imgUrl) return;
		let oldImage = data.storagePath;
		await firebaseService.deleteImage(oldImage);
		data.cartelera = imgUrl.signedUrl;
		data.storagePath = imgUrl.fileName;	
		
		}

        return await ProductoDulceriaModel.findByIdAndUpdate(id,data, {new: true});
    }
    /*
    borra un dulceria
    */
    async deleteProductoDulceria(id){
		if(!isValidObjectId(id)) return;
		//busca la pelicula por el id para eliminar la imagen
		const producto = await ProductoDulceriaModel.findById(id);
		firebaseService.deleteImage(producto.storagePath);

        return await ProductoDulceriaModel.findByIdAndDelete(id);

    }

	async getProductoDulceriaByName(name){
            return await ProductoDulceriaModel.findOne({nombre: name}).populate({
    path: 'dulceria',
    populate: {
      path: 'id_teatro'
    } 
  });
    }

	async updateQuantityProductoDulceriaById(id, cantidad){
            return await ProductoDulceriaModel.updateOne(
			{_id: id},
			{$inc: {cantidad: -cantidad}}
		);
	}

	async getProductoDulceriaByDulceria(id){
		if(!isValidObjectId(id)) return;
		return await ProductoDulceriaModel.aggregate(
			[
  {
    '$match': {
      'dulceria': mongoose.Types.ObjectId.createFromHexString(id)
    }
  }, {
    '$lookup': {
      'from': 'dulcerias', 
      'localField': 'dulceria', 
      'foreignField': '_id', 
      'as': 'dulceria'
    }
  }, {
    '$unwind': {
      'path': '$dulceria'
    }
  }, {
    '$lookup': {
      'from': 'teatro', 
      'localField': 'dulceria.id_teatro', 
      'foreignField': '_id', 
      'as': 'dulceria.id_teatro'
    }
  }, {
    '$unwind': {
      'path': '$dulceria.id_teatro'
    }
  }
]);

	}


}

export default ProductoDulceriaService;
