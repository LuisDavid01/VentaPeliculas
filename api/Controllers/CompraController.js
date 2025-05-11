import CompraService from "../services/CompraService.js";
const compraService = new CompraService;
class CompraController {
 
 
    async realizarCompra(req, res) {
      try {
        const compra = await compraService.realizarCompra(req.body);
		if(compra != true) return res.status(400).json("error en la compra")
        return res.status(200).json(compra);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }


  
   
}

export default CompraController;
