import express from "express"; 
import AuthController from "../Controllers/AuthController.js";
const authController = new AuthController;
const Router = express.Router();
Router.post('/Register', authController.Register);
Router.post('/Login', authController.Login);

export default Router;
