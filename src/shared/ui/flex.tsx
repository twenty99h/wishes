import { cn } from '@/shared/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { HTMLAttributes, forwardRef } from 'react';

const flexVariants = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      column: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    wrap: {
      nowrap: 'flex-nowrap',
      wrap: 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse',
    },
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
    },
    grow: {
      0: 'grow-0',
      1: 'grow',
    },
    shrink: {
      0: 'shrink-0',
      1: 'shrink',
    },
  },
  defaultVariants: {
    direction: 'row',
    align: 'start',
    justify: 'start',
    wrap: 'nowrap',
    gap: 0,
  },
});

export interface FlexProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof flexVariants> {
  inline?: boolean;
}

const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ className, direction, align, justify, wrap, gap, grow, shrink, inline, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          flexVariants({ direction, align, justify, wrap, gap, grow, shrink }),
          inline && 'inline-flex',
          className
        )}
        {...props}
      />
    );
  }
);

Flex.displayName = 'Flex';

export { Flex, flexVariants };
