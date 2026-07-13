import type { Request, Response } from "express";

export class WebhookController { 

    handle = async (req: Request, res: Response) => {

        const { userId } = req.params;

        const path = req.params[0];

        const webhookData = {
            userId,
            method: req.method,
            path,
            headers: req.headers,
            body: req.body,
            query: req.query,
            timestamp: new Date().toISOString()
        };

        console.log(`\n🔔 [Webhook Recebido] Usuário: ${userId} | Rota: ${path}`);
        console.log(JSON.stringify(webhookData, null , 2));

        res.status(200).send('Webhook recebido com sucesso');
    };
}
