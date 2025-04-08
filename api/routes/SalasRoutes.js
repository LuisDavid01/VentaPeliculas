import express from "express"; 
import SalasController from "../Controllers/SalasController.js";
const salasController = new SalasController;
const Router = express.Router();
Router.post('/Salas', salasController.createSala);
Router.get('/Salas/:id', salasController.getSala);
Router.put('/Salas/:id', salasController.UpdateSala);
Router.delete('/Salas/:id', salasController.DeleteSala);

export default Router;