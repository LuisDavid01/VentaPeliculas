import express from "express"; 
import SesionController from "../Controllers/SesionController.js";

const sesionController = new SesionController;
const Router = express.Router();


Router.post('/Sesion', sesionController.createSesion);
Router.get('/Sesion', sesionController.getSesiones);
Router.get('/Sesion/:id', sesionController.getSesion);
Router.put('/Sesion/:id', sesionController.updateSesion);
Router.delete('/Sesion/:id', sesionController.deleteSesion);


export default Router;
