import { Button, Flex, Form, FormControl, FormField, FormItem, FormMessage, Input } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUnit } from 'effector-react';
import { useForm } from 'react-hook-form';
import type { WishlistForm } from '../model';
import {
  $formMode,
  $formValues,
  $isCanDelete,
  $isFormActionsPending,
  dialogClosed,
  WISHLIST_FORM_DEFAULT_VALUES,
  wishlistCreated,
  wishlistDeleted,
  wishlistFormSchema,
  wishlistUpdated,
} from '../model';

export function WishlistForm() {
  const [
    formValues,
    formMode,
    isCanDelete,
    isFormActionsPending,
    closeDialog,
    createWishlist,
    updateWishlist,
    deleteWishlist,
  ] = useUnit([
    $formValues,
    $formMode,
    $isCanDelete,
    $isFormActionsPending,
    dialogClosed,
    wishlistCreated,
    wishlistUpdated,
    wishlistDeleted,
  ]);

  const form = useForm({
    resolver: zodResolver(wishlistFormSchema),
    defaultValues: formValues || WISHLIST_FORM_DEFAULT_VALUES,
  });

  const isEditing = formMode === 'edit';

  function handleSubmit({ id, title }: WishlistForm) {
    if (formMode === 'edit' && id) {
      updateWishlist({ id, title });
    } else {
      createWishlist({ title });
    }
  }

  function onDelete() {
    if (!formValues?.id) {
      return;
    }
    deleteWishlist({ id: formValues.id });
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
        <Flex gap={2} justify="between">
          <Button type="button" variant="secondary" onClick={closeDialog}>
            Отмена
          </Button>
          <Flex className="w-auto" gap={4}>
            {isEditing && isCanDelete && (
              <Button type="button" variant="destructive" loading={isFormActionsPending} onClick={onDelete}>
                Удалить
              </Button>
            )}
            <Button type="submit" loading={isFormActionsPending}>
              {isEditing ? 'Сохранить' : 'Создать'}
            </Button>
          </Flex>
        </Flex>
      </form>
    </Form>
  );
}
