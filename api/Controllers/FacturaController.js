import FacturaService from "../services/FacturaService.js";
const facturaService = new FacturaService;
class FacturaController{
/*
 * Obtener todas las facturas
*/
    async getFacturas(req, res){
        try{
            const facturas = await facturaService.getFacturas();
            if(!facturas) res.status(404).json({error: 'not found'});

            res.status(200).json(facturas);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
	/*
 * Obtener todas las facturas
*/
    async getFactura(req, res){
        try{
            const facturas = await facturaService.getFactura(req.params.id);
            if(!facturas) res.status(404).json({error: 'not found'});

            res.status(200).json(facturas);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

}
export default FacturaController;
