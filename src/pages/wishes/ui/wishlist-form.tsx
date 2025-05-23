import {
  Button,
  Flex,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import type { WishlistForm } from '../model';
import { useUnit } from 'effector-react';

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
          <Flex gap={2}>
            <Button type="submit" loading={isFormActionsPending}>
              {isEditing ? 'Сохранить' : 'Создать'}
            </Button>
            {isEditing && (
              <DeleteButton
                withTooltip={!isCanDelete}
                disabled={!isCanDelete}
                loading={isFormActionsPending}
                onClick={onDelete}
              />
            )}
          </Flex>
          <Button type="button" variant="secondary" onClick={closeDialog}>
            Отмена
          </Button>
        </Flex>
      </form>
    </Form>
  );
}

type DeleteButtonProps = {
  withTooltip?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
};
// TODO: Думаю стоить убрать это гавно и просто отправлять с бека ошибку, что нельзя удалить последний вишлист и так же ставить вопросик сообщающий об этом
function DeleteButton({ withTooltip, disabled, onClick, loading }: DeleteButtonProps) {
  if (withTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button type="button" variant="destructive" disabled={disabled} loading={loading} onClick={onClick}>
              Удалить
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Невозможно удалить единственный вишлист</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button type="button" variant="destructive" disabled={disabled} loading={loading} onClick={onClick}>
      Удалить
    </Button>
  );
}
