import { createLazyRoute } from '@tanstack/react-router';
import { RegisterForm } from './register-form';

export const Route = createLazyRoute('/auth/register')({
  component: RegisterPage,
});

export function RegisterPage() {
  return <RegisterForm />;
}
