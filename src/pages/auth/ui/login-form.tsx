import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { LoginForm as LoginFormType, loginFormSchema } from '../model';
import { Link } from 'react-router';

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function handleFormSubmit(data: LoginFormType) {
    console.log(data);
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="py-10 rounded-3xl">
        <CardHeader className="text-center gap-1">
          <CardTitle className="text-xl">Вход</CardTitle>
          <CardDescription>Рады снова видеть вас!</CardDescription>
        </CardHeader>
        <CardContent className="px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Почта</FormLabel>
                        <FormControl>
                          <Input placeholder="mail@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Пароль</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Войти
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Еще нет аккаунта?{' '}
                  <Link to="/auth/register" className="underline underline-offset-4">
                    Зарегистрироваться
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
