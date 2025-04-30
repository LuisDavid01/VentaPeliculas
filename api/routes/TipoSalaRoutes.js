import express from "express"; 
import TipoSalaController from "../Controllers/TipoSalaController.js";

const tipoSalaController = new TipoSalaController;
const Router = express.Router();


Router.post('/TipoSala', tipoSalaController.createSala);
Router.get('/TipoSala', tipoSalaController.getSalas);
Router.get('/TipoSala/:id', tipoSalaController.getSala);
Router.put('/TipoSala/:id', tipoSalaController.updateSala);
Router.delete('/TipoSala/:id', tipoSalaController.deleteSala);


export default Router;
