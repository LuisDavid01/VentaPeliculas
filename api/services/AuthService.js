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
		if(data == null) throw new Error("No se cargaron datos");
		const user = new UsuariosModel(data);
		console.log(user.nombre);
		user.rol = 'user';
		return await usuariosService.createUsuarios(user);
		
	}

	async Login(data){

		if(!data.username || !data.password) throw new Error("Contraseña o usuario vacio");
		
		const userLookUp = await usuariosService.getUsuarioByUsername(data.username);
		const password = data.password.toString();
		const verifyPassword = await securityService.CheckPassword(password, userLookUp.password);
		if( verifyPassword === true){
			const token = jwt.sign({_id: userLookUp._id, rol: userLookUp.rol},
				process.env.JWT_SECRET,
				{
					expiresIn:'20m'
				});
			 userLookUp.token = token;
			await usuariosService.updateLoggedUsuario(userLookUp._id,userLookUp);
			return userLookUp;
			
		}

	}
}

export default AuthService;
