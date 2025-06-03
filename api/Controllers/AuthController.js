import AuthService from "../services/AuthService.js";
const authService = new AuthService;
class AuthController {
 
 /*
  * Registrar un usuario
*/
    async Register(req, res) {
      try {
        const authResult = await authService.Register(req.body);
        return res.status(200).json(authResult);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }

/*
 * Inicio de sesion
*/
    async Login(req, res){
        try{
            const authResult = await authService.Login(req.body);
            if(!authResult)  return res.status(404).json({error: 'not found'});
             return res.status(200).json(authResult);
        }catch(err){
			return res.status(500).json({error: err.message});
        }
    }

	/*
	 *Verificar Hcaptcha
	*/
	async verifyHCaptcha(req, res){
		try{
			const authResult = await authService.verifyHCaptcha(req.body.token);
			if(!authResult) return res.status(401).json({error: 'failed HCaptcha'});
			return res.status(200).json(authResult);

		}catch(err){
			return res.status(500).json({error: err.message})
		
		}
	}
	
	generateToken(req,res){
		try{
			const newAccessToken = authService.generateToken(req);
			if(!newAccessToken) return res.status(400).json({error: "bad request"});
			return res.status(200).json({token: newAccessToken});
		}catch(err){
			console.log(err.message)
			return res.status(500).json({error: err.message})
		}

	}
   
}

export default AuthController;
