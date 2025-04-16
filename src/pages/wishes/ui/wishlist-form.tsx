import { Button, Flex, Form, FormControl, FormField, FormItem, FormMessage, Input } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { WishesTabForm as WishesTabFormType, wishesTabFormSchema } from '../model';

export function WishlistForm() {
  const form = useForm({
    resolver: zodResolver(wishesTabFormSchema),
    defaultValues: {
      title: '',
    },
  });

  function handleSubmit(data: WishesTabFormType) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Flex direction="column" gap={4}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Название" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Flex>
        <Button type="submit">Создать</Button>
      </form>
    </Form>
  );
}
