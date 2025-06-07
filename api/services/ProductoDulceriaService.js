import ProductoDulceriaModel from "../models/ProductoDulceriaModel.js";
//import mongoose from "mongoose";
class ProductoDulceriaService {
    /*
    Crea un dulceria
    */
    async createProductoDulceria(data) {
      
      const ProductoDulceria = new ProductoDulceriaModel(data);
       
      await ProductoDulceria.save();
      return ProductoDulceria;
    }
    /*
    Obtiene un producto por id
    */
    async getProductoDulceria(id){
            return await ProductoDulceriaModel.findById(id);
    }
    /*
    Obtiene todos los productos
    */
    async getProductosDulceria(){
        return await ProductoDulceriaModel.find();
    }
    /*
    Actualiza un dulceria
    */
    async updateProductoDulceria(id, data){
        return await ProductoDulceriaModel.findByIdAndUpdate(id,data, {new: true});
    }
    /*
    borra un dulceria
    */
    async deleteProductoDulceria(id){
        return await ProductoDulceriaModel.findByIdAndDelete(id);

    }
}

export default ProductoDulceriaService;
