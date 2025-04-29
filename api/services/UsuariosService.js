import UsuariosModel from '../models/UsuariosModel.js'
import mongoose from "mongoose";
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import SecurityService from './SecurityService.js';
const securityService = new SecurityService;
class UsuariosService{

    async createUsuarios(data) {
		if(securityService.verifyToken(data.token)){
			const usuario = new UsuariosModel(data);
			usuario.token=null;
			usuario.password = await this.hashPassword(usuario.password); 
			await usuario.save();
			return usuario;
			
		}
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
		if(updatedUser.password != null){
			updatedUser.password = await this.hashPassword(updatedUser.password);
			return await UsuariosModel.findByIdAndUpdate(id,updatedUser, {new: true});

		}		
    }

    async deleteUsuario(id){
        return await UsuariosModel.findByIdAndDelete(id);

    }


	async hashPassword(password){
	dotenv.config();
	const salt = await bcrypt.genSalt(parseInt(process.env.salt));
	const hashedpassword = await bcrypt.hash(password, salt);
	return hashedpassword;

}

}

export default UsuariosService;
