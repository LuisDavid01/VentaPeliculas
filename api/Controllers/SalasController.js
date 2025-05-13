
import SalasService from "../services/SalasService.js";
import SecurityService from "../services/SecurityService.js";
const securityService = new SecurityService;
const salasService = new SalasService
class SalasController {
 
 /*
  * Crear una sala
*/
    async createSala(req, res) {
      try {
			const token = securityService.verifyToken(req);
			if(!token) return res.status(401).json({error: 'token not verify'})
			const Sala = await salasService.createSala(req.body);
			res.status(201).json(Sala);
      } catch (err) {
			res.status(500).json({ error: err.message });
      }
    }
/*
 * Obtener una sala
*/
    async getSala(req, res){
        try{
            const Salas = await salasService.getSala(req.params.id);
            if(!Salas) res.status(404).json({error: 'not found'});
            res.status(200).json(Salas);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
/*
 * Obtener todas las salas
*/
    async getSalas(req, res){
        try{
            const Salas = await salasService.getSalas();
            if(!Salas) res.status(404).json({error: 'not found'});
            res.status(200).json(Salas);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
/*
 * Actualizar una sala
*/
    async UpdateSala(req, res){
        try{
			const token = securityService.verifyToken(req);
			if(!token) return res.status(401).json({error: 'token not verify'})
            const Salas = await salasService.updateSala(req.params.id, req.body);
            if(!Salas) res.status(404).json({error: 'not found'});
            res.status(200).json(Salas);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
/*
 * Eliminar una sala
*/
    async DeleteSala(req, res){
        try{
			const token = securityService.verifyToken(req);
			if(!token) return res.status(401).json({error: 'token not verify'})
            const Salas = await salasService.deleteSala(req.params.id);
            if(!Salas) res.status(404).json({error: 'not found'});
            res.status(200).json(Salas);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
/*
 * Modifica unicamente la pelicula de la sala
 * ?? quizas se deba eliminar
*/
    async ModificarPeliculaSala(req, res){
        try{
            const Salas = await salasService.ModificarPeliculaSala(req.params.id,req.params.idMovie);
            if(!Salas) res.status(404).json({error: 'not found'});
            res.status(200).json(Salas);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
/*
 * Modifica un asiento de la sala
 * to do: mover funcion a sesion
*/
    async ModificarAsiento(req, res){
        try{
            const Salas = await salasService.ModificarAsiento(req.params.id,req.body);
            if(Salas === undefined) res.status(404).json({error: 'not found'});
            res.status(200).json({success: "Se modifico el asiento"});
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
}

export default SalasController;
