import DulceriaService from "../services/DulceriaService.js";

const dulceriaService = new DulceriaService;
class DulceriaController {
 
 /*
  * Crear una dulceria
*/
    async createDulceria(req, res) {
      try {
			
			const Dulceria = await dulceriaService.createDulceria(req.body);
			if(!Dulceria) return res.status(400).json({error: 'Error al agragar la dulceria'})
			return res.status(201).json(Dulceria);
      } catch (err) {
			return res.status(500).json({ error: err.message });
      }
    }
/*
 * Obtener una dulceria por el id
*/
    async getDulceria(req, res){
        try{
			console.log(req.user ?? 'no encontrado')
            const Dulceria = await dulceriaService.getDulceria(req.params.id);
            if(!Dulceria) return res.status(404).json({error: 'not found'});
            return res.status(200).json(Dulceria);
        }catch(err){
            return res.status(500).json({error: err.message});
        }
    }


/*
 * Obtener todas las dulcerias
*/
    async getDulcerias(req, res){
        try{
            const Dulceria = await dulceriaService.getDulcerias();
            if(!Dulceria) res.status(404).json({error: 'not found'});
            return res.status(200).json(Dulceria);
        }catch(err){
           return res.status(500).json({error: err.message});
        }
    }
/*
 * Actualizar una dulceria
*/
    async updateDulceria(req, res){
        try{
			
            const Dulceria = await dulceriaService.updateDulceria(req.params.id, req.body);
            if(!Dulceria) return res.status(404).json({error: 'not found'});
            return res.status(200).json(Dulceria);
        }catch(err){
            return res.status(500).json({error: err.message});
        }
    }
/*
 * Eliminar una dulceria por id
*/
    async deleteDulceria(req, res){
        try{
			
            const Dulceria = await dulceriaService.deleteDulceria(req.params.id);
            if(!Dulceria) return res.status(404).json({error: 'not found'});
            return res.status(200).json(Dulceria);
        }catch(err){
            return res.status(500).json({error: err.message});
        }
    }



    
}

export default DulceriaController;
