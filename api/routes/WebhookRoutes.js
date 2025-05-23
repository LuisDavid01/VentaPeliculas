 import express from "express"; 
import WebhookController from "../Controllers/WebhookController.js";
const webhookController = new WebhookController;
const Router = express.Router();
Router.post('/webhook', express.raw({type: 'application/json'}) ,webhookController.registerEvent);


export default Router;
