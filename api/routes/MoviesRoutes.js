import express from "express"; 
import multer from 'multer';
import { verifyToken, validateRol } from "../Middlewares/AuthMiddleware.js";
import MoviesController from "../Controllers/MoviesController.js";
const moviesController = new MoviesController;
const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	fileFilter:(req, file, cb) => {
		const filetypes = /jpeg|jpg|png/;
		const mimetype = filetypes.test(file.mimetype);
		const extname = filetypes.test(file.originalname.split('.').pop().toLowerCase());
		if(mimetype && extname){
		return cb(null, true);
		}
		cb(new Error('Only JPEG, JPG, or PNG images are allowed'));


	}
});
const Router = express.Router();
Router.post('/movies',verifyToken, validateRol('Admin') ,upload.single('imgFile') ,moviesController.createMovie);
Router.get('/movies', moviesController.getMovies);
Router.get('/movies/:id', moviesController.getMovie);
Router.put('/movies/:id',verifyToken, validateRol('Admin') ,upload.single('imgFile'),moviesController.UpdateMovie);
//Router.post('/moviesActualizar/:id',upload.single('imgFile') ,moviesController.UpdateMovie);
Router.delete('/movies/:id',verifyToken, validateRol('Admin') ,moviesController.DeleteMovie);
export default Router; 
