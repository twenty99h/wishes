import { useGate } from 'effector-react';
import { useNavigate } from 'react-router';
import { AppLayout } from './layout/layout';
import { AppGate } from './model';

function App() {
  const navigate = useNavigate();

  useGate(AppGate, { navigate });

  return <AppLayout />;
}

export default App;
