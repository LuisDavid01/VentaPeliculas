import UsuariosService from "../services/UsuariosService.js";
const usuariosService = new UsuariosService;
class UsuariosController {
 
 
    async createUsuario(req, res) {
      try {
        const Usuario = await usuariosService.createUsuarios(req.body);
        res.status(201).json(Usuario);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }

    async getUsuario(req, res){
        try{
            const Usuario = await usuariosService.getUsuario(req.params.id);
            if(!Usuario) res.status(404).json({error: 'not found'});
            res.status(200).json(Usuario);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

	 async getUsuarioByUsername(req, res){
        try{
            const Usuario = await usuariosService.getUsuarioByUsername(req.params.username);
            if(!Usuario) res.status(404).json({error: 'not found'});
            res.status(200).json(Usuario);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }


    async UpdateUsuario(req, res){
        try{
            const Usuario = await usuariosService.updateUsuario(req.params.id, req.body);
            if(!Usuario) res.status(404).json({error: 'not found'});
            res.status(200).json(Usuario);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    async DeleteUsuario(req, res){
        try{
            const Usuario = await usuariosService.deleteUsuario(req.params.id);
            if(!Usuario) res.status(404).json({error: 'not found'});
            res.status(200).json(Usuario);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

}

export default UsuariosController;
