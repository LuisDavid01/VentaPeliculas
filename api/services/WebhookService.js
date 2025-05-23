import Stripe from 'stripe';
import { config } from '../config/config.js';
const stripe = new Stripe(config.STRIPE_SECRET, {
   });
const endpointSecret = "whsec_99055e58276225511773392ca5817119e0621b36c1327a0c1d77690b907eae7e";

class WebhookService{

	registerEvent(req){
		let buildEvent = req.body;
		if(endpointSecret){
			//const signature = req.headers['stripe-signature'];
			const signature = Stripe.webhooks.generateTestHeaderString({
			payload: JSON.stringify(req.body),
			secret: endpointSecret
	});

		
				buildEvent = stripe.webhooks.constructEvent(
			JSON.stringify(req.body),
			signature,
			endpointSecret
		);
		}
		console.log(buildEvent);

		//Manejamos el evento
		switch(buildEvent.type){
			case 'payment_intent.succeeded':
				const paymentIntent = buildEvent.data.object;
				console.log('payment_intent recived' + paymentIntent.amount);
				break;
			default:
				console.log('unhandle event type' + buildEvent.type);
				return;

		}
		
	}


}

export default WebhookService;
