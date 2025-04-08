import express from "express"; 
import MoviesController from "../Controllers/MoviesController.js";
const moviesController = new MoviesController;
const Router = express.Router();
Router.post('/movies', moviesController.createMovie);
Router.get('/movies/:id', moviesController.getMovie);
Router.put('/movies/:id', moviesController.UpdateMovie);
Router.delete('/movies/:id', moviesController.DeleteMovie);
export default Router;