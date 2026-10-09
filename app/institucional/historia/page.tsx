import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { Institucional } from "@/components/institucional"

export const metadata: Metadata = {
  title: 'Historia | IPET 249 "Nicolás Copérnico"',
  description: "La historia del IPET 249 desde su fundación como Escuela Fábrica de la Nación N° 23.",
}

export default function HistoriaPage() {
  return (
    <main>
      <PageHero
        etiqueta="INSTITUCIONAL"
        titulo="Historia"
        descripcion="Más de 75 años de formación técnica en Córdoba."
        migas={[
          { label: "Inicio", href: "/" },
          { label: "Institucional", href: "/institucional" },
          { label: "Historia" },
        ]}
      />
      <Institucional />
    </main>
  )
}
