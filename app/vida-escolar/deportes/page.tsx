import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { DeportesView } from "@/components/vida-escolar/vida-escolar-view"

export const metadata: Metadata = {
  title: 'Deportes | IPET 249 "Nicolás Copérnico"',
  description: "Torneo interno de deportes y disciplinas del IPET 249.",
}

export default function DeportesPage() {
  return (
    <main>
      <PageHero
        etiqueta="VIDA ESCOLAR"
        titulo="Deportes"
        descripcion="El torneo interno de deportes que integra a toda la comunidad y las disciplinas que se practican en la escuela."
        migas={[
          { label: "Inicio", href: "/" },
          { label: "Vida escolar", href: "/vida-escolar" },
          { label: "Deportes" },
        ]}
      />
      <DeportesView />
    </main>
  )
}
