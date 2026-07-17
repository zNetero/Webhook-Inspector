import type { Request, Response } from "express";
import { prisma } from "../database/index.js";
import { getIO } from "../websocket/socket.js";

type WebhookParams = { userId: string; path?: string };

const getSingleRouteParam = (value: string | string[] | undefined): string | undefined => {
    if (typeof value === 'string') {
        return value;
    }

    if (Array.isArray(value) && value.length > 0) {
        return value[0];
    }

    return undefined;
};

export class WebhookController { 

    handle = async (req: Request<WebhookParams>, res: Response) => {
    try {
        const userId = getSingleRouteParam(req.params.userId);

        if (!userId) {
            return res.status(400).json({ error: 'userId param is required' });
        }

        const path = req.params.path ? `/${req.params.path}` : '/';

        const headersStr = JSON.stringify(req.headers || {});
        const queryStr = JSON.stringify(req.query || {});
        const bodyStr = JSON.stringify(req.body || {});

        const webhook = await prisma.webhook.create({
            data:{
                userId,
                method: req.method,
                path,
                headers: headersStr,
                body: bodyStr,
                query: queryStr,
        },
    });

        console.log(`\n[Webhook Salvo] ID: ${webhook.id} | Usuário: ${userId}`);
        const io = getIO();
        io.to(`room:${userId}`).emit('webhook_received', {
            id: webhook.id,
            method: webhook.method,
            path: webhook.path,
            headers: req.headers,
            query: req.query,
            body: req.body,
            createdAt: webhook.createdAt,
        });

        res.status(200).send('Webhook recebido com sucesso');
    } catch(error){
        console.error('Erro ao salvar o webhook:', error);
        res.status(500).json({ error: 'Erro interno ao processar o webhook' });
        }
    };

    list = async (req: Request, res: Response) => {
        try {
            const userId = getSingleRouteParam(req.params.userId);

            if (!userId) {
                return res.status(400).json({ error: 'userId param is required' });
            }

            const webhooks = await prisma.webhook.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
            });

            const formattedWebhooks = webhooks.map(hook => ({
                ...hook,
                headers: JSON.parse(hook.headers),
                query: JSON.parse(hook.query),
                body: JSON.parse(hook.body),
            }))

            res.status(200.).json(formattedWebhooks);
        } catch (error) {
            console.error('Erro ao listar webhooks:', error);
            res.status(500).json({ error: 'Erro interno ao buscar webhooks' });
        }
    }
}
