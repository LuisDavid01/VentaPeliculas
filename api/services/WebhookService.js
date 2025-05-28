import Stripe from 'stripe';
import { config } from '../config/config.js';
import SesionService from './SesionService.js';
import EmailService from './EmailService.js';
const sesionService = new SesionService;
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
				console.log('payment_intent recived' + paymentIntent.amount);
			break;

			case 'checkout.session.completed':
				const checkout = event.data.object;
				console.log(checkout.customer_details)
				const lineItems = await stripe.checkout.sessions.listLineItems(checkout.id);

				const sesionid = checkout.metadata.sesionId		
				console.log("items de la sesion: " + JSON.stringify(lineItems))
				const numAsientos = lineItems.data.map(item => item.description);
				const reservarAsientos = sesionService.updateAsientos(sesionid, numAsientos);
				if(reservarAsientos){
					const emailService = new EmailService;

					const content = {
						asientos : numAsientos,
						precioAsiento: lineItems.data[0].price.unit_amount / 100,
						email: checkout.customer_details.email,
						nombre: checkout.customer_details.name
					}
					console.log(JSON.stringify(content))
					//emailService.sendTickets(content)
				}

			break;
			default:
				console.log('unhandle event type' + event.type);
				break;

		}
		
	}


}

export default WebhookService;
