import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';

let io: SocketServer;

export const initSocket = (server: HttpServer): SocketServer => {
  io = new SocketServer(server, {
    cors: {
      origin: '*', 
      methods: ['GET', 'POST'],
    },
  });

  
  io.on('connection', (socket) => {
    console.log(`Novo cliente conectado ao WebSocket: ${socket.id}`);

    // Lógica: se o usuário 'a8f3' abrir a página, ele entra na sala 'room:a8f3'.
    socket.on('join_session', (userId: string) => {
      socket.join(`room:${userId}`);
      console.log(`Cliente ${socket.id} entrou na sala do usuário: ${userId}`);
    });

    socket.on('disconnect', () => {
      console.log(`Cliente desconectado do WebSocket: ${socket.id}`);
    });
  });

  return io;
};


export const getIO = (): SocketServer => {
  if (!io) {
    throw new Error('Socket.io não foi inicializado!');
  }
  return io;
};