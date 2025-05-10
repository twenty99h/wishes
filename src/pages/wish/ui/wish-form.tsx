import {
  Button,
  Flex,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
  Switch,
  Textarea,
} from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useWishStore, WISH_FORM_DEFAULT_VALUES, wishFormSchema } from '../../wishes/model';
import type { WishForm } from '../../wishes/model';
import { useWishMutations } from '../../wishes/hooks';

export function WishForm() {
  const closeDialog = useWishStore((state) => state.closeDialog);
  const isEditing = useWishStore((state) => state.isEditing);
  const formValues = useWishStore((state) => state.formValues);

  const { createWish, updateWish } = useWishMutations();

  const form = useForm({
    resolver: zodResolver(wishFormSchema),
    defaultValues: formValues || WISH_FORM_DEFAULT_VALUES,
  });

  function handleSubmit(data: WishForm) {
    if (data.id) {
      updateWish.mutate({ ...data, id: data.id });
    } else {
      const { id, ...wishData } = data;
      createWish.mutate(wishData);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price.amount"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Цена"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price.currency"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Валюта" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                <Input placeholder="Ссылка на изображение" {...field} />
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
        </div>

        <Flex justify="end" gap={2}>
          <Button type="button" variant="outline" onClick={closeDialog}>
            Отмена
          </Button>
          <Button type="submit" disabled={createWish.isPending || updateWish.isPending}>
            {isEditing ? 'Сохранить' : 'Создать'}
          </Button>
        </Flex>
      </form>
    </Form>
  );
}
