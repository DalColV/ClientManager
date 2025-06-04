import type * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/app/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-w-16 text-center',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-green-300 text-black hover:bg-emerald-700',
        secondary:
          'border-transparent bg-slate-400 text-black hover:bg-slate-700',
        destructive:
          'border-transparent bg-red-600 text-black hover:bg-red-700',
        outline: 'text-slate-800 border-slate-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
