import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
class CompraService{

	async realizarCompra(data){
		if(data.cargoTotal == null || typeof(data.cargoTotal) != "number") throw new Error("informacion de cargo no valido");
		const stripe = new Stripe(process.env.STRIPE_SECRET, {
			//REMOVER EN PRODUCCION!
				httpClient: Stripe.createFetchHttpClient({ verify: () => true }), // Desactiva la verificación SSL 
		});
		const charge = await stripe.charges.create({
			amount: data.cargoTotal * 100, // En centavos (equivalente a $20.00 USD)
			currency: 'usd',
			source: data.StripeToken, // Token enviado desde el formulario
			description: 'Pago de prueba',
		});
		return charge.paid;

	}
}

export default CompraService;
