import express from "express"; 
import PromocionesController from "../Controllers/PromocionesController.js";
import { verifyToken, validateRol } from "../Middlewares/AuthMiddleware.js";
const promocionesController = new PromocionesController;
const Router = express.Router();


Router.post('/Promociones', verifyToken, validateRol('Admin'),promocionesController.createPromocion);
Router.get('/Promociones' ,promocionesController.getPromociones);
Router.get('/Admin/Promociones' ,verifyToken, validateRol('Admin'),promocionesController.getPromociones);
Router.get('/Promociones/:id',promocionesController.getPromocion);
Router.delete('/Promociones/:id',verifyToken, validateRol('Admin') ,promocionesController.deletePromocion);


export default Router;
