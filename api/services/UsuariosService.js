
import UsuariosModel from '../models/UsuariosModel.js';
import SecurityService from './SecurityService.js';
const securityService = new SecurityService;
class UsuariosService{

	// creamos un usuario
    async createUsuarios(data) {
		
			const usuario = new UsuariosModel(data);
			usuario.token=null;
			usuario.password = await securityService.hashPassword(usuario.password); 
			await usuario.save();
			return usuario;
			
		
    }
	// obtenemos los usuarios o usuario
    async getUsuario(id){
		        if(id != 0){
            return await UsuariosModel.findById(id);
        }
        return await UsuariosModel.find();
        
    }
	//busca usuario por id
	async getUsuarioByUsername(user){
	        return await UsuariosModel.findOne({username: user});
        
    }

	// actualiza un usuario por id
    async updateUsuario(id, data){
			
			let updatedUser = data;
			if(updatedUser.password != null) {
				updatedUser.token = null;
				return await UsuariosModel.findByIdAndUpdate(id,updatedUser, {new: true});

			}		


    }
//actualiza un usuario loggeado para actualizar el token
	async updateLoggedUsuario(id, data){
		let updatedUser = data;
		// esto se hace para no dejar a un usuario sin contraseña
		if(updatedUser.password != null) {
			return await UsuariosModel.findByIdAndUpdate(id,updatedUser, {new: true});

		}		

		
    }

// eliminar usuario por id
    async deleteUsuario(id){
		        return await UsuariosModel.findByIdAndDelete(id);

    }



}

export default UsuariosService;
