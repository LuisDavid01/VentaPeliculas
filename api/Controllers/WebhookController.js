import WebhookService from "../services/WebhookService.js";
const webhookService = new WebhookService;

class WebhookController {
 
 /*
  * Recoge el webhook de stripe
*/
     async registerEvent(req, res) {
      try {
		await webhookService.registerEvent(req);
        return res.status(200);
      } catch (err) {
			console.log(err.message);
        res.status(500);
      }
    }

   
}

export default WebhookController;
