import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { WebhookProvider } from './contexts/WebhookContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WebhookProvider>
      <App />
    </WebhookProvider>
  </StrictMode>,
)
