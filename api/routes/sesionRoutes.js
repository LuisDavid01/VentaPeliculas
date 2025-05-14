import express from "express"; 
import SesionController from "../Controllers/SesionController.js";

const sesionController = new SesionController;
const Router = express.Router();


Router.post('/Sesion', sesionController.createSesion);
Router.get('/Sesion', sesionController.getSesiones);
Router.get('/Sesion/:id', sesionController.getSesion);
Router.get('/Sesion/sala/:id', sesionController.getSesionPorSala);
Router.get('/Sesiones/Sala', sesionController.getAllSesionesPorSala);
Router.get('/Sesiones/Peliculas', sesionController.getSesionesPeliculas);
Router.put('/Sesion/:id', sesionController.updateSesion);
Router.delete('/Sesion/:id', sesionController.deleteSesion);


export default Router;
