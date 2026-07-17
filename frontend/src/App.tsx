import { useWebhooks } from './contexts/WebhookContext';
import { Activity, Filter, Copy, Play } from 'lucide-react';

export default function App() {
  const { userId, webhooks } = useWebhooks();

  return (
    <div className="min-h-screen bg-[#FAF9F6] p-4 md:p-8 font-sans flex flex-col items-center">
      {}
      <div className="w-full max-w-5xl bg-white rounded-t-xl border-t border-l border-r border-gray-200 p-4 flex items-center justify-between shadow-sm mt-8">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="font-mono text-sm text-gray-600 bg-gray-100 px-4 py-1 rounded-md">
          hooks.local/{userId}
        </div>
        <div className="flex items-center gap-2 text-green-500 text-sm font-semibold tracking-wide">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          AO VIVO
        </div>
      </div>

      {}
      <div className="w-full max-w-5xl bg-white rounded-b-xl border border-gray-200 shadow-sm flex min-h-[500px]">
        
        {}
        <aside className="w-1/3 border-r border-gray-200 flex flex-col bg-gray-50/50">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between text-gray-500 font-semibold text-xs tracking-wider">
            <div className="flex items-center gap-2">
              <Activity size={16} />
              EVENTOS RECEBIDOS
            </div>
            <Filter size={16} className="cursor-pointer hover:text-gray-800" />
          </div>
          
          <div className="overflow-y-auto flex-1 p-2 space-y-1">
            {webhooks.length === 0 ? (
              <p className="text-center text-gray-400 text-sm mt-4">Aguardando eventos...</p>
            ) : (
              webhooks.map((hook) => (
                <div key={hook.id} className="p-3 bg-white border border-gray-200 rounded-md shadow-sm flex items-center justify-between cursor-pointer hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-3">
                    {}
                    <span className={`font-mono font-bold text-xs ${hook.method === 'POST' ? 'text-purple-700' : 'text-blue-600'}`}>
                      {hook.method}
                    </span>
                    <span className="font-mono text-sm text-gray-700">{hook.path}</span>
                  </div>
                  <span className="text-xs font-bold text-green-500">200</span>
                </div>
              ))
            )}
          </div>
        </aside>

        {}
        <main className="w-2/3 flex flex-col relative">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between text-gray-500 font-semibold text-xs tracking-wider">
            <div className="flex items-center gap-2">
              <span>{`{ }`}</span>
              PAYLOAD
            </div>
            <Copy size={16} className="cursor-pointer hover:text-gray-800" />
          </div>

          <div className="p-6 flex-1 bg-gray-50/30">
            {}
            <div className="bg-white border border-gray-200 rounded-lg p-4 h-full shadow-inner text-gray-400 flex items-center justify-center">
              Selecione um evento ao lado para inspecionar
            </div>
          </div>

          {}
          <div className="absolute bottom-6 right-6">
            <button className="bg-[#FF5A36] hover:bg-[#E04826] text-white px-6 py-2 rounded-md font-bold flex items-center gap-2 transition-colors shadow-md">
              REENVIAR
            </button>
          </div>
        </main>

      </div>
    </div>
  );
}