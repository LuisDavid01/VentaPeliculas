import ProductoDulceriaService from "../services/ProductoDulceriaService.js";

const productoDulceriaService = new ProductoDulceriaService;
class ProductoDulceriaController {
 
 /*
  * Crear un producto dulceria
*/
    async createProductoDulceria(req, res) {
      try {
			
			const Sala = await productoDulceriaService.createProductoDulceria(req.body);
			res.status(201).json(Sala);
      } catch (err) {
			res.status(500).json({ error: err.message });
      }
    }
/*
 * Obtener un producto de una dulceria por el id
*/
    async getProductoDulceria(req, res){
        try{
            const Sala = await productoDulceriaService.getProductoDulceria(req.params.id);
            if(!Sala) res.status(404).json({error: 'not found'});
            res.status(200).json(Sala);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }


/*
 * Obtener todos los productos
*/
    async getProductosDulcerias(req, res){
        try{
            const Sala = await productoDulceriaService.getProductosDulceria();
            if(!Sala) res.status(404).json({error: 'not found'});
            res.status(200).json(Sala);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
/*
 * Actualizar un producto 
*/
    async updateProductoDulceria(req, res){
        try{
			
            const Sala = await productoDulceriaService.updateProductoDulceria(req.params.id, req.body);
            if(!Sala) res.status(404).json({error: 'not found'});
            res.status(200).json(Sala);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
/*
 * Eliminar un producto
*/
    async deleteProductoDulceria(req, res){
        try{
			
            const Sala = await productoDulceriaService.deleteProductoDulceria(req.params.id);
            if(!Sala) res.status(404).json({error: 'not found'});
            res.status(200).json(Sala);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }    
}

export default ProductoDulceriaController;
