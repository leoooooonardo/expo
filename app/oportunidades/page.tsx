import type { Metadata } from "next"
import { Award, Briefcase, Handshake } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { SeccionPanel } from "@/components/seccion-panel"

export const metadata: Metadata = {
  title: 'Oportunidades | IPET 249 "Nicolás Copérnico"',
  description:
    "Convocatorias, becas, olimpiadas, pasantías y búsquedas laborales para la comunidad del IPET 249.",
}

const ACCESOS = [
  {
    href: "/oportunidades/convocatorias",
    titulo: "Convocatorias y becas",
    descripcion: "Becas, olimpiadas y convocatorias con plazos",
    icon: Award,
  },
  {
    href: "/oportunidades/pasantias",
    titulo: "Pasantías",
    descripcion: "Prácticas profesionalizantes en talleres y empresas",
    icon: Handshake,
  },
  {
    href: "/oportunidades/empleo",
    titulo: "Empleo",
    descripcion: "Búsquedas laborales para estudiantes y egresados",
    icon: Briefcase,
  },
]

export default function OportunidadesPage() {
  return (
    <main>
      <PageHero
        etiqueta="OPORTUNIDADES"
        titulo="Convocatorias, becas y empleo"
        descripcion="Oportunidades con plazos concretos para estudiantes y docentes: becas, olimpiadas, convocatorias, pasantías y empleo."
        migas={[{ label: "Inicio", href: "/" }, { label: "Oportunidades" }]}
      />
      <SeccionPanel accesos={ACCESOS} />
    </main>
  )
}
