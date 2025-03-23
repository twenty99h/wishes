import { AuthLayout } from './auth-layout';
import { LoginForm } from './login-form';

export function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
