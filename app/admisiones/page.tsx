import type { Metadata } from "next"
import { ClipboardList, FileCheck2 } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { SeccionPanel } from "@/components/seccion-panel"

export const metadata: Metadata = {
  title: 'Admisiones | IPET 249 "Nicolás Copérnico"',
  description:
    "Admisiones al IPET 249: pasos de inscripción, fechas clave y documentación necesaria para ingresar a primer año.",
}

const ACCESOS = [
  {
    href: "/admisiones/inscripciones",
    titulo: "Inscripciones",
    descripcion: "Pasos, fechas clave y preinscripción online",
    icon: ClipboardList,
  },
  {
    href: "/admisiones/documentacion",
    titulo: "Documentación",
    descripcion: "Checklist de los papeles a presentar",
    icon: FileCheck2,
  },
]

export default function AdmisionesPage() {
  return (
    <main>
      <PageHero
        etiqueta="ADMISIONES"
        titulo="Admisiones"
        descripcion="Todo lo que necesitás para sumarte al IPET 249: los pasos, las fechas clave del ciclo y la documentación requerida."
        migas={[{ label: "Inicio", href: "/" }, { label: "Admisiones" }]}
      />
      <SeccionPanel accesos={ACCESOS} />
    </main>
  )
}
