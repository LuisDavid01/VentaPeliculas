import express from "express"; 
import { verifyToken} from "../Middlewares/AuthMiddleware.js";
import CompraController from "../Controllers/CompraController.js";
const compraController = new CompraController;
const Router = express.Router();
Router.post('/createCheckoutSession', verifyToken ,compraController.createCheckoutSession);
export default Router;
