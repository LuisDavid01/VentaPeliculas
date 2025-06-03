
import bcrypt from "bcryptjs";

class SecurityService{

//validamos la contraseña
	async CheckPassword(userPassword, hashedPassword){
		const password = userPassword.trim();
		return await bcrypt.compare(password, hashedPassword);

	}

}

export default SecurityService;
