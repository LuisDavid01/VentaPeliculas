import express from "express"; 
import ProductoDulceriaController from "../Controllers/ProductoDulceriaController.js";
import { verifyToken, validateRol } from "../Middlewares/AuthMiddleware.js";
const productoDulceriaController = new ProductoDulceriaController;
const Router = express.Router();


Router.post('/ProductoDulceria', verifyToken, validateRol('Admin'),productoDulceriaController.createProductoDulceria);
Router.get('/ProductoDulceria', verifyToken ,productoDulceriaController.getProductosDulcerias);
Router.get('/ProductoDulceria/:id', verifyToken ,productoDulceriaController.getProductoDulceria);
Router.put('/ProductoDulceria/:id',verifyToken, validateRol('Admin') ,productoDulceriaController.updateProductoDulceria);
Router.delete('/ProductoDulceria/:id',verifyToken, validateRol('Admin') ,productoDulceriaController.deleteProductoDulceria);


export default Router;
