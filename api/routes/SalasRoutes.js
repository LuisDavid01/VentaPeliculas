import express from "express"; 
import SalasController from "../Controllers/SalasController.js";
import { verifyToken, validateRol } from "../Middlewares/AuthMiddleware.js";
const salasController = new SalasController;
const Router = express.Router();
Router.post('/Salas',verifyToken, validateRol('Admin') ,salasController.createSala);
Router.get('/Salas', salasController.getSalas);
Router.get('/Salas/:id', salasController.getSala);
Router.put('/Salas/:id',verifyToken, validateRol('Admin') ,salasController.UpdateSala);
Router.delete('/Salas/:id',verifyToken, validateRol('Admin'), salasController.DeleteSala);



export default Router;
