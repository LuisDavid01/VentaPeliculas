import CompraService from "../services/CompraService.js";
const compraService = new CompraService;
class CompraController {

/*
 * Crea una sesion de pago de stripe
 * y la devuelve al frontend
*/
	async createCheckoutSession(req, res){
		try{
			const session = await compraService.createCheckoutSession(req.body);
			return res.status(200).json({clientSecret: session});

		}catch(err){
			console.log(err.message);
			res.status(500).json({error: err.message})
		}


	}

  
   
}

export default CompraController;
