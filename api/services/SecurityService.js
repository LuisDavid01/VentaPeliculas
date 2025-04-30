import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();
class SecurityService{


	 verifyToken(token){
		const data = jwt.verify(token, process.env.JWT_SECRET);
		if (data != null) return true;
		return false;

	}

	async hashPassword(password){
		const salt = parseInt(process.env.salt);
		const userPassword = password.trim();
		const hashedpassword = await bcrypt.hash(userPassword, salt);
		return hashedpassword;

	}

	async CheckPassword(userPassword, hashedPassword){
		const password = userPassword.trim();
		return await bcrypt.compare(password, hashedPassword);

	}
}

export default SecurityService;
