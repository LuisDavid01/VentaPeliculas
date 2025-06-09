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
	async UploadImage(img,folderName){
		if(!img || !folderName) return;
	    const bucket = getStorage().bucket();
		const fileName = `${folderName}/${img.originalname}`
		const loadImg = bucket.file(fileName);
		//si la imagen existe lanzamos un error
		const [exists] = await loadImg.exists();
		if(exists) throw new Error('El archivo ya existe o tiene el mismo nombre');
		await loadImg.save(img.buffer, {
			metadata:{
				contentType: img.mimetype,
			},

		});
		const [signedUrl] = await loadImg.getSignedUrl({
			action: 'read',
			expires: Date.now() + 30 * 24 * 60 * 60 * 1000, // un mes
		});


		return { 
			signedUrl,
			fileName
		};

	}
	//Elimina una imagen
	async deleteImage(filepath){
	    const bucket = getStorage().bucket();
		const file = bucket.file(filepath);
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


	//sube una factura
	async UploadInvoiceDulceria(invoiceData, stream){
	    const bucket = getStorage().bucket();
		const fileName = `facturas/dulceria/factura-${invoiceData.name}-${new Date().toISOString()}.pdf`
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
