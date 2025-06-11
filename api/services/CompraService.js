import Stripe from 'stripe';
import dotenv from "dotenv";
import SesionService from './SesionService.js';
const sesionService = new SesionService;
import ProductoDulceriaService from './ProductoDulceriaService.js';
const productoDulceriaService = new ProductoDulceriaService;
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET, {
   });
class CompraService{
	// crea uan sesion de compra de stripe
	// to do: crear sesion personalizada
	async createCheckoutSession(data){
		if(!data.asientosSeleccionados || data.asientosSeleccionados.length <= 0) return;
		const item = await sesionService.getSesion(data.id_sesion);
		//console.log(JSON.stringify(item))
		const fecha = item.fechaInicio
		const checkout = await stripe.checkout.sessions.create({
    line_items: data.asientosSeleccionados.map((asiento, index) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${asiento}`,
          description: `Asiento para la sala ${item.sala.nombre} pelicula ${item.id_movie.titulo}`,
        },
        unit_amount: item.sala.precioAsiento * 100,
      },
      quantity: 1,
    })),
	allow_promotion_codes: true,
    mode: 'payment',
    ui_mode: 'embedded',
    return_url: 'https://dotnet-test:7294/compra/success',
	 metadata: {
    sesionId: data.id_sesion,
	movieTitle: item.id_movie.titulo,
	fecha: fecha.toLocaleDateString(),
	horarioInicio: fecha.toLocaleTimeString(),
	tipo: 'movie'
  }
		});
	return checkout.client_secret;
}

	async createCheckoutSessionDulceria(data){
		const products = data.productosSeleccionados; 
		if(!products || products.length <= 0) return;
		let items = [];
		for( let i = 0; i < data.productosSeleccionados.length ; i++){
			let product = await productoDulceriaService.getProductoDulceria(products[i]._id);
			if(!product) throw new Error('Item no existe');
			if(product.cantidad < products[i].cantidad) throw new Error('Insuficiente stock');
			let newProduct = {
				id: product._id,
				nombre: product.nombre + ' ' + product.dulceria.nombre,
				descripcion: product.descripcion,
				cantidad: products[i].cantidad,
				unitAmount: product.precio,
				image: product.imagen

			}
		items.push(newProduct);	


	}
				
		const checkout = await stripe.checkout.sessions.create({
    line_items: items.map((product, index) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${product.nombre}`,
          description: `${product.descripcion}`,
		  images:[product.image]
        },
        unit_amount: product.unitAmount * 100,
      },
      quantity: product.cantidad,
    })),
	allow_promotion_codes: true,
    mode: 'payment',
    ui_mode: 'embedded',
    return_url: 'https://localhost:7294/compra/success',
	 metadata: {
	tipo: 'dulceria',
	products: JSON.stringify(products.map(p => ({
    _id: p._id
  })))
  }
		});
	return checkout.client_secret;
}




}

export default CompraService;
