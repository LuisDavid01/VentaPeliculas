import Stripe from 'stripe';
import { config } from '../config/config.js';
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
				const lineItems = await stripe.checkout.sessions.listLineItems(
					checkout.id
				);
				
				console.log(lineItems.data)
			break;
			default:
				console.log('unhandle event type' + event.type);
				break;

		}
		
	}


}

export default WebhookService;
