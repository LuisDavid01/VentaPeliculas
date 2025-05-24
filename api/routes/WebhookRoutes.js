 import express from "express"; 
import WebhookController from "../Controllers/WebhookController.js";
const webhookController = new WebhookController;
 //import Stripe from "stripe";
 //import { config } from "../config/config.js";
import bodyParser from "body-parser";
const Router = express.Router();
Router.post('/webhook', bodyParser.raw({type: 'application/json'}) ,webhookController.registerEvent);
 /*
Router.post('/webhook2',bodyParser.raw({type: 'application/json'}), (request, response) => {
	 console.log(Buffer.isBuffer(request.body));
	 console.log(typeof(request))
  let event = request.body;
	 const stripe = new Stripe(config.STRIPE_SECRET, {
   });
	const endpointSecret = config.WEBHOOK_SECRET;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body.toString(),
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
		console.log(event);
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});
*/
export default Router;
