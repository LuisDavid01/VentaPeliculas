import PromocionesService from "../services/PromocionesService.js";

const promocionesService = new PromocionesService;
class PromocionesController {
 
 /*
  * Crear una Promocion
*/
    async createPromocion(req, res) {
      try {
			
			const promociones = await promocionesService.createPromocion(req.body);
			if(!promociones) return res.status(400).json({error: 'Error al agragar la Promocion'})
			return res.status(201).json(promociones);
      } catch (err) {
			return res.status(500).json({ error: err.message });
      }
    }
/*
 * Obtener una Promocion por el id
*/
    async getPromocion(req, res){
        try{
			console.log(req.user ?? 'no encontrado')
            const promociones = await promocionesService.getPromocion(req.params.id);
            if(!promociones) return res.status(404).json({error: 'not found'});
            return res.status(200).json(promociones);
        }catch(err){
            return res.status(500).json({error: err.message});
        }
    }


/*
 * Obtener todas las promociones
*/
    async getPromociones(req, res){
        try{
            const promociones = await promocionesService.getPromociones();
            if(!promociones) res.status(404).json({error: 'not found'});
            return res.status(200).json(promociones);
        }catch(err){
           return res.status(500).json({error: err.message});
        }
    }
/*
 * Eliminar una Promocion por id
*/
    async deletePromocion(req, res){
        try{
			
            const promociones = await promocionesService.deletePromocion(req.params.id);
            if(!promociones) return res.status(404).json({error: 'not found'});
            return res.status(200).json(promociones);
        }catch(err){
            return res.status(500).json({error: err.message});
        }
    }



    
}

export default PromocionesController;
