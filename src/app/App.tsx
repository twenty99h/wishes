import { AppGate } from './model';
import { useGate } from 'effector-react';
import { Outlet, useNavigate } from 'react-router';

function App() {
  const navigate = useNavigate();

  useGate(AppGate, { navigate });

  return <Outlet />;
}

export default App;
