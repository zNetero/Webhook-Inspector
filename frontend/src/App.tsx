import { useWebhooks } from './contexts/WebhookContext.tsx';

export default function App() {
  
  const { userId, webhooks } = useWebhooks();
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg border">
        <h1 className="text-2xl font-bold text-gray-800">URL de Webhook:</h1>
        <code className="bg-blue-100 text-blue-800 p-2 rounded mt-2 block w-fit">
          http://localhost:3333/h/{userId}
        </code>

        <h2 className="text-xl font-semibold mt-6 mb-2">Eventos Recebidos ({webhooks.length})</h2>
        <ul className="space-y-2">
          {webhooks.map((hook) => (
            <li key={hook.id} className="p-3 bg-gray-50 border rounded flex justify-between">
              <span className="font-mono font-bold text-blue-600">{hook.method}</span>
              <span className="font-mono text-gray-600">{hook.path}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}