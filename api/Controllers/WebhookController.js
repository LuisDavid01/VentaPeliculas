import WebhookService from "../services/WebhookService.js";
const webhookService = new WebhookService;

class WebhookController {
 
 /*
  * Recoge el webhook de stripe
*/
     registerEvent(req, res) {
      try {
        const response =  webhookService.registerEvent(req);
        return res.status(200).json({status: 'ok'});
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }

   
}

export default WebhookController;
