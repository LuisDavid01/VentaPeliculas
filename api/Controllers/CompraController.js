import CompraService from "../services/CompraService.js";
const compraService = new CompraService;
class CompraController {
 
 
    async realizarCompra(req, res) {
      try {
        const compra = await compraService.realizarCompra(req.body);
		//if(compra != true) return res.status(400).json("error en la compra")
		console.log(compra);
        return res.redirect(303, compra.url);
      } catch (err) {
			console.log(err.message);
        res.status(500).json({ error: err.message });
      }
    }


  
   
}

export default CompraController;
