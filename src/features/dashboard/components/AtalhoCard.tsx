import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function AtalhoCard({
    href,
    icon,
    titulo,
    descricao,
    iconBgClass,
}: {
    href: string
    icon: React.ReactNode
    titulo: string
    descricao: string
    iconBgClass: string
}) {
    return (
        <Link href={href} className="block">
            <Card className="rounded-xl border border-campo-600/50 bg-campo-800 transition-all hover:border-campo-500">
                <CardContent className="flex items-center gap-4 p-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBgClass}`}>
                        {icon}
                    </div>

                    <div>
                        <p className="font-display font-bold text-slate-100">{titulo}</p>
                        <p className="text-xs text-slate-500">{descricao}</p>
                    </div>

                    <ArrowRight className="ml-auto h-4 w-4 text-slate-600" />
                </CardContent>
            </Card>
        </Link>
    )
}