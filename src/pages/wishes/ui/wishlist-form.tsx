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
import { useWishlistStore, WISHLIST_FORM_DEFAULT_VALUES, wishlistFormSchema } from '../model';
import type { WishlistForm } from '../model';
import { useWishlistMutations } from '../hooks';

export function WishlistForm() {
  const closeDialog = useWishlistStore((state) => state.closeDialog);
  const isEditing = useWishlistStore((state) => state.isEditing);
  const isDeletable = useWishlistStore((state) => state.isDeletable);
  const formValues = useWishlistStore((state) => state.formValues);

  const { createWishlist, updateWishlist, deleteWishlist } = useWishlistMutations();

  const form = useForm({
    resolver: zodResolver(wishlistFormSchema),
    defaultValues: formValues || WISHLIST_FORM_DEFAULT_VALUES,
  });

  function handleSubmit({ id, title }: WishlistForm) {
    if (id) {
      updateWishlist.mutate({ id, title });
    } else {
      createWishlist.mutate({ title });
    }
  }

  function onDelete() {
    if (formValues?.id) {
      deleteWishlist.mutate(formValues.id);
    }
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
            <Button type="submit">{isEditing ? 'Сохранить' : 'Создать'}</Button>
            {isEditing && <DeleteButton withTooltip={!isDeletable} disabled={!isDeletable} onClick={onDelete} />}
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
  onClick: () => void;
};
// TODO: Думаю стоить убрать это гавно и просто отправлять с бека ошибку, что нельзя удалить последний вишлист и так же ставить вопросик сообщающий об этом
function DeleteButton({ withTooltip, disabled, onClick }: DeleteButtonProps) {
  if (withTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button type="button" variant="destructive" disabled={disabled} onClick={onClick}>
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
    <Button type="button" variant="destructive" disabled={disabled} onClick={onClick}>
      Удалить
    </Button>
  );
}
