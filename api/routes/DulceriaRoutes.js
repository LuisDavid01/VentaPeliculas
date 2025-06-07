import express from "express"; 
import DulceriaController from "../Controllers/DulceriaController.js";
import { verifyToken, validateRol } from "../Middlewares/AuthMiddleware.js";
const dulceriaController = new DulceriaController;
const Router = express.Router();


Router.post('/Dulceria', verifyToken, validateRol('Admin'),dulceriaController.createDulceria);
Router.get('/Dulceria', verifyToken ,dulceriaController.getDulcerias);
Router.get('/Dulceria/:id', verifyToken ,dulceriaController.getDulceria);
Router.put('/Dulceria/:id',verifyToken, validateRol('Admin') ,dulceriaController.updateDulceria);
Router.delete('/Dulceria/:id',verifyToken, validateRol('Admin') ,dulceriaController.deleteDulceria);


export default Router;
