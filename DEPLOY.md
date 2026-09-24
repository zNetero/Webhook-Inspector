# Colocar o Webhook Inspector no ar

Este projeto tem **frontend (React)** e **backend (Express + Socket.io + PostgreSQL)**. Plataformas como **Vercel** e **Firebase Hosting** são ideais para o frontend estático, mas **não** hospedam bem WebSockets persistentes e API Node long-running no plano gratuito. A combinação recomendada para portfólio:

| Parte | Onde hospedar | Por quê |
|--------|----------------|---------|
| Frontend | [Vercel](https://vercel.com) ou [Firebase Hosting](https://firebase.google.com/docs/hosting) | Build Vite, CDN, HTTPS grátis |
| API + WebSocket + banco | [Render](https://render.com) (Docker + Postgres) | Suporta Socket.io e PostgreSQL |

Alternativas ao Render: **Railway**, **Fly.io**, **Google Cloud Run** (com ajustes de WebSocket).

---

## 1. Docker (local ou demo completa)

Na raiz do repositório:

```bash
docker compose up --build
```

- UI: http://localhost:8080  
- API: http://localhost:3333  
- URL de captura (exemplo): `http://localhost:3333/h/{seu-userId}`  

Para desenvolver no host com hot reload:

```bash
docker compose -f docker-compose.dev.yml up -d
cd backend
cp .env.example .env
npm install
npx prisma migrate deploy
npm run dev
```

Em outro terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

---

## 2. Backend no Render

1. Faça push do código para GitHub.
2. No Render: **New → Blueprint** e aponte para o repositório (usa o `render.yaml`), **ou** crie manualmente:
   - **PostgreSQL** (free): anote a `Internal Database URL` ou `External Database URL`.
   - **Web Service** → **Docker**, contexto `backend`, Dockerfile `backend/Dockerfile`.
3. Variáveis de ambiente no serviço web:
   - `DATABASE_URL` = connection string do Postgres (Render adiciona `?sslmode=require` se necessário).
   - `FRONTEND_URL` = URL do frontend (ex.: `https://webhook-inspector.vercel.app`) — você pode adicionar depois do passo 3.
4. Após o deploy, teste: `https://SUA-API.onrender.com/test`

**Nota:** no plano free o serviço “dorme” após inatividade; o primeiro acesso pode demorar ~1 min.

---

## 3. Frontend na Vercel

1. Importe o repositório na Vercel.
2. **Root Directory:** `frontend`
3. **Environment Variables** (Production):
   - `VITE_API_URL` = `https://SUA-API.onrender.com` (sem barra no final)
4. Deploy.

Volte ao Render e atualize `FRONTEND_URL` com a URL `.vercel.app` (necessário para CORS no replay e fetch).

---

## 4. Frontend no Firebase Hosting

```bash
cd frontend
cp .env.example .env
# Edite .env: VITE_API_URL=https://SUA-API.onrender.com
npm install
npm run build
cd ..
npm install -g firebase-tools
firebase login
cp .firebaserc.example .firebaserc
# Edite .firebaserc com seu project id
firebase deploy --only hosting
```

Configure `FRONTEND_URL` no Render com a URL do Firebase (ex.: `https://seu-projeto.web.app`).

---

## 5. O que colocar no currículo / LinkedIn

- **Demo:** link da Vercel ou Firebase  
- **Repositório:** GitHub  
- **Stack:** React, TypeScript, Node, Express, Socket.io, Prisma, PostgreSQL, Docker  

Frase sugerida: *“Webhook Inspector — ferramenta estilo RequestBin com atualização em tempo real via WebSocket; frontend na Vercel e API containerizada no Render.”*

---

## Checklist rápido

- [ ] Postgres acessível (`DATABASE_URL`)
- [ ] Backend responde em `/test`
- [ ] `VITE_API_URL` aponta para a API em produção
- [ ] `FRONTEND_URL` no backend inclui a URL exata do frontend
- [ ] Teste: abrir a UI, copiar URL `/h/{userId}`, enviar `curl -X POST ...`
