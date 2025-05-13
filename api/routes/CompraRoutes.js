import express from "express"; 
import CompraController from "../Controllers/CompraController.js";
const compraController = new CompraController;
const Router = express.Router();
Router.post('/createCheckoutSession', compraController.createCheckoutSession);
export default Router;
