import express from "express"; 
import TipoSalaController from "../Controllers/TipoSalaController.js";
import { verifyToken, validateRol } from "../Middlewares/AuthMiddleware.js";
const tipoSalaController = new TipoSalaController;
const Router = express.Router();


Router.post('/TipoSala', verifyToken, validateRol('Admin'),tipoSalaController.createTipoSala);
Router.get('/TipoSala', tipoSalaController.getTiposSala);
Router.get('/TipoSala/:id', tipoSalaController.getTipoSala);
Router.put('/TipoSala/:id',verifyToken, validateRol('Admin') ,tipoSalaController.updateTipoSala);
Router.delete('/TipoSala/:id',verifyToken, validateRol('Admin') ,tipoSalaController.deleteTipoSala);


export default Router;
