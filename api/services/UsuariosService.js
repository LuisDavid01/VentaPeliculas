
import UsuariosModel from '../models/UsuariosModel.js';
import SecurityService from './SecurityService.js';
const securityService = new SecurityService;
class UsuariosService{

    async createUsuarios(data) {
		
			const usuario = new UsuariosModel(data);
			usuario.token=null;
			usuario.password = await securityService.hashPassword(usuario.password); 
			await usuario.save();
			return usuario;
			
		
    }

    async getUsuario(id){
		        if(id != 0){
            return await UsuariosModel.findById(id);
        }
        return await UsuariosModel.find();
        
    }

	async getUsuarioByUsername(user){
	        return await UsuariosModel.findOne({username: user});
        
    }


    async updateUsuario(id, data){
			
			let updatedUser = data;
			if(updatedUser.password != null) {
				updatedUser.token = null;
				return await UsuariosModel.findByIdAndUpdate(id,updatedUser, {new: true});

			}		


    }
	async updateLoggedUsuario(id, data){
					let updatedUser = data;
			if(updatedUser.password != null) {
				return await UsuariosModel.findByIdAndUpdate(id,updatedUser, {new: true});

			}		

		
    }


    async deleteUsuario(id){
		        return await UsuariosModel.findByIdAndDelete(id);

    }



}

export default UsuariosService;
