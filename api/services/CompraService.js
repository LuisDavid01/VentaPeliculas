import Stripe from 'stripe';
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET, {
   });
class CompraService{
	// crea uan sesion de compra de stripe
	// to do: crear sesion personalizada
	async createCheckoutSession(){
		const session = await stripe.checkout.sessions.create({
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'T-shirt',
        },
        unit_amount: 2000,
      },
      quantity: 1,
    }],
    mode: 'payment',
    ui_mode: 'embedded',
    return_url: 'https://localhost:7294/compra/success'  
		});
	return session.client_secret;
}



}

export default CompraService;
