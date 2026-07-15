import { Router } from 'express';
import { WebhookController } from '../controllers/WebhookController.js';

const router = Router();
const webhookController = new WebhookController();

router.get('/webhooks/:userId', webhookController.list);

export { router as apiRouter };