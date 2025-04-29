import UsuariosService from "../services/UsuariosService.js";
import UsuariosModel from "../models/UsuariosModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
dotenv.config();
const usuariosService = new UsuariosService;
class AuthService
{

	async Register (data){
		const user = new UsuariosModel(data);
		user.rol = 'user';
		const RegisterUser = await usuariosService.createUsuarios(user);
		console.log('Usuarios Registrado: ', RegisterUser);
		
	}

	async Login(data){
		const userLookUp = await usuariosService.getUsuarioByUsername(data.username);
		if(this.CheckPassword(data.password, userLookUp.password )){
			const token = jwt.sign({_id: userLookUp._id, username: userLookUp.username},
				process.env.JWT_SECRET,
				{
					expiresIn:'20m'
				}); 
			userLookUp.token = token;
			console.log(userLookUp);
			await usuariosService.updateUsuario(userLookUp._id,userLookUp);
			return userLookUp;
			
		}

	}

	async CheckPassword(password, hashedPassword){
		return await bcrypt.compare(password, hashedPassword);

	}

}

export default AuthService;
