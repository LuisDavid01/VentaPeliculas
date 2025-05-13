import SesionService from "../services/SesionService.js";
import SecurityService from "../services/SecurityService.js";
const securityService = new SecurityService;
const sesionService = new SesionService;
class SesionController {
 
 /*
  * Crear una sesion para un cine
*/
    async createSesion(req, res) {
      try {
			const token = securityService.verifyToken(req);
			if(!token) return res.status(401).json({error: 'token not verify'})
			const Sesion = await sesionService.createSesion(req.body);
			res.status(201).json(Sesion);
      } catch (err) {
			res.status(500).json({ error: err.message });
      }
    }
/*
 * Obtener una sesion por id
*/
    async getSesion(req, res){
        try{
            const Sesion = await sesionService.getSesion(req.params.id);
            if(!Sesion) return res.status(404).json({error: 'not found'});
            return res.status(200).json(Sesion);
        }catch(err){
            return res.status(500).json({error: err.message});
        }
    }


/*
 * Obtener todas las sesiones
 */
    async getSesiones(req, res){
        try{
            const Sesion = await sesionService.getSesiones();
            if(!Sesion) res.status(404).json({error: 'not found'});
            res.status(200).json(Sesion);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
/*
 * Actualiza una sesion
*/
    async updateSesion(req, res){
        try{
			const token = securityService.verifyToken(req);
			if(!token) return res.status(401).json({error: 'token not verify'})

            const Sesion = await sesionService.updateSesion(req.params.id, req.body);
            if(!Sesion) res.status(404).json({error: 'not found'});
            res.status(200).json(Sesion);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
/*
 * Eliminar una sesion
*/
    async deleteSesion(req, res){
        try{
			const token = securityService.verifyToken(req);
			if(!token) return res.status(401).json({error: 'token not verify'})

            const Sesion = await sesionService.deleteSesion(req.params.id);
            if(!Sesion) res.status(404).json({error: 'not found'});
            res.status(200).json(Sesion);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }



    
}

export default SesionController;
