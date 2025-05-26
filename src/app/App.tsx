import { Toaster } from '@/shared/ui/sonner';
import { useGate } from 'effector-react';
import { useNavigate } from 'react-router';
import { AppLayout } from './layout/layout';
import { AppGate } from './model';
import { initUser } from '@/entities/user';

initUser();

function App() {
  const navigate = useNavigate();

  useGate(AppGate, { navigate });

  return (
    <>
      <AppLayout />
      <Toaster richColors />
    </>
  );
}

export default App;
