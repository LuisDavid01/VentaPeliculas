import TeatroService from "../services/TeatroService.js";
import SecurityService from "../services/SecurityService.js";
const securityService = new SecurityService;
const teatroService = new TeatroService;
class TeatroController {
 
 /*
  * Crear un cine
*/
    async createTeatro(req, res) {
      try {
			const Teatro = await teatroService.createTeatro(req.body);
			res.status(201).json(Teatro);
      } catch (err) {
			res.status(500).json({ error: err.message });
      }
    }
/*
 * Obtener un cine por id
*/
    async getTeatro(req, res){
        try{
            const Teatro = await teatroService.getTeatro(req.params.id);
            if(!Teatro) res.status(404).json({error: 'not found'});
            res.status(201).json(Teatro);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
/*
 * Obtener todos los cines
*/
    async getTeatros(req, res){
        try{
            const Teatro = await teatroService.getTeatros();
            if(!Teatro) res.status(404).json({error: 'not found'});
            res.status(201).json(Teatro);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }


/*
 * Actualizar un cine por id
*/
    async UpdateTeatro(req, res){
        try{


            const Teatro = await teatroService.updateTeatro(req.params.id, req.body);
            if(!Teatro) res.status(404).json({error: 'not found'});
            res.status(201).json(Teatro);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
/*
 * Eliminar un cine por id
*/
    async DeleteTeatro(req, res){
        try{


            const Teatro = await teatroService.deleteTeatro(req.params.id);
            if(!Teatro) res.status(404).json({error: 'not found'});
            res.status(201).json(Teatro);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

}

export default TeatroController;
