import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default:   'border-transparent bg-acento/20 text-acento',
        secondary: 'border-transparent bg-campo-600 text-slate-300',
        destructive:'border-transparent bg-alerta-muted text-alerta',
        outline:   'border-campo-500 text-slate-300',
        gol:       'border-transparent bg-gol-muted text-gol',
        success:   'border-transparent bg-acento-muted text-acento-light',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
