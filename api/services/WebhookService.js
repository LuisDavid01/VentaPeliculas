import Stripe from 'stripe';
import { config } from '../config/config.js';
import SesionService from './SesionService.js';
import EmailService from './EmailService.js';
import FacturaService from './FacturaService.js';
import FirebaseService from './FirebaseService.js';
import ProductoDulceriaService from './ProductoDulceriaService.js';
const productoDulceriaService = new ProductoDulceriaService;
const sesionService = new SesionService;
const facturaService = new FacturaService;
const firebaseService = new FirebaseService;
const stripe = new Stripe(config.STRIPE_SECRET, {
   });
const endpointSecret = config.WEBHOOK_SECRET;

class WebhookService{

	async registerEvent(req){
		let event = req.body;
		if(endpointSecret){
			const signature = req.headers['stripe-signature'] || req.headers['Stripe-Signature'];

			event = stripe.webhooks.constructEvent(
			req.body.toString(),
			signature,
			endpointSecret
		); 
		}
		//console.log(event);

		//Manejamos el evento
		switch(event.type){
			case 'payment_intent.succeeded':
				const paymentIntent = event.data.object;
				console.log('payment_intent recived ' + paymentIntent.amount);
			break;

			case 'checkout.session.completed':
				const checkout = event.data.object;
				if(checkout.metadata.tipo === 'dulceria'){
					await this.DulceriaCheckout(checkout);
			
				}else{
					 await this.MovieCheckout(checkout);
				
				}

			break;
			default:
				console.log('unhandle event type' + event.type);
				break;

		}
		
	}

	async MovieCheckout(checkout){
			//console.log(checkout.customer_details)
				const lineItems = await stripe.checkout.sessions.listLineItems(checkout.id);

				const sesionid = checkout.metadata.sesionId		
				//console.log("items de la sesion: " + JSON.stringify(lineItems))
				const numAsientos = lineItems.data.map(item => item.description);
				const reservarAsientos = sesionService.updateAsientos(sesionid, numAsientos);
				if(reservarAsientos){
					const emailService = new EmailService;

					const content = {
						asientos : numAsientos,
						precioAsiento: lineItems.data[0].price.unit_amount / 100,
						email: checkout.customer_details.email,
						nombre: checkout.customer_details.name,
						movieTitle: checkout.metadata.movieTitle,
						fecha: checkout.metadata.fecha,
						horarioInicio: checkout.metadata.horarioInicio,
						dateNow: new Date().toLocaleString(),
						invoiceUrl: 'porfavor comunicarse con cineFlex para obtener su factura'

					}
					console.log(JSON.stringify(content))

					const pdfStream = facturaService.createInvoice(content);

					const invoiceData = {
						name: checkout.customer_details.name,
						mimetype: 'application/pdf'

					}
					const invoiceDownloadUrl = await firebaseService.UploadInvoice(invoiceData, pdfStream);
					console.log(invoiceDownloadUrl)
					content.invoiceUrl = invoiceDownloadUrl


					const email = emailService.sendTickets(content)
					if(email) console.log("se envio correctamente")
				}
	}



		async DulceriaCheckout(checkout){
			//console.log(checkout.customer_details)
				const lineItems = await stripe.checkout.sessions.listLineItems(checkout.id);	
				//console.log("items de la sesion: " + JSON.stringify(lineItems.data))
				//const itemsComprados = lineItems.data.map(item => item.description);
			const productosId = JSON.parse(checkout.metadata.products)
			let productos = []
			for(let i = 0; i < lineItems.data.length; i++){
			productos.push({
				nombre: lineItems.data[i].description,
				cantidad: lineItems.data[i].quantity,
				precioUnitario: lineItems.data[i].price.unit_amount / 100
			});

			await productoDulceriaService.updateQuantityProductoDulceriaById(productosId[i], productos[i].cantidad);
			}
		console.log(JSON.stringify(productos))
				if(productos){
					const emailService = new EmailService;

					const content = {
						productos : productos,
						email: checkout.customer_details.email,
						nombre: checkout.customer_details.name,
						dateNow: new Date().toLocaleString(),
						total: checkout.amount_total / 100,
						invoiceUrl: 'porfavor comunicarse con cineFlex para obtener su factura'

					}
					console.log(JSON.stringify(content))

					const pdfStream = facturaService.createInvoiceDulceria(content);

					const invoiceData = {
						name: checkout.customer_details.name,
						mimetype: 'application/pdf'

					}
					const invoiceDownloadUrl = await firebaseService.UploadInvoiceDulceria(invoiceData, pdfStream);
					console.log(invoiceDownloadUrl)
					content.invoiceUrl = invoiceDownloadUrl


					const email = emailService.sendDulceriaInvoice(content)
					if(email) console.log("se envio correctamente")
				}
	}




}

export default WebhookService;
