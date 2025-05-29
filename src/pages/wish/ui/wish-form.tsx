import {
  Button,
  Flex,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  LoadingButton,
  Textarea,
} from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { useUnit } from 'effector-react';
import type { WishForm } from '../model';
import { $isFormPending, WISH_FORM_DEFAULT_VALUES, wishCreated, wishFormSchema, wishUpdated } from '../model';
import { WishPageMode } from '../types';
import { ImageUpload } from './image-upload';

type WishFormProps = {
  mode: WishPageMode;
  initialValues?: WishForm | null;
};

export function WishForm({ mode, initialValues }: WishFormProps) {
  const navigate = useNavigate();
  const { wishlistId } = useParams();

  const isFormPending = useUnit($isFormPending);

  const form = useForm({
    resolver: zodResolver(wishFormSchema),
    defaultValues: initialValues || WISH_FORM_DEFAULT_VALUES,
  });

  function handleSubmit(data: WishForm) {
    if (mode === 'edit' && data.id) {
      wishUpdated({ ...data });
    } else {
      const { id, ...createData } = data;
      wishCreated({ ...createData, wishlist_id: Number(wishlistId) });
    }
  }

  function goBack() {
    navigate(-1);
  }

  return (
    <Form {...form}>
      <form className="max-w-3xl w-full" onSubmit={form.handleSubmit(handleSubmit)}>
        <Flex direction="column" gap={4} className="mb-6">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Изображение</FormLabel>
                <FormControl>
                  <ImageUpload imageUrl={initialValues?.image_url} value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription>Загрузите изображение товара (необязательно)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input placeholder="Введите название желания" {...field} />
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
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Опишите ваше желание подробнее (необязательно)"
                    className="min-h-[100px]"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormDescription>Необязательно</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Flex gap={4}>
            <FormField
              control={form.control}
              name="product_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ссылка на товар</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/product" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormDescription>Где можно приобрести (необязательно)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цена</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      value={field.value === undefined ? '' : field.value}
                    />
                  </FormControl>
                  <FormDescription>Примерная стоимость (необязательно)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Flex>

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Статус</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Доступно</SelectItem>
                      <SelectItem value="reserved">Зарезервировано</SelectItem>
                      <SelectItem value="purchased">Куплено</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Изменить статус желания, что влияет на его видимость</FormDescription>
              </FormItem>
            )}
          />
        </Flex>
        <Flex justify="between">
          <Button variant="outline" type="button" disabled={isFormPending} onClick={goBack}>
            <X />
            Отмена
          </Button>
          <LoadingButton startIcon={<Save />} type="submit" loading={isFormPending}>
            Сохранить желание
          </LoadingButton>
        </Flex>
      </form>
    </Form>
  );
}
