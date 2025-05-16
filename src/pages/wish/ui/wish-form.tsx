import {
  Button,
  Flex,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FileUploader,
  Input,
  Label,
  NavButton,
  Switch,
  Textarea,
} from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useWishMutations } from '../hooks';
import type { WishForm } from '../model';
import { WISH_FORM_DEFAULT_VALUES, wishFormSchema } from '../model';
import { WishPageMode } from '../types';

type WishFormProps = {
  mode: WishPageMode;
  initialValues?: WishForm;
};

export function WishForm({ mode, initialValues }: WishFormProps) {
  const form = useForm({
    resolver: zodResolver(wishFormSchema),
    defaultValues: initialValues || WISH_FORM_DEFAULT_VALUES,
  });

  const { createWish, updateWish } = useWishMutations();

  function handleSubmit(data: WishForm) {
    if (mode === 'edit' && data.id) {
      updateWish.mutate({ ...data, id: data.id });
    } else {
      const { id, ...wishData } = data;
      createWish.mutate(wishData);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Название" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Описание" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" placeholder="Цена" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="productUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Ссылка на товар" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUploader accept="image/*" {...field} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-2">
          <FormField
            control={form.control}
            name="isVisible"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <Label>Видимый</Label>
              </FormItem>
            )}
          />

          {mode === 'edit' && (
            <FormField
              control={form.control}
              name="isFulfilled"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <Label>Исполнен</Label>
                </FormItem>
              )}
            />
          )}
        </div>

        <Flex className="mt-8" gap={2}>
          <NavButton to="/wishes" type="button" variant="secondary">
            Отмена
          </NavButton>
          <Button type="submit" loading={createWish.isPending || updateWish.isPending}>
            {mode === 'edit' ? 'Сохранить' : 'Создать'}
          </Button>
        </Flex>
      </form>
    </Form>
  );
}
