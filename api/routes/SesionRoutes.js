import express from "express"; 
import SesionController from "../Controllers/SesionController.js";
import { verifyToken, validateRol } from "../Middlewares/AuthMiddleware.js";
const sesionController = new SesionController;
const Router = express.Router();


Router.post('/Sesion',verifyToken, validateRol('Admin') ,sesionController.createSesion);
Router.get('/Sesion', sesionController.getSesiones);
Router.get('/Sesion/:id', sesionController.getSesion);
Router.get('/Sesion/sala/:id', sesionController.getSesionPorSala);
Router.get('/Sesiones/Sala', sesionController.getAllSesionesPorSala);
Router.get('/Sesiones/Peliculas', sesionController.getSesionesPeliculas);
Router.get('/Sesiones/Pelicula/:title', sesionController.getSesionesByMovieTitle);
Router.put('/Sesion/:id',verifyToken, validateRol('Admin') ,sesionController.updateSesion);
Router.delete('/Sesion/:id',verifyToken, validateRol('Admin') ,sesionController.deleteSesion);

export default Router;
