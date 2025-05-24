import Stripe from 'stripe';
import { config } from '../config/config.js';
const stripe = new Stripe(config.STRIPE_SECRET, {
   });
const endpointSecret = config.WEBHOOK_SECRET;

class WebhookService{

	async registerEvent(req){
		let buildEvent = req.body;
		if(endpointSecret){
			const signature = req.headers['stripe-signature'] || req.headers['Stripe-Signature'];


		
			buildEvent = stripe.webhooks.constructEvent(
			req.body.toString(),
			signature,
			endpointSecret
		);
		}
		//console.log(buildEvent);

		//Manejamos el evento
		switch(buildEvent.type){
			case 'payment_intent.succeeded':
				const paymentIntent = buildEvent.data.object;
				console.log('payment_intent recived' + paymentIntent.amount);
				break;
			case 'checkout.session.completed':
				//console.log(buildEvent);
				const session = buildEvent.data.object;
				//console.log(session)
				const lineItems = await stripe.checkout.sessions.listLineItems(
					session.id
				);
				console.log(JSON.stringify(lineItems))
				/*
				const sessionWithDetails = stripe.checkout.sessions.retrieve(
      session.id,
      {
        expand: ['line_items'],
      }
    );
	
    // Iterar sobre los line_items para obtener el nombre del producto
    sessionWithDetails.line_items.data.forEach((item) => {
      const productName = item.description || item.price.product.name;
      const quantity = item.quantity;
      const amount = item.amount_total / 100; // Convertir a la moneda base (de centavos a unidades)

      console.log(`Producto: ${productName}, Cantidad: ${quantity}, Monto: ${amount}`);
    });i*/
			break;
			default:
				console.log('unhandle event type' + buildEvent.type);
				break;

		}
		
	}


}

export default WebhookService;
