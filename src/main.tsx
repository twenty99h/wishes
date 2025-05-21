import { AppProvider } from '@/app/providers';
import { createRoot } from 'react-dom/client';
import './index.css';

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import('./__mocks__/browser');

  return worker.start();
}

enableMocking().then(() => createRoot(document.getElementById('root')!).render(<AppProvider />));
