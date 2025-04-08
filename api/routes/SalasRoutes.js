import express from "express"; 
import SalasController from "../Controllers/SalasController.js";
const salasController = new SalasController;
const Router = express.Router();
Router.post('/Salas', salasController.createSala);
Router.get('/Salas', salasController.getSalas);
Router.get('/Salas/:id', salasController.getSala);
Router.put('/Salas/:id', salasController.UpdateSala);
Router.delete('/Salas/:id', salasController.DeleteSala);
Router.put('/Salas/:id/asientos', salasController.ModificarAsiento);
Router.put('/Salas/:id/:idMovie', salasController.ModificarPeliculaSala);


export default Router;