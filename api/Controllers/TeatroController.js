import TeatroService from "../services/TeatroService.js";
const teatroService = new TeatroService;
class TeatroController {
 
 
    async createTeatro(req, res) {
      try {
			const token = securityService.getTokenFromHeader(req);
			if (token == null || token == undefined) return res.status(401).json({ error: 'Token no proporcionado' });
			if(securityService.verifyToken(token) != true) return res.status(403).json({error: 'token no validado'});
        const Teatro = await teatroService.createTeatro(req.body);
        res.status(201).json(Teatro);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }

    async getTeatro(req, res){
        try{
            const Teatro = await teatroService.getTeatro(req.params.id);
            if(!Teatro) res.status(404).json({error: 'not found'});
            res.status(201).json(Teatro);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    async getTeatros(req, res){
        try{
            const Teatro = await teatroService.getTeatros();
            if(!Teatro) res.status(404).json({error: 'not found'});
            res.status(201).json(Teatro);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }



    async UpdateTeatro(req, res){
        try{
			const token = securityService.getTokenFromHeader(req);
			if (token == null || token == undefined) return res.status(401).json({ error: 'Token no proporcionado' });
			if(securityService.verifyToken(token) != true) return res.status(403).json({error: 'token no validado'});
            const Teatro = await teatroService.updateTeatro(req.params.id, req.body);
            if(!Teatro) res.status(404).json({error: 'not found'});
            res.status(201).json(Teatro);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    async DeleteTeatro(req, res){
        try{
			const token = securityService.getTokenFromHeader(req);
			if (token == null || token == undefined) return res.status(401).json({ error: 'Token no proporcionado' });
			if(securityService.verifyToken(token) != true) return res.status(403).json({error: 'token no validado'});
            const Teatro = await teatroService.deleteTeatro(req.params.id);
            if(!Teatro) res.status(404).json({error: 'not found'});
            res.status(201).json(Teatro);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

}

export default TeatroController;
