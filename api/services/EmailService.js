import { Resend } from "resend";
import { config } from "../config/config.js";
const resend = new Resend(config.EMAIL_TOKEN);

class EmailService {
	async sendTickets(content){
		const {data, err } = await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: content.email,
		subject: 'Confirmacion de compra',
		 html: `
        <h2>¡Gracias por tu compra en Cineflex, ${content.nombre}!</h2>
        <p>Tu compra ha sido procesada correctamente.</p>
		<p>Fecha de pago: ${content.dateNow}</p>
        <p><strong>Detalles:</strong></p>
        <ul>
          <li>Película: ${content.movieTitle}</li>
          <li>Fecha: ${content.fecha}</li>
          <li>Horario: ${content.horarioInicio}</li>
          <li>Asientos: ${content.asientos.join(', ')}</li>
		  <li>Precio por asiento: ${content.precioAsiento} </li>
		  <li>cobro total: ${content.precioAsiento * content.asientos.length} </li>
        </ul>
		<a href='${content.invoiceUrl}'>Descarga tu factura!</a>
      `});
		if(err) return;
		return data;

	}

		async sendDulceriaInvoice(content){
		const detallesProductos = content.productos.map(p => `
			<li>${p.cantidad} x ${p.nombre} — $${p.precioUnitario} c/u = $${p.cantidad * p.precioUnitario}</li>
			`).join('');
		const {data, err } = await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: content.email,
		subject: 'Confirmacion de compra',
		 html: `
        <h2>¡Gracias por tu compra en Cineflex, ${content.nombre}!</h2>
        <p>Tu compra ha sido procesada correctamente.</p>
		<p>Fecha de pago: ${content.dateNow}</p>
        <p><strong>Detalles de productos adquiridos: </strong></p>
        <ul>
          ${detallesProductos}
		  <li>cobro total: $ ${content.total} </li>
        </ul>
		<a href='${content.invoiceUrl}'>Descarga tu factura!</a>
      `});
		if(err) return;
		return data;

	}

}

export default EmailService;
