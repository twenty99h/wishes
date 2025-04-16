import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { RegisterForm as RegisterFormType, registerFormSchema } from '../model';
import { Link } from 'react-router';

export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  function handleFormSubmit(data: RegisterFormType) {
    console.log(data);
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="py-10 rounded-3xl">
        <CardHeader className="text-center gap-1">
          <CardTitle className="text-xl">Регистрация</CardTitle>
          <CardDescription>Скорее создайте аккаунт!</CardDescription>
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
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Повторите пароль</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Зарегистрироваться
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Уже есть аккаунт?{' '}
                  <Link to="/auth/login" className="underline underline-offset-4">
                    Войти
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
