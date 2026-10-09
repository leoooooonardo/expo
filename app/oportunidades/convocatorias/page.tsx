import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { OportunidadesView } from "@/components/oportunidades/oportunidades-view"

export const metadata: Metadata = {
  title: 'Convocatorias y becas | IPET 249 "Nicolás Copérnico"',
  description:
    "Convocatorias, becas y olimpiadas para la comunidad del IPET 249. Filtrá por tipo, rol y año.",
}

export default function ConvocatoriasPage() {
  return (
    <main>
      <PageHero
        etiqueta="OPORTUNIDADES"
        titulo="Convocatorias y becas"
        descripcion="Becas, olimpiadas y convocatorias con plazos concretos. Filtrá por tipo y ajustá el rol o el año desde el menú superior."
        migas={[
          { label: "Inicio", href: "/" },
          { label: "Oportunidades", href: "/oportunidades" },
          { label: "Convocatorias y becas" },
        ]}
      />
      <OportunidadesView tiposVisibles={["convocatoria", "beca", "olimpiada"]} />
    </main>
  )
}
