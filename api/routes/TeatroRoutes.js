import express from "express"; 
import TeatroController from "../Controllers/TeatroController.js";

const teatroController = new TeatroController;
const Router = express.Router();


Router.post('/Teatro', teatroController.createTeatro);
Router.get('/Teatro/:id', teatroController.getTeatro);
Router.put('/Teatro/:id', teatroController.UpdateTeatro);
Router.delete('/Teatro/:id', teatroController.DeleteTeatro);
Router.put('/Teatro/addSala/:id', teatroController.addSala);
Router.put('/Teatro/deleteSala/:id/:idSala', teatroController.deleteSala);

export default Router;