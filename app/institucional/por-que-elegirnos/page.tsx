import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { PorqueElegirnos } from "@/components/institucional/porque-elegirnos"

export const metadata: Metadata = {
  title: 'Por qué elegirnos | IPET 249 "Nicolás Copérnico"',
  description: "Formación técnica con salida laboral, acompañamiento humano y una comunidad que sostiene cada trayectoria.",
}

export default function PorQueElegirnosPage() {
  return (
    <main>
      <PageHero
        etiqueta="INSTITUCIONAL"
        titulo="Por qué elegirnos"
        migas={[
          { label: "Inicio", href: "/" },
          { label: "Institucional", href: "/institucional" },
          { label: "Por qué elegirnos" },
        ]}
      />
      <PorqueElegirnos />
    </main>
  )
}
