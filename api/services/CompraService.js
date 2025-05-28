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
		//console.log(data);
		if(!data.asientosSeleccionados || data.asientosSeleccionados.length <= 0) return;
		const item = await sesionService.getSesion(data.id_sesion);
		//console.log(JSON.stringify(item))
		const fecha = item.fechaInicio
		const session = await stripe.checkout.sessions.create({
    line_items: data.asientosSeleccionados.map((asiento, index) => ({
      price_data: {
        currency: 'crc',
        product_data: {
          name: `${asiento}`,
          description: `Asiento para la sala ${item.sala.nombre} pelicula ${item.id_movie.titulo}`,
        },
        unit_amount: item.sala.precioAsiento * 100,
      },
      quantity: 1,
    })), 
    mode: 'payment',
    ui_mode: 'embedded',
    return_url: 'https://localhost:7294/compra/success',
	 metadata: {
    sesionId: data.id_sesion,
	movieTitle: item.id_movie.titulo,
	fecha: fecha.toLocaleDateString(),
	horarioInicio: fecha.toLocaleTimeString()
  }
		});
	return session.client_secret;
}



}

export default CompraService;
