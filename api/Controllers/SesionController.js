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


/*
 * Obtener una sesion por id de la sala
*/
    async getSesionPorSala(req, res){
        try{
            const Sesion = await sesionService.getSesionPorSala(req.params.id);
            if(!Sesion) return res.status(404).json({error: 'not found'});
            return res.status(200).json(Sesion);
        }catch(err){
            return res.status(500).json({error: err.message});
        }
    }

/*
 * Obtener las sesiones agrupadas por salas
*/ 
	async  getAllSesionesPorSala(req, res){
		try{
			const sesiones = await sesionService.getAllSesionesPorSala();
			if(!sesiones) return res.status(404).json({error: 'not found'});
			return res.status(200).json(sesiones);
		}catch(err){
			return res.status(500).json({ error: err.message});


		}


	}
/*
 * Obtener todas las sesiones con las salas agruapdas por peliculas
*/ 
    async getSesionesPeliculas(req, res){
		try{
			const sesiones = await sesionService.getSesionesPeliculas();
			if(!sesiones) return res.status(404).json({error: 'not found'});
			return res.status(200).json(sesiones);

		}catch(err){
			return res.status(500).json({error: err.message});
		}



	}

	/*
	 * Buscar sesiones por titulo de la pelicula
	*/
	async getSesionesByMovieTitle(req, res){
		try{
			const sesiones = await sesionService.searchSessionByMovieTitle(req.params.title);
			if(!sesiones) return res.status(404).json({error: 'not found'});
			return res.status(200).json(sesiones);

		}catch(err){
			return res.status(500).json({error: err.message});
		}
	}

async updateAsientos(req, res){
		try{
			const sesiones = await sesionService.updateAsientos(req.params.id, req.body);
			if(!sesiones) return res.status(404).json({error: 'not found'});
			return res.status(200).json(sesiones);

		}catch(err){
			return res.status(500).json({error: err.message});
		}
	}




}

	


export default SesionController;
