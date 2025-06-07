
import UsuariosModel from '../models/UsuariosModel.js';
import bcrypt from 'bcryptjs';
//import SecurityService from './SecurityService.js';
//const securityService = new SecurityService;
class UsuariosService{

	// creamos un usuario
    async createUsuarios(data) {
		const userLookUp = await this.userExist(data);
		if( userLookUp === undefined ||userLookUp === true) throw new Error("ya existe este usuario")
		const usuario = new UsuariosModel(data);
		usuario.token=null;
		usuario.password = await this.hashPassword(usuario.password); 
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

	//verficiar si un usuario existe
	async userExist(data){
		if(!data || !data.username || !data.email) throw new Error('Datos incompletos: username y email son requeridos');
		const exist = await UsuariosModel.exists({
      $or: [
        { username: data.username },
        { email: data.email }
      ]});
		return !!exist

	}

	//encripta la contraseña
	async hashPassword(password){
		const salt = parseInt(process.env.salt);
		const userPassword = password.trim();
		const hashedpassword = await bcrypt.hash(userPassword, salt);
		return hashedpassword;

	}


}

export default UsuariosService;
