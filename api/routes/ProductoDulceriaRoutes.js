import express from "express"; 
import ProductoDulceriaController from "../Controllers/ProductoDulceriaController.js";
import { verifyToken, validateRol } from "../Middlewares/AuthMiddleware.js";
import multer from 'multer';
const productoDulceriaController = new ProductoDulceriaController;


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
Router.post('/ProductoDulceria', verifyToken, validateRol('Admin'),upload.single('imgFile'),productoDulceriaController.createProductoDulceria);
Router.get('/ProductoDulceria' ,productoDulceriaController.getProductosDulcerias);
Router.get('/ProductoDulceria/:id',productoDulceriaController.getProductoDulceria);
Router.get('/Productos/dulceria/:id',productoDulceriaController.getProductosByDulceria);
Router.put('/ProductoDulceria/:id',upload.single('imgFile'),productoDulceriaController.updateProductoDulceria);
Router.delete('/ProductoDulceria/:id',verifyToken, validateRol('Admin') ,productoDulceriaController.deleteProductoDulceria);


export default Router;
