import WebhookService from "../services/WebhookService.js";
const webhookService = new WebhookService;

class WebhookController {
 
 /*
  * Recoge el webhook de stripe
*/
     async registerEvent(req, res) {
      try {
		const response = await webhookService.registerEvent(req);
		if(!response) return res.status(400).json({error: 'no found'})
        return res.status(200).json({status: 'ok'});
      } catch (err) {
			console.log(err.message);
        res.status(500).json({ error: err.message });
      }
    }

   
}

export default WebhookController;
