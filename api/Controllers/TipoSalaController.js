import TipoSalaService from "../services/TipoSalaService.js";
import SecurityService from "../services/SecurityService.js";
const securityService = new SecurityService;
const tipoSalaService = new TipoSalaService;
class TipoSalaController {
 
 /*
  * Crear un tipo de sala
*/
    async createTipoSala(req, res) {
      try {
			const token = securityService.verifyToken(req);
			if(!token) return res.status(401).json({error: 'token not verify'})

			const Sala = await tipoSalaService.createSala(req.body);
			res.status(201).json(Sala);
      } catch (err) {
			res.status(500).json({ error: err.message });
      }
    }
/*
 * Obtener un tipo de sala por id
*/
    async getTipoSala(req, res){
        try{
            const Sala = await tipoSalaService.getSala(req.params.id);
            if(!Sala) res.status(404).json({error: 'not found'});
            res.status(200).json(Sala);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }


/*
 * Obtener todos los tipos de salas
*/
    async getTiposSala(req, res){
        try{
            const Sala = await tipoSalaService.getSalas();
            if(!Sala) res.status(404).json({error: 'not found'});
            res.status(200).json(Sala);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
/*
 * Actualizar un tipo de sala
*/
    async updateTipoSala(req, res){
        try{
			const token = securityService.verifyToken(req);
			if(!token) return res.status(401).json({error: 'token not verify'})

            const Sala = await tipoSalaService.updateSala(req.params.id, req.body);
            if(!Sala) res.status(404).json({error: 'not found'});
            res.status(200).json(Sala);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
/*
 * Eliminar un tipo de sala por id
*/
    async deleteTipoSala(req, res){
        try{
			const token = securityService.verifyToken(req);
			if(!token) return res.status(401).json({error: 'token not verify'})

            const Sala = await tipoSalaService.deleteSala(req.params.id);
            if(!Sala) res.status(404).json({error: 'not found'});
            res.status(200).json(Sala);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }



    
}

export default TipoSalaController;
