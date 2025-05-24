import { AppProvider } from '@/app/providers';
import { createRoot } from 'react-dom/client';
import './index.css';

createRoot(document.getElementById('root')!).render(<AppProvider />);
