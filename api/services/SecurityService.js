import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
class SecurityService{

	 verifyToken(token){
		const data = jwt.verify(token, process.env.JWT_SECRET);
		if (data != null) return true;
		return false;

	}


}

export default SecurityService;
