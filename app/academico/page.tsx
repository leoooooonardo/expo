import type { Metadata } from "next"
import { CalendarDays, Clock, LifeBuoy, MonitorPlay, BookMarked, Utensils } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { SeccionPanel } from "@/components/seccion-panel"

export const metadata: Metadata = {
  title: 'Académico | IPET 249 "Nicolás Copérnico"',
  description:
    "Calendario escolar, horarios por año, tutorías, Classroom, tercera materia y PAICOR del IPET 249.",
}

const ACCESOS = [
  {
    href: "/academico/calendario",
    titulo: "Calendario escolar",
    descripcion: "Fechas, feriados y actividades del ciclo lectivo",
    icon: CalendarDays,
  },
  {
    href: "/academico/horarios",
    titulo: "Horarios por año",
    descripcion: "Cursado de cada año y especialidad",
    icon: Clock,
  },
  {
    href: "/academico/tutorias",
    titulo: "Tutorías",
    descripcion: "Apoyo y acompañamiento académico",
    icon: LifeBuoy,
  },
  {
    href: "/academico/classroom",
    titulo: "Classroom / exámenes",
    descripcion: "Aulas virtuales y calendario de evaluaciones",
    icon: MonitorPlay,
  },
  {
    href: "/academico/tercer-materia",
    titulo: "Tercera materia",
    descripcion: "Instancias para regularizar materias pendientes",
    icon: BookMarked,
  },
  {
    href: "/academico/paicor",
    titulo: "PAICOR",
    descripcion: "Programa de asistencia integral de Córdoba",
    icon: Utensils,
  },
]

export default function AcademicoPage() {
  return (
    <main>
      <PageHero
        etiqueta="ACADÉMICO"
        titulo="Vida académica"
        descripcion="Calendario, horarios, tutorías y todo lo que necesitás para organizar tu cursado en el IPET 249."
        migas={[{ label: "Inicio", href: "/" }, { label: "Académico" }]}
      />
      <SeccionPanel accesos={ACCESOS} />
    </main>
  )
}
