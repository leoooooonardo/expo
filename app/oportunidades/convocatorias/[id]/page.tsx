import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Building2, CalendarClock, Check, ExternalLink, LifeBuoy, PenLine } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import {
  OPORTUNIDADES,
  diasRestantes,
  formatearCierre,
  getOportunidad,
  permiteInscripcionOnline,
  tieneDetalle,
  tipoOportunidadInfo,
} from "@/lib/data/oportunidades"

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return OPORTUNIDADES.filter(tieneDetalle).map((o) => ({ id: o.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const o = getOportunidad(id)
  if (!o) return { title: 'Convocatorias | IPET 249 "Nicolás Copérnico"' }
  return {
    title: `${o.titulo} | IPET 249 "Nicolás Copérnico"`,
    description: o.descripcion,
  }
}

function Bloque({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div
      className="p-8 rounded"
      style={{ backgroundColor: "var(--surface)", borderWidth: "2px", borderColor: "var(--border)" }}
    >
      <h2 className="text-xl font-display font-bold mb-5" style={{ color: "var(--black-primary)" }}>
        {titulo}
      </h2>
      {children}
    </div>
  )
}

export default async function OportunidadDetallePage({ params }: Props) {
  const { id } = await params
  const o = getOportunidad(id)
  if (!o || !tieneDetalle(o)) notFound()

  const info = tipoOportunidadInfo(o.tipo)
  const dias = o.cierre ? diasRestantes(o.cierre) : null
  const cerrada = dias !== null && dias < 0
  const online = permiteInscripcionOnline(o)

  return (
    <main>
      <PageHero
        etiqueta={info.label.replace(/s$/, "").toUpperCase()}
        titulo={o.titulo}
        descripcion={o.organizacion}
        migas={[
          { label: "Inicio", href: "/" },
          { label: "Oportunidades", href: "/oportunidades" },
          { label: "Convocatorias y becas", href: "/oportunidades/convocatorias" },
          { label: o.titulo },
        ]}
      />

      <section className="section-padding" style={{ backgroundColor: "var(--surface-alt)" }}>
        <div className="container-max space-y-10">
          <Link
            href="/oportunidades/convocatorias"
            className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: "var(--red-oxide)" }}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Volver a convocatorias y becas
          </Link>

          <div className="space-y-4 max-w-3xl">
            <p className="text-lg leading-relaxed" style={{ color: "var(--foreground-secondary)" }}>
              {o.descripcion}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: "var(--foreground-secondary)" }}>
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="w-4 h-4" aria-hidden="true" />
                {o.organizacion}
              </span>
              {o.cierre && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarClock className="w-4 h-4" aria-hidden="true" />
                  {cerrada ? "Cerró el" : "Cierra el"} {formatearCierre(o.cierre)}
                </span>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {o.requisitos && o.requisitos.length > 0 && (
              <Bloque titulo="Requisitos">
                <ul className="space-y-3">
                  {o.requisitos.map((r) => (
                    <li key={r} className="flex items-start gap-3">
                      <Check className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "var(--red-oxide)" }} aria-hidden="true" />
                      <span className="leading-relaxed" style={{ color: "var(--foreground-secondary)" }}>
                        {r}
                      </span>
                    </li>
                  ))}
                </ul>
              </Bloque>
            )}

            {o.contacto && (
              <Bloque titulo="Consultas">
                <p className="flex items-start gap-3 leading-relaxed" style={{ color: "var(--foreground-secondary)" }}>
                  <LifeBuoy className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "var(--red-oxide)" }} aria-hidden="true" />
                  {o.contacto}
                </p>
              </Bloque>
            )}
          </div>

          {o.pasos && o.pasos.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold" style={{ color: "var(--black-primary)" }}>
                Cómo inscribirse
              </h2>
              <ol className="grid md:grid-cols-2 gap-6">
                {o.pasos.map((paso, i) => (
                  <li
                    key={paso}
                    className="flex items-start gap-4 p-6 rounded"
                    style={{
                      background: "rgba(212, 167, 44, 0.06)",
                      borderWidth: "2px",
                      borderColor: "var(--gold-primary)",
                    }}
                  >
                    <span
                      className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 text-sm font-bold"
                      style={{ backgroundColor: "var(--black-primary)", color: "#FFFFFF" }}
                    >
                      {i + 1}
                    </span>
                    <span className="leading-relaxed" style={{ color: "var(--foreground-secondary)" }}>
                      {paso}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4">
            {online && !cerrada && (
              <Link
                href={`/oportunidades/convocatorias/${o.id}/inscripcion`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-semibold"
                style={{ backgroundColor: "var(--red-oxide)", color: "#FFFFFF" }}
              >
                <PenLine className="w-4 h-4" aria-hidden="true" />
                Inscribirme online
              </Link>
            )}
            {online && cerrada && (
              <p className="text-sm font-medium" style={{ color: "var(--foreground-secondary)" }}>
                La inscripción online ya cerró.
              </p>
            )}
            {!online && o.link && (
              <a
                href={o.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-semibold"
                style={{ backgroundColor: "var(--black-primary)", color: "#FFFFFF" }}
              >
                Ir al sitio oficial
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
