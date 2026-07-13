import { Router } from "express";
import { WebhookController } from "../controllers/WebhookController.js";

const router = Router();
const webhookController = new WebhookController();

router.all('/:userId/*path', webhookController.handle);

router.all('/:userId', webhookController.handle);

export { router as webhookRoutes };