import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { webhookRoutes } from './routes/webhook.routes.js';
import { createServer } from 'http';
import { initSocket } from './websocket/socket.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

const httpServer = createServer(app);
initSocket(httpServer);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });    
});

app.use('/h', webhookRoutes);

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});