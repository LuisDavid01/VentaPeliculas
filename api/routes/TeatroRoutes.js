import express from "express"; 
import TeatroController from "../Controllers/TeatroController.js";
import { verifyToken, validateRol } from "../Middlewares/AuthMiddleware.js";
const teatroController = new TeatroController;
const Router = express.Router();


Router.post('/Teatro',verifyToken, validateRol('Admin'), teatroController.createTeatro);
Router.get('/Teatro', teatroController.getTeatros);
Router.get('/Teatro/:id', teatroController.getTeatro);
Router.put('/Teatro/:id',verifyToken, validateRol('Admin') ,teatroController.UpdateTeatro);
Router.delete('/Teatro/:id',verifyToken, validateRol('Admin'), teatroController.DeleteTeatro);


export default Router;
