import UsuariosService from "../services/UsuariosService.js";
import SecurityService from "../services/SecurityService.js";
const securityService = new SecurityService;
const usuariosService = new UsuariosService;
class UsuariosController {
 
 /*
 * crea un usuario nuevo
 * to do: validar el rol del usuario con el payload
 * del token y compararlo con la base de datos.
*/
    async createUsuario(req, res) {
      try {
        const Usuario = await usuariosService.createUsuarios(req.body);
        res.status(201).json(Usuario);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
/*
 * obtiene el usuario por su id
 * to do: validar el rol del usuario con el payload
 * del token y compararlo con la base de datos.
*/
    async getUsuario(req, res){
		try{
			const token = securityService.verifyToken(req);
			if(!token) return res.status(401).json({error: 'token not verify'})
			//hint: el payload del token siempre es _id
			console.log(token._id);	


            const Usuario = await usuariosService.getUsuario(req.params.id);
            if(!Usuario) res.status(404).json({error: 'not found'});
            res.status(200).json(Usuario);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
/*
 * obtiene el usuario por el username
 * to do: validar el rol del usuario con el payload
 * del token y compararlo con la base de datos.
*/
	 async getUsuarioByUsername(req, res){
        try{
			const token = securityService.verifyToken(req);
			if(!token) return res.status(401).json({error: 'token not verify'})
            const Usuario = await usuariosService.getUsuarioByUsername(req.params.username);
            if(!Usuario) res.status(404).json({error: 'not found'});
            res.status(200).json(Usuario);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

/*
 * actualiza el usuario por su id
 * to do: validar el rol del usuario con el payload
 * del token y compararlo con la base de datos.
*/
    async UpdateUsuario(req, res){
        try{
			const token = securityService.verifyToken(req);
			if(!token) return res.status(401).json({error: 'token not verify'})
            const Usuario = await usuariosService.updateUsuario(req.params.id, req.body);
            if(!Usuario) res.status(404).json({error: 'not found'});
            res.status(200).json(Usuario);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
/*
 * elimina el usuario por su id
 * to do: validar el rol del usuario con el payload
 * del token y compararlo con la base de datos.
*/
    async DeleteUsuario(req, res){
        try{
			const token = securityService.verifyToken(req);
			if(!token) return res.status(401).json({error: 'token not verify'})
            const Usuario = await usuariosService.deleteUsuario(req.params.id);
            if(!Usuario) res.status(404).json({error: 'not found'});
            res.status(200).json(Usuario);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

}

export default UsuariosController;
