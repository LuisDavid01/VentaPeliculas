import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import {config} from "../config/config.js";

//Inicializamos el servicio de firebase con las credenciales de administrador
initializeApp({
	credential: cert(config.firebaseConfig),
	storageBucket: config.STORAGE_BUCKET
});



class FirebaseService{
	//sube una imagen
	async UploadImage(invoiceData){
	    const bucket = getStorage().bucket();
		const fileName = `movies/${invoiceData.originalname}`
		const loadInvoice = bucket.file(fileName);
		//si la imagen existe lanzamos un error
		const [exists] = await loadInvoice.exists();
		if(exists) throw new Error('El archivo ya existe o tiene el mismo nombre');
		await loadInvoice.save(invoiceData.buffer, {
			metadata:{
				contentType: invoiceData.mimetype,
			},

		});
		await loadInvoice.makePublic();

		const invoiceUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

		return invoiceUrl;

	}
	//Elimina una imagen
	async deleteImage(filepath){
	    const bucket = getStorage().bucket();
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



	//sube una factura
	async UploadInvoice(invoiceData, stream){
	    const bucket = getStorage().bucket();
		const fileName = `facturas/factura-${invoiceData.name}-${new Date().toISOString()}.pdf`
		const loadInvoice = bucket.file(fileName);

		 await new Promise((resolve, reject) => {
    const writeStream = loadInvoice.createWriteStream({
      metadata: {
        contentType: invoiceData.mimetype || 'application/pdf',
      },
      resumable: false,
    });

    stream.pipe(writeStream)
      .on('finish', resolve)
      .on('error', reject);
  });

		const [signedUrl] = await loadInvoice.getSignedUrl({
			action: 'read',
			expires: Date.now() + 30 * 24 * 60 * 60 * 1000, // un mes
		});

			return signedUrl;	
	}

}

export default FirebaseService;
