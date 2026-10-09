import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { FormularioInscripcion } from "@/components/oportunidades/formulario-inscripcion"
import {
  OPORTUNIDADES,
  diasRestantes,
  getOportunidad,
  permiteInscripcionOnline,
} from "@/lib/data/oportunidades"

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return OPORTUNIDADES.filter(permiteInscripcionOnline).map((o) => ({ id: o.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const o = getOportunidad(id)
  return {
    title: `Inscripción: ${o?.titulo ?? "Convocatoria"} | IPET 249 "Nicolás Copérnico"`,
    description: "Inscribite online a esta convocatoria del colegio.",
  }
}

export default async function InscripcionOportunidadPage({ params }: Props) {
  const { id } = await params
  const o = getOportunidad(id)
  if (!o || !permiteInscripcionOnline(o)) notFound()

  const cerrada = o.cierre ? diasRestantes(o.cierre) < 0 : false

  return (
    <main>
      <PageHero
        etiqueta="INSCRIPCIÓN ONLINE"
        titulo={o.titulo}
        descripcion="Completá tus datos para anotarte. El colegio te va a contactar para confirmar tu lugar."
        migas={[
          { label: "Inicio", href: "/" },
          { label: "Oportunidades", href: "/oportunidades" },
          { label: "Convocatorias y becas", href: "/oportunidades/convocatorias" },
          { label: o.titulo, href: `/oportunidades/convocatorias/${o.id}` },
          { label: "Inscripción" },
        ]}
      />

      <section className="section-padding" style={{ backgroundColor: "var(--surface-alt)" }}>
        <div className="container-max max-w-2xl space-y-8">
          <Link
            href={`/oportunidades/convocatorias/${o.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: "var(--red-oxide)" }}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Volver a la información
          </Link>

          {cerrada ? (
            <p
              className="p-6 rounded"
              style={{
                backgroundColor: "var(--surface)",
                borderWidth: "2px",
                borderColor: "var(--border)",
                color: "var(--foreground-secondary)",
              }}
            >
              La inscripción a esta convocatoria ya cerró.
            </p>
          ) : (
            <FormularioInscripcion oportunidadId={o.id} titulo={o.titulo} />
          )}
        </div>
      </section>
    </main>
  )
}
