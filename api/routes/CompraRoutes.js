import express from "express"; 
import CompraController from "../Controllers/CompraController.js";
const compraController = new CompraController;
const Router = express.Router();
Router.post('/realizarCompra', compraController.realizarCompra);


export default Router;
