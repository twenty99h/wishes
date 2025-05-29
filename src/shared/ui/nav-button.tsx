import { VariantProps } from 'class-variance-authority';
import { Link, LinkProps } from 'react-router';
import { cn } from '@/shared/lib/utils';
import { Button, buttonVariants } from './button';

type NavButtonProps = React.ComponentProps<'button'> &
  LinkProps &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function NavButton({ variant, size, className, to, children, ...props }: NavButtonProps) {
  return (
    <Button className={cn(buttonVariants({ variant, size, className }))} asChild {...props}>
      <Link className="text-inherit" to={to}>
        {children}
      </Link>
    </Button>
  );
}

export { NavButton };
