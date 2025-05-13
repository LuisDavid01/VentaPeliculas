import CompraService from "../services/CompraService.js";
const compraService = new CompraService;
class CompraController {
	async createCheckoutSession(req, res){
		try{
			const session = await compraService.createCheckoutSession();
			return res.status(200).json({clientSecret: session});

		}catch(err){
			console.log(err.message);
			res.status(500).json({error: err.message})
		}


	}

  
   
}

export default CompraController;
