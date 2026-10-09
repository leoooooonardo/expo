import type { Metadata } from "next"
import { History, Cog, Users, MapPin, GraduationCap, Award } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { SeccionPanel } from "@/components/seccion-panel"

export const metadata: Metadata = {
  title: 'Institucional | IPET 249 "Nicolás Copérnico"',
  description:
    "Historia, especialidades, equipo, mapa y promociones del IPET 249. Conocé por qué somos la mejor opción de formación técnica en Córdoba.",
}

const ACCESOS = [
  { href: "/institucional/historia", titulo: "Historia", descripcion: "Más de 75 años de formación técnica", icon: History },
  { href: "/institucional/especialidades", titulo: "Especialidades", descripcion: "Las orientaciones técnicas que ofrecemos", icon: Cog },
  { href: "/institucional/equipo", titulo: "Equipo", descripcion: "Directivos, preceptores y profesores", icon: Users },
  { href: "/institucional/mapa", titulo: "Mapa del colegio", descripcion: "Sectores y ubicación", icon: MapPin },
  { href: "/institucional/promociones", titulo: "Promociones", descripcion: "Egresados por cohorte", icon: GraduationCap },
  { href: "/institucional/por-que-elegirnos", titulo: "Por qué elegirnos", descripcion: "Lo que nos distingue como escuela técnica", icon: Award },
]

export default function InstitucionalPage() {
  return (
    <main>
      <PageHero
        etiqueta="INSTITUCIONAL"
        titulo="Sobre el IPET 249"
        descripcion="Más de 75 años de formación técnica en Córdoba. Conocé nuestra historia, especialidades y al equipo que hace posible cada trayectoria."
        migas={[{ label: "Inicio", href: "/" }, { label: "Institucional" }]}
      />
      <SeccionPanel accesos={ACCESOS} />
    </main>
  )
}
