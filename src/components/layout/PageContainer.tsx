import { cn } from '@/lib/utils'

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn('min-h-screen animate-fade-in space-y-6 p-6 lg:p-8', className)}>
      {children}
    </div>
  )
}
