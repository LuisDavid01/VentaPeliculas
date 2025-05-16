import Stripe from 'stripe';
import dotenv from "dotenv";
import SesionService from './SesionService.js';
const sesionService = new SesionService;
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET, {
   });
class CompraService{
	// crea uan sesion de compra de stripe
	// to do: crear sesion personalizada
	async createCheckoutSession(data){
		console.log(data);
		if(!data.asientosSeleccionados || data.asientosSeleccionados.length <= 0) return;
		const item = await sesionService.getSesion(data.id_sesion);

		const name = item.sala.nombre + " " +item.sala.id_movie.titulo;

		const session = await stripe.checkout.sessions.create({
    line_items: [{
      price_data: {
        currency: 'crc',
        product_data: {
          name: name,
        },
        unit_amount: item.sala.precioAsiento * 100,
      },
      quantity: data.asientosSeleccionados.length,
    }],
    mode: 'payment',
    ui_mode: 'embedded',
    return_url: 'https://localhost:7294/compra/success'  
		});
	return session.client_secret;
}



}

export default CompraService;
