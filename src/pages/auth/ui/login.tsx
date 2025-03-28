import { createLazyRoute } from '@tanstack/react-router';
import { LoginForm } from './login-form';

export const Route = createLazyRoute('/auth/login')({
  component: LoginPage,
});

export function LoginPage() {
  return <LoginForm />;
}
