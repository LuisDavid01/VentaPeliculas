import ProductoDulceriaModel from "../models/ProductoDulceriaModel.js";
import { isValidObjectId } from "mongoose";
import FirebaseService from "./FirebaseService.js";
const firebaseService = new FirebaseService;
class ProductoDulceriaService {
    /*
    Crea un dulceria
    */
    async createProductoDulceria(data) {
     const imgUrl = await firebaseService.UploadImage(data.file,'products');
		console.log(imgUrl);
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
		console.log('este es el id: ', id);
		console.log(data);
		if(!isValidObjectId(id)) return;
		//Si no hay un archivo de imagen,
		//la imagen de la pelicula permanece
		if(data.file != null){
		const imgUrl = await firebaseService.UploadImage(data.file,'products');
		console.log(imgUrl);
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
}

export default ProductoDulceriaService;
