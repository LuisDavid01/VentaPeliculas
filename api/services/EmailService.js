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
        <h2>¡Gracias por tu compra en Cineflex!</h2>
        <p>Tu compra ha sido procesada correctamente.</p>
        <p><strong>Detalles:</strong></p>
        <ul>
          <li>Película: ${content.movie}</li>
          <li>Fecha: ${content.date}</li>
          <li>Horario: ${content.time}</li>
          <li>Asientos: ${content.seats.join(', ')}</li>
        </ul>
      `});
		if(err) return;
		return data;

	}


}

export default EmailService;
