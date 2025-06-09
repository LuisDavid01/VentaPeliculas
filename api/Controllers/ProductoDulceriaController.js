import ProductoDulceriaService from "../services/ProductoDulceriaService.js";

const productoDulceriaService = new ProductoDulceriaService;
class ProductoDulceriaController {
 
 /*
  * Crear un producto dulceria
*/
    async createProductoDulceria(req, res) {
      try {
		const productoData = {
				...req.body,
				file : req.file
			}	
			const producto = await productoDulceriaService.createProductoDulceria(productoData);
			return res.status(201).json(producto);
      } catch (err) {
			console.log(err.message);
			return res.status(500).json({ error: err.message });
      }
    }
/*
 * Obtener un producto de una dulceria por el id
*/
    async getProductoDulceria(req, res){
        try{
            const producto = await productoDulceriaService.getProductoDulceria(req.params.id);
            if(!producto) res.status(404).json({error: 'not found'});
            return res.status(200).json(producto);
        }catch(err){
            return res.status(500).json({error: err.message});
        }
    }


/*
 * Obtener todos los productos
*/
    async getProductosDulcerias(req, res){
        try{
            const producto = await productoDulceriaService.getProductosDulceria();
            if(!producto) res.status(404).json({error: 'not found'});
            return res.status(200).json(producto);
        }catch(err){
            return res.status(500).json({error: err.message});
        }
    }
/*
 * Actualizar un producto 
*/
    async updateProductoDulceria(req, res){
        try{
			const productoData = {
				...req.body,
				file : req.file
			}		
            const producto = await productoDulceriaService.updateProductoDulceria(req.params.id, productoData);
            if(!producto) res.status(404).json({error: 'not found'});
            return res.status(200).json(producto);
        }catch(err){
			console.log(err.message);
            return res.status(500).json({error: err.message});
        }
    }
/*
 * Eliminar un producto
*/
    async deleteProductoDulceria(req, res){
        try{
			
            const producto = await productoDulceriaService.deleteProductoDulceria(req.params.id);
            if(!producto) res.status(404).json({error: 'not found'});
            return res.status(200).json(producto);
        }catch(err){
			console.log(err.message);
            return res.status(500).json({error: err.message});
        }
    }
/*
 * Obtener productos de una dulceria por el id
*/
    async getProductosByDulceria(req, res){
        try{
            const producto = await productoDulceriaService.getProductoDulceriaByDulceria(req.params.id);
            if(!producto) res.status(404).json({error: 'not found'});
            return res.status(200).json(producto);
        }catch(err){
            return res.status(500).json({error: err.message});
        }
    }


}

export default ProductoDulceriaController;
