import TipoSalaService from "../services/TipoSalaService.js";
import SecurityService from "../services/SecurityService.js";
const securityService = new SecurityService;
const tipoSalaService = new TipoSalaService;
class TipoSalaController {
 
 
    async createTipoSala(req, res) {
      try {
			const token = securityService.getTokenFromHeader(req);
			if (token == null || token == undefined) return res.status(401).json({ error: 'Token no proporcionado' });
			if(securityService.verifyToken(token) != true) return res.status(403).json({error: 'token no validado'});
        const Sala = await tipoSalaService.createSala(req.body);
        res.status(201).json(Sala);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }

    async getTipoSala(req, res){
        try{
            const Sala = await tipoSalaService.getSala(req.params.id);
            if(!Sala) res.status(404).json({error: 'not found'});
            res.status(200).json(Sala);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }



    async getTiposSala(req, res){
        try{
            const Sala = await tipoSalaService.getSalas();
            if(!Sala) res.status(404).json({error: 'not found'});
            res.status(200).json(Sala);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    async updateTipoSala(req, res){
        try{
			const token = securityService.getTokenFromHeader(req);
			if (token == null || token == undefined) return res.status(401).json({ error: 'Token no proporcionado' });
			if(securityService.verifyToken(token) != true) return res.status(403).json({error: 'token no validado'});
            const Sala = await tipoSalaService.updateSala(req.params.id, req.body);
            if(!Sala) res.status(404).json({error: 'not found'});
            res.status(200).json(Sala);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    async deleteTipoSala(req, res){
        try{
			const token = securityService.getTokenFromHeader(req);
			if (token == null || token == undefined) return res.status(401).json({ error: 'Token no proporcionado' });
			if(securityService.verifyToken(token) != true) return res.status(403).json({error: 'token no validado'});
            const Sala = await tipoSalaService.deleteSala(req.params.id);
            if(!Sala) res.status(404).json({error: 'not found'});
            res.status(200).json(Sala);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }



    
}

export default TipoSalaController;
