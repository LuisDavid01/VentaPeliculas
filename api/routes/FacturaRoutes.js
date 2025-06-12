import express from "express"; 
import { verifyToken, validateRol} from "../Middlewares/AuthMiddleware.js";
import FacturaController from "../Controllers/FacturaController.js";
const facturaController = new FacturaController;
const Router = express.Router();
Router.get('/Facturas', verifyToken, validateRol('Admin') ,facturaController.getFacturas);
Router.get('/Facturas/:id', verifyToken, validateRol('Admin') ,facturaController.getFactura);
export default Router;
