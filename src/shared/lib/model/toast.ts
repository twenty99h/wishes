import { createEffect, createEvent, sample } from 'effector';
import { toast, type ExternalToast } from 'sonner';

type ToastType = 'normal' | 'success' | 'info' | 'warning' | 'error' | 'loading' | 'default';

export type ToastParams = {
  message: string;
  options?: ExternalToast & {
    type: ToastType;
  };
};

const showToastFx = createEffect(({ message, options: opts }: ToastParams) => {
  if (!opts?.type) {
    toast(message, opts);
    return;
  }

  switch (opts.type) {
    case 'success':
      toast.success(message, opts);
      break;
    case 'error':
      toast.error(message, opts);
      break;
    case 'info':
      toast.info(message, opts);
      break;
    case 'warning':
      toast.warning(message, opts);
      break;
    case 'loading':
      toast.loading(message, opts);
      break;
    case 'normal':
    case 'default':
    default:
      toast(message, opts);
  }
});

export const showToast = createEvent<ToastParams>();

sample({
  clock: showToast,
  target: showToastFx,
});
