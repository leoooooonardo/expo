import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { EventosView } from "@/components/vida-escolar/vida-escolar-view"

export const metadata: Metadata = {
  title: 'Eventos | IPET 249 "Nicolás Copérnico"',
  description: "Muestras, actos y jornadas del IPET 249: Expo IPET, Recrearte, Feria de Ciencias y más.",
}

export default function EventosPage() {
  return (
    <main>
      <PageHero
        etiqueta="VIDA ESCOLAR"
        titulo="Eventos"
        descripcion="Muestras, actos y jornadas que marcan el ritmo de la escuela durante todo el año."
        migas={[
          { label: "Inicio", href: "/" },
          { label: "Vida escolar", href: "/vida-escolar" },
          { label: "Eventos" },
        ]}
      />
      <EventosView />
    </main>
  )
}
