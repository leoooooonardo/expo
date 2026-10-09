import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { InfoSection } from "@/components/info-section"
import { HIGIENE_SEGURIDAD } from "@/lib/data/comunidad"

export const metadata: Metadata = {
  title: 'Tecnicatura de Higiene y Seguridad | IPET 249 "Nicolás Copérnico"',
  description:
    "Tecnicatura de Higiene y Seguridad del IPET 249: formación para prevenir riesgos y promover entornos de trabajo seguros.",
}

export default function HigieneSeguridadPage() {
  return (
    <main>
      <PageHero
        etiqueta="COMUNIDAD"
        titulo="Tecnicatura de Higiene y Seguridad"
        descripcion="Formación para prevenir riesgos, cuidar la salud y promover entornos de trabajo seguros."
        migas={[
          { label: "Inicio", href: "/" },
          { label: "Comunidad", href: "/comunidad" },
          { label: "Higiene y Seguridad" },
        ]}
      />
      <InfoSection
        intro={HIGIENE_SEGURIDAD.intro}
        bloques={HIGIENE_SEGURIDAD.bloques}
        datos={HIGIENE_SEGURIDAD.datos}
      />
    </main>
  )
}
