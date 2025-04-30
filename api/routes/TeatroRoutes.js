import express from "express"; 
import TeatroController from "../Controllers/TeatroController.js";

const teatroController = new TeatroController;
const Router = express.Router();


Router.post('/Teatro', teatroController.createTeatro);
Router.get('/Teatro', teatroController.getTeatros);
Router.get('/Teatro/:id', teatroController.getTeatro);
Router.put('/Teatro/:id', teatroController.UpdateTeatro);
Router.delete('/Teatro/:id', teatroController.DeleteTeatro);


export default Router;
