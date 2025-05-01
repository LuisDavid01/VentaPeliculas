
import SalasService from "../services/SalasService.js";
const salasService = new SalasService
class SalasController {
 
 
    async createSala(req, res) {
      try {
			const token = securityService.getTokenFromHeader(req);
			if (token == null || token == undefined) return res.status(401).json({ error: 'Token no proporcionado' });
			if(securityService.verifyToken(token) != true) return res.status(403).json({error: 'token no validado'});
        const Sala = await salasService.createSala(req.body);
        res.status(201).json(Sala);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }

    async getSala(req, res){
        try{
            const Salas = await salasService.getSala(req.params.id);
            if(!Salas) res.status(404).json({error: 'not found'});
            res.status(201).json(Salas);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
    async getSalas(req, res){
        try{
            const Salas = await salasService.getSalas();
            if(!Salas) res.status(404).json({error: 'not found'});
            res.status(201).json(Salas);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    async UpdateSala(req, res){
        try{
			const token = securityService.getTokenFromHeader(req);
			if (token == null || token == undefined) return res.status(401).json({ error: 'Token no proporcionado' });
			if(securityService.verifyToken(token) != true) return res.status(403).json({error: 'token no validado'});
            const Salas = await salasService.updateSala(req.params.id, req.body);
            if(!Salas) res.status(404).json({error: 'not found'});
            res.status(201).json(Salas);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    async DeleteSala(req, res){
        try{
			const token = securityService.getTokenFromHeader(req);
			if (token == null || token == undefined) return res.status(401).json({ error: 'Token no proporcionado' });
			if(securityService.verifyToken(token) != true) return res.status(403).json({error: 'token no validado'});
            const Salas = await salasService.deleteSala(req.params.id);
            if(!Salas) res.status(404).json({error: 'not found'});
            res.status(201).json(Salas);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
//cambiar en un futuro
    async ModificarPeliculaSala(req, res){
        try{
            const Salas = await salasService.ModificarPeliculaSala(req.params.id,req.params.idMovie);
            if(!Salas) res.status(404).json({error: 'not found'});
            res.status(201).json(Salas);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
//cambiar en un futuro
    async ModificarAsiento(req, res){
        try{
            const Salas = await salasService.ModificarAsiento(req.params.id,req.body);
            if(Salas === undefined) res.status(404).json({error: 'not found'});
            res.status(201).json({success: "Se modifico el asiento"});
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
}

export default SalasController;
