import admin from 'firebase-admin';
import {config} from "../config/config.js";

//Inicializamos el servicio de firebase con las credenciales de administrador
admin.initializeApp({
	credential: admin.credential.cert(config.firebaseConfig),
	storageBucket: config.STORAGE_BUCKET
});



class FirebaseService{
	//sube una imagen
	async UploadImage(img){
	    const bucket = admin.storage().bucket();
		const fileName = `movies/${img.originalname}`
		const loadImage = bucket.file(fileName);
		//si la imagen existe lanzamos un error
		const [exists] = await loadImage.exists();
		if(exists) throw new Error('El archivo ya existe o tiene el mismo nombre');
		await loadImage.save(img.buffer, {
			metadata:{
				contentType: img.mimetype,
			},

		});
		await loadImage.makePublic();

		const imgUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

		return imgUrl;

	}
	//Elimina una imagen
	async deleteImage(filepath){
	    const bucket = admin.storage().bucket();
		let relativePath = filepath;
		if (filepath.startsWith(`https://storage.googleapis.com/${bucket.name}/`)) {
			relativePath = filepath.replace(`https://storage.googleapis.com/${bucket.name}/`, '');
		}
		const file = bucket.file(relativePath);
		//si la imagen no existe devolvemos true porque no hay que eliminar nada
		const [exists] = await file.exists();
		if(!exists) return true;
		
		await file.delete();
		return true;
	}
}

export default FirebaseService;
