
import SalasService from "../services/SalasService.js";
const salasService = new SalasService
class SalasController {
 
 
    async createSala(req, res) {
      try {
        const Sala = await salasService.createSala(req.body);
        res.status(201).json(Sala);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }

    async getSala(req, res){
        try{
            const Salas = await salasService.getSalas(req.params.id);
            if(!Salas) res.status(404).json({error: 'not found'});
            res.status(201).json(Salas);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    async UpdateSala(req, res){
        try{
            const Salas = await salasService.updateSala(req.params.id, req.body);
            if(!Salas) res.status(404).json({error: 'not found'});
            res.status(201).json(Salas);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    async DeleteSala(req, res){
        try{
            const Salas = await salasService.deleteSala(req.params.id);
            if(!Salas) res.status(404).json({error: 'not found'});
            res.status(201).json(Salas);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
}

export default SalasController;