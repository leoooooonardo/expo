import type { Metadata } from "next"
import { HeartHandshake, GraduationCap, ShieldCheck } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { SeccionPanel } from "@/components/seccion-panel"

export const metadata: Metadata = {
  title: 'Comunidad | IPET 249 "Nicolás Copérnico"',
  description:
    "La comunidad educativa del IPET 249: Asociación Cooperadora, Programa de Inclusión y Terminalidad (PIT) y Tecnicatura de Higiene y Seguridad.",
}

const ACCESOS = [
  {
    href: "/comunidad/cooperadora",
    titulo: "Cooperadora",
    descripcion: "Recursos, mejoras y cómo colaborar con la escuela",
    icon: HeartHandshake,
  },
  {
    href: "/comunidad/pit",
    titulo: "PIT",
    descripcion: "Programa de Inclusión y Terminalidad para jóvenes de 14 a 17 años",
    icon: GraduationCap,
  },
  {
    href: "/comunidad/higiene-y-seguridad",
    titulo: "Tecnicatura de Higiene y Seguridad",
    descripcion: "Formación en prevención de riesgos y seguridad en el trabajo",
    icon: ShieldCheck,
  },
]

export default function ComunidadPage() {
  return (
    <main>
      <PageHero
        etiqueta="COMUNIDAD"
        titulo="Comunidad educativa"
        descripcion="Familias, docentes y programas que acompañan las trayectorias de cada estudiante del IPET 249."
        migas={[{ label: "Inicio", href: "/" }, { label: "Comunidad" }]}
      />
      <SeccionPanel accesos={ACCESOS} />
    </main>
  )
}
