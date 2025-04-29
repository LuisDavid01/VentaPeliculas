import express from "express"; 
import UsuariosController from "../Controllers/UsuariosController.js";
const usuariosController = new UsuariosController;
const Router = express.Router();
Router.post('/Usuarios', usuariosController.createUsuario);
Router.get('/Usuarios/:id', usuariosController.getUsuario);
Router.put('/Usuarios/:id', usuariosController.UpdateUsuario);
Router.delete('/Usuarios/:id', usuariosController.DeleteUsuario);
export default Router;
