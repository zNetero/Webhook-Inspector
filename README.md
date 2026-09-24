# Webhook Inspector

Ferramenta para **inspecionar webhooks em tempo real**: cada sessão recebe uma URL única, qualquer método HTTP é aceito na rota de captura, e a interface atualiza ao vivo via WebSocket.

## Funcionalidades

- URL única por sessão (`/h/{userId}`)
- Body, headers e query params em JSON
- Replay com um clique
- Histórico persistido no banco

## Rodar com Docker (recomendado)

Requisitos: [Docker Desktop](https://www.docker.com/products/docker-desktop/)

```bash
docker compose up --build
```

| Serviço   | URL |
|-----------|-----|
| Interface | http://localhost:8080 |
| API       | http://localhost:3333 |

## Rodar sem Docker (desenvolvimento)

1. Suba só o PostgreSQL:

```bash
docker compose -f docker-compose.dev.yml up -d
```

2. Backend:

```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate deploy
npm run dev
```

3. Frontend (outro terminal):

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

A interface fica em http://localhost:5173

## Deploy para recrutadores

Guia passo a passo (Vercel/Firebase + Render + Docker): **[DEPLOY.md](./DEPLOY.md)**

## Stack

- Frontend: React, Vite, Tailwind, Socket.io client  
- Backend: Express, Socket.io, Prisma, PostgreSQL  
- Infra: Docker, Render, Vercel (ou Firebase Hosting)
