import UsuariosService from "../services/UsuariosService.js";
import UsuariosModel from "../models/UsuariosModel.js";
import SecurityService from "./SecurityService.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const usuariosService = new UsuariosService;
const securityService = new SecurityService;
class AuthService
{

	async Register (data){
		const user = new UsuariosModel(data);
		user.rol = 'user';
		await usuariosService.createUsuarios(user);
		
	}

	async Login(data){
		const userLookUp = await usuariosService.getUsuarioByUsername(data.username);
		const password = data.password.toString();
		const verifyPassword = await securityService.CheckPassword(password, userLookUp.password);
		if( verifyPassword === true){
			const token = jwt.sign({_id: userLookUp._id, username: userLookUp.username},
				process.env.JWT_SECRET,
				{
					expiresIn:'20m'
				}); 
			userLookUp.token = token;
			await usuariosService.updateUsuario(userLookUp._id,userLookUp);
			return userLookUp;
			
		}

	}
}

export default AuthService;
