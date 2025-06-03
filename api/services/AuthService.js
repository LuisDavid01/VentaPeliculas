import UsuariosService from "../services/UsuariosService.js";
import UsuariosModel from "../models/UsuariosModel.js";
import SecurityService from "./SecurityService.js";
import { verify } from "hcaptcha";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

const usuariosService = new UsuariosService;
const securityService = new SecurityService;
class AuthService
{
	//registramos el usuario
	async Register (data){
		if(data == null) throw new Error("No se cargaron datos");
		const user = new UsuariosModel(data);
		user.rol = 'user';
		return await usuariosService.createUsuarios(user);
		
	}

	async Login(data){

	if(!data.username || !data.password) throw new Error("Contraseña o usuario vacio");
	// buscamos el usuarios por el username en la base de datos
	const userLookUp = await usuariosService.getUsuarioByUsername(data.username);
	if(!userLookUp) throw new Error("Usuario no encontrado")
	const password = data.password.toString();

	const verifyPassword = await securityService.CheckPassword(password, userLookUp.password);
	if( verifyPassword === true){
			//creamos el jwt 
			const token = jwt.sign({_id: userLookUp._id, rol: userLookUp.rol},
			config.JWT_SECRET,
			{
				expiresIn:'15m'
			});
			const refreshToken = jwt.sign({_id: userLookUp._id, rol: userLookUp.rol},
			config.JWT_REFRESH_SECRET,
			{
				expiresIn:'7d'
			});

		//actualizamos el token del usuario
	const loggedUser = {
			...userLookUp._doc,
			token,
			refreshToken 
			}
	
	return loggedUser;
			
		}

	}

	async verifyHCaptcha(token){
		const secret = config.HCAPTCHA_SECRET;
		const data = await verify(secret, token);
		if(data.success != true) return;
		return data;
	}

	generateToken(req){
		//todo generar un token en base al refreshtoken
		const tokenHeader = req.headers['x-refresh-token'] || req.headers['X-Refresh-Token'];	
		if(!tokenHeader) throw new Error("Token no presente");
		const tokenPayload = jwt.verify(tokenHeader, config.JWT_REFRESH_SECRET);
		//generamos el nuevo token de acceso
		const accessToken = jwt.sign({_id: tokenPayload._id, rol: tokenPayload.rol},
			config.JWT_SECRET,
			{
				expiresIn:'15m'
			});

		return accessToken;




	}
}

export default AuthService;
