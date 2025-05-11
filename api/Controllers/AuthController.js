import AuthService from "../services/AuthService.js";
const authService = new AuthService;
class AuthController {
 
 
    async Register(req, res) {
      try {
        const AuthResult = await authService.Register(req.body);
        return res.status(200).json(AuthResult);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }


    async Login(req, res){
        try{
            const AuthResult = await authService.Login(req.body);
            if(!AuthResult)  return res.status(404).json({error: 'not found'});
             return res.status(200).json(AuthResult);
        }catch(err){
			return res.status(500).json({error: err.message});
        }
    }

   
}

export default AuthController;
