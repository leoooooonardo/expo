import type { Metadata } from "next"
import { CalendarDays, Trophy } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { SeccionPanel } from "@/components/seccion-panel"

export const metadata: Metadata = {
  title: 'Vida escolar | IPET 249 "Nicolás Copérnico"',
  description:
    "Eventos, actos, muestras y torneo de deportes del IPET 249: Expo IPET, Recrearte, Feria de Ciencias y más.",
}

const ACCESOS = [
  {
    href: "/vida-escolar/eventos",
    titulo: "Eventos",
    descripcion: "Muestras, actos y jornadas del año",
    icon: CalendarDays,
  },
  {
    href: "/vida-escolar/deportes",
    titulo: "Deportes",
    descripcion: "Torneo interno y disciplinas deportivas",
    icon: Trophy,
  },
]

export default function VidaEscolarPage() {
  return (
    <main>
      <PageHero
        etiqueta="VIDA ESCOLAR"
        titulo="Vida escolar y deportes"
        descripcion="Todo lo que pasa más allá del aula: muestras, actos, jornadas recreativas y el torneo interno de deportes que integra a toda la comunidad."
        migas={[{ label: "Inicio", href: "/" }, { label: "Vida escolar" }]}
      />
      <SeccionPanel accesos={ACCESOS} />
    </main>
  )
}
