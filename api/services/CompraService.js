import Stripe from 'stripe';
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET, {
   });
class CompraService{

	async realizarCompra(data){
		//console.log(data);
		//if(data.stripeToken == null || data.cargoTotal == null ) throw new Error("informacion de cargo no valido");
	 const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://localhost:7294/compra/success',
		cancel_url: 'http://localhost:7294/compra/cancel',
  });

 return session
	}
}

export default CompraService;
