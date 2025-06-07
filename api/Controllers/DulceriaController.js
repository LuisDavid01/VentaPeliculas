import DulceriaService from "../services/DulceriaService.js";

const dulceriaService = new DulceriaService;
class DulceriaController {
 
 /*
  * Crear una dulceria
*/
    async createDulceria(req, res) {
      try {
			
			const Sala = await dulceriaService.createDulceria(req.body);
			res.status(201).json(Sala);
      } catch (err) {
			res.status(500).json({ error: err.message });
      }
    }
/*
 * Obtener una dulceria por el id
*/
    async getDulceria(req, res){
        try{
            const Sala = await dulceriaService.getDulceria(req.params.id);
            if(!Sala) res.status(404).json({error: 'not found'});
            res.status(200).json(Sala);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }


/*
 * Obtener todas las dulcerias
*/
    async getDulcerias(req, res){
        try{
            const Sala = await dulceriaService.getDulcerias();
            if(!Sala) res.status(404).json({error: 'not found'});
            res.status(200).json(Sala);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
/*
 * Actualizar una dulceria
*/
    async updateDulceria(req, res){
        try{
			
            const Sala = await dulceriaService.updateDulceria(req.params.id, req.body);
            if(!Sala) res.status(404).json({error: 'not found'});
            res.status(200).json(Sala);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
/*
 * Eliminar una dulceria por id
*/
    async deleteDulceria(req, res){
        try{
			
            const Sala = await dulceriaService.deleteDulceria(req.params.id);
            if(!Sala) res.status(404).json({error: 'not found'});
            res.status(200).json(Sala);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }



    
}

export default DulceriaController;
