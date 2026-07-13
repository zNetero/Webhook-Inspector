import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { webhookRoutes } from './routes/webhook.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });    
});

app.use('/h', webhookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});