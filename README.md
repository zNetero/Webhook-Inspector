Webhook Inspector

O que o projeto faz

Cria uma URL única por sessão de usuário.

Aceita qualquer método HTTP na rota de captura.

Atualiza a interface ao vivo toda vez que um evento chega, sem precisar recarregar a página.

Mostra o formato JSON contendo o Body, Headers e Query Params da requisição.

Possui uma função de "Replay" com um clique, que reenvia o mesmo webhook para o backend local, poupando o trabalho de ter que ir no painel do serviço externo engatilhar outro evento de teste.

Como rodar na sua máquina

Se você quiser testar o projeto localmente, os passos são bem simples. Você apenas precisará ter o Node.js instalado.
Clone este repositório.
Abra o terminal na pasta raiz do projeto.

Para rodar o backend:
Navegue até a pasta do backend, instale as dependências, crie as tabelas do banco de dados e inicie o servidor.
Bash

cd backend
npm install
npx prisma migrate dev
npm run dev

Para rodar o frontend:
Abra um segundo terminal, entre na pasta do frontend, instale as dependências e inicie o servidor de interface.
Bash

cd frontend
npm install
npm run dev