import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

//Tipagem (Interface)
export interface WebhookData {
  id: string;
  method: string;
  path: string;
  headers: Record<string, string>;
  query: Record<string, string>;
  body: any;
  createdAt: string;
}

interface WebhookContextType {
  userId: string;
  webhooks: WebhookData[];
}

const WebhookContext = createContext<WebhookContextType | undefined>(undefined);

//Função Auxiliar: Gera um ID curto 
const generateShortId = () => Math.random().toString(36).substring(2, 6);

export function WebhookProvider({ children }: { children: ReactNode }) {

//Lógica: Usamos o localStorage para que, se o usuário der F5 na página, ele não perca o ID dele.
  const [userId] = useState(() => {
    const saved = localStorage.getItem('@webhook_userId');
    if (saved) return saved;
    const newId = generateShortId();
    localStorage.setItem('@webhook_userId', newId);
    return newId;
  });

  const [webhooks, setWebhooks] = useState<WebhookData[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3333/api/webhooks/${userId}`)
      .then((res) => res.json())
      .then((data) => setWebhooks(data))
      .catch((err) => console.error('Erro ao buscar histórico:', err));

    const socket: Socket = io('http://localhost:3333');

    socket.on('connect', () => {
      socket.emit('join_session', userId);
    });

    socket.on('webhook_received', (newWebhook: WebhookData) => {
      setWebhooks((prevWebhooks) => [newWebhook, ...prevWebhooks]);
    });

    // Função de limpeza: se o usuário fechar a aba, fechamos a conexão com o servidor.
    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return (
    <WebhookContext.Provider value={{ userId, webhooks }}>
      {children}
    </WebhookContext.Provider>
  );
}

export const useWebhooks = () => {
  const context = useContext(WebhookContext);
  if (!context) {
    throw new Error('useWebhooks deve ser usado dentro de um WebhookProvider');
  }
  return context;
}