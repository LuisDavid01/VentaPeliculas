import TipoSalaService from "../services/TipoSalaService.js";
const tipoSalaService = new TipoSalaService;
class TipoSalaController {
 
 
    async createSala(req, res) {
      try {
        const Sala = await tipoSalaService.createSala(req.body);
        res.status(201).json(Sala);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }

    async getSala(req, res){
        try{
            const Sala = await tipoSalaService.getSala(req.params.id);
            if(!Sala) res.status(404).json({error: 'not found'});
            res.status(200).json(Sala);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }



    async getSalas(req, res){
        try{
            const Sala = await tipoSalaService.getSalas();
            if(!Sala) res.status(404).json({error: 'not found'});
            res.status(200).json(Sala);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    async updateSala(req, res){
        try{
            const Sala = await tipoSalaService.updateSala(req.params.id, req.body);
            if(!Sala) res.status(404).json({error: 'not found'});
            res.status(200).json(Sala);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    async deleteSala(req, res){
        try{
            const Sala = await tipoSalaService.deleteSala(req.params.id);
            if(!Sala) res.status(404).json({error: 'not found'});
            res.status(200).json(Sala);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }



    
}

export default TipoSalaController;
