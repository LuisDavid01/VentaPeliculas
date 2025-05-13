import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();
class SecurityService{

/*
 * Verifica el jwt token del frontend
 * to do: validar desde aqui el token??
 * encontrar alguna forma mejor de verificarlo????
*/
	  verifyToken(req){
		//agarramos el header del request
		const tokenHeader = req.headers['authorization'];
		if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
		return;
		}
		//obtenemos el token del header
		const token = tokenHeader.split(' ')[1];
		// lo verificamos
		return jwt.verify(token, process.env.JWT_SECRET);

	}
//encripta la contraseña
	async hashPassword(password){
		const salt = parseInt(process.env.salt);
		const userPassword = password.trim();
		const hashedpassword = await bcrypt.hash(userPassword, salt);
		return hashedpassword;

	}
//validamos la contraseña
	async CheckPassword(userPassword, hashedPassword){
		const password = userPassword.trim();
		return await bcrypt.compare(password, hashedPassword);

	}

}

export default SecurityService;
