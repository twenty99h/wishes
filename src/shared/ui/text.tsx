import { cn } from '@/shared/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { HTMLAttributes, forwardRef } from 'react';

const textVariants = cva('', {
  variants: {
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      accent: 'text-primary',
      destructive: 'text-destructive',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    weight: 'normal',
  },
});

export interface TextProps extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, size, weight, as: Component = 'p', children, ...props }, ref) => {
    return (
      <Component ref={ref} className={cn(textVariants({ variant, size, weight }), className)} {...props}>
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

export { Text, textVariants };
