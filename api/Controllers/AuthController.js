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
			if(!authResult) return res.status(403).json({error: 'failed HCaptcha'});
			return res.status(200).json(authResult);

		}catch(err){
			return res.status(500).json({error: err.message})
		
		}

	
	}
   
}

export default AuthController;
