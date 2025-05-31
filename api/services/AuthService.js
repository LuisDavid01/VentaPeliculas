import UsuariosService from "../services/UsuariosService.js";
import UsuariosModel from "../models/UsuariosModel.js";
import SecurityService from "./SecurityService.js";
import { verify } from "hcaptcha";
import { config } from "../config/config.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const usuariosService = new UsuariosService;
const securityService = new SecurityService;
class AuthService
{
	//registramos el usuario
	async Register (data){
		if(data == null) throw new Error("No se cargaron datos");
		const user = new UsuariosModel(data);
		console.log(user.nombre);
		user.rol = 'user';
		return await usuariosService.createUsuarios(user);
		
	}

	async Login(data){

	if(!data.username || !data.password) throw new Error("Contraseña o usuario vacio");
	// buscamos el usuarios por el username en la base de datos
	const userLookUp = await usuariosService.getUsuarioByUsername(data.username);
	const password = data.password.toString();

	const verifyPassword = await securityService.CheckPassword(password, userLookUp.password);
	if( verifyPassword === true){
			//creamos el jwt 
			const token = jwt.sign({_id: userLookUp._id, rol: userLookUp.rol},
			process.env.JWT_SECRET,
			{
				expiresIn:'7d'
			});
		//actualizamos el token del usuario
	userLookUp.token = token;
	await usuariosService.updateLoggedUsuario(userLookUp._id,userLookUp);
	return userLookUp;
			
		}

	}

	async verifyHCaptcha(token){
		const secret = config.HCAPTCHA_SECRET;
		const data = await verify(secret, token);
		if(data.success != true) return;
		return data;
	}
}

export default AuthService;
