import express from "express"; 
import TipoSalaController from "../Controllers/TipoSalaController.js";

const tipoSalaController = new TipoSalaController;
const Router = express.Router();


Router.post('/TipoSala', tipoSalaController.createTipoSala);
Router.get('/TipoSala', tipoSalaController.getTiposSala);
Router.get('/TipoSala/:id', tipoSalaController.getTipoSala);
Router.put('/TipoSala/:id', tipoSalaController.updateTipoSala);
Router.delete('/TipoSala/:id', tipoSalaController.deleteTipoSala);


export default Router;
