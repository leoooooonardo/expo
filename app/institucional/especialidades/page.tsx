import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { Especialidades } from "@/components/especialidades"

export const metadata: Metadata = {
  title: 'Especialidades | IPET 249 "Nicolás Copérnico"',
  description: "Automotores, Informática, Mecánica y Electrónica: las especialidades técnicas del IPET 249.",
}

export default function EspecialidadesPage() {
  return (
    <main>
      <PageHero
        etiqueta="INSTITUCIONAL"
        titulo="Especialidades"
        descripcion="Las orientaciones técnicas que se cursan en el IPET 249."
        migas={[
          { label: "Inicio", href: "/" },
          { label: "Institucional", href: "/institucional" },
          { label: "Especialidades" },
        ]}
      />
      <Especialidades />
    </main>
  )
}
