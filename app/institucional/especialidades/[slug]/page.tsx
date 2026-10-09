import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { especialidades, getEspecialidad } from "@/lib/data/especialidades"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return especialidades.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const esp = getEspecialidad(slug)
  if (!esp) return { title: 'Especialidad | IPET 249 "Nicolás Copérnico"' }
  return {
    title: `${esp.nombre} | IPET 249 "Nicolás Copérnico"`,
    description: esp.resumen,
  }
}

function ListaCheck({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <Check
            className="w-5 h-5 mt-0.5 shrink-0"
            style={{ color: "var(--red-oxide)" }}
            aria-hidden="true"
          />
          <span style={{ color: "var(--foreground-secondary)" }} className="leading-relaxed">
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

function Bloque({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div
      className="p-8 rounded"
      style={{ backgroundColor: "var(--surface)", borderWidth: "2px", borderColor: "var(--border)" }}
    >
      <h2
        className="text-xl font-display font-bold mb-5"
        style={{ color: "var(--black-primary)" }}
      >
        {titulo}
      </h2>
      {children}
    </div>
  )
}

export default async function EspecialidadPage({ params }: Props) {
  const { slug } = await params
  const esp = getEspecialidad(slug)
  if (!esp) notFound()

  const otras = especialidades.filter((e) => e.slug !== esp.slug)

  return (
    <main>
      <PageHero
        etiqueta="ESPECIALIDADES"
        titulo={esp.nombre}
        descripcion={esp.titulo}
        migas={[
          { label: "Inicio", href: "/" },
          { label: "Institucional", href: "/institucional" },
          { label: "Especialidades", href: "/institucional/especialidades" },
          { label: esp.nombre },
        ]}
      />

      <section className="section-padding" style={{ backgroundColor: "var(--surface-alt)" }}>
        <div className="container-max space-y-12">
          <Link
            href="/institucional/especialidades"
            className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: "var(--red-oxide)" }}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Volver a especialidades
          </Link>

          <div className="space-y-4 max-w-3xl">
            <h2
              className="text-3xl md:text-4xl font-display font-bold"
              style={{ color: "var(--black-primary)" }}
            >
              Sobre la especialidad
            </h2>
            {esp.presentacion.map((parrafo) => (
              <p
                key={parrafo}
                className="text-lg leading-relaxed"
                style={{ color: "var(--foreground-secondary)" }}
              >
                {parrafo}
              </p>
            ))}
          </div>

          <div className="space-y-6">
            <h2
              className="text-2xl font-display font-bold"
              style={{ color: "var(--black-primary)" }}
            >
              Qué se aprende
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {esp.queAprenden.map((item) => (
                <div
                  key={item.titulo}
                  className="p-6 rounded"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderWidth: "2px",
                    borderColor: "var(--border)",
                  }}
                >
                  <h3
                    className="font-display font-bold mb-2"
                    style={{ color: "var(--black-primary)" }}
                  >
                    {item.titulo}
                  </h3>
                  <p style={{ color: "var(--foreground-secondary)" }} className="leading-relaxed">
                    {item.detalle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {esp.tramos.map((tramo) => (
              <div
                key={tramo.etapa}
                className="p-6 rounded"
                style={{
                  background: "rgba(212, 167, 44, 0.06)",
                  borderWidth: "2px",
                  borderColor: "var(--gold-primary)",
                }}
              >
                <h3
                  className="font-display font-bold mb-2"
                  style={{ color: "var(--black-primary)" }}
                >
                  {tramo.etapa}
                </h3>
                <p style={{ color: "var(--foreground-secondary)" }} className="leading-relaxed">
                  {tramo.descripcion}
                </p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Bloque titulo="Salida laboral">
              <ListaCheck items={esp.salidaLaboral} />
            </Bloque>
            <Bloque titulo="Continuar estudios">
              <ListaCheck items={esp.continuarEstudios} />
            </Bloque>
            <Bloque titulo="Espacios y equipamiento">
              <ListaCheck items={esp.espacios} />
            </Bloque>
            <Bloque titulo="Perfil del estudiante">
              <ListaCheck items={esp.perfil} />
            </Bloque>
          </div>

          <div
            className="p-8 rounded"
            style={{
              background: "rgba(212, 167, 44, 0.06)",
              borderWidth: "2px",
              borderColor: "var(--gold-primary)",
            }}
          >
            <h2 className="font-display font-bold mb-3" style={{ color: "var(--black-primary)" }}>
              Título otorgado
            </h2>
            <p style={{ color: "var(--foreground-secondary)" }} className="leading-relaxed">
              Los egresados reciben el título de <strong>{esp.titulo}</strong> de nivel secundario,
              con validez nacional.
            </p>
          </div>

          <div className="space-y-4">
            <h2
              className="text-xl font-display font-bold"
              style={{ color: "var(--black-primary)" }}
            >
              Otras especialidades
            </h2>
            <div className="flex flex-wrap gap-3">
              {otras.map((otra) => (
                <Link
                  key={otra.slug}
                  href={`/institucional/especialidades/${otra.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded font-medium text-sm transition-shadow hover:shadow-md"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderWidth: "2px",
                    borderColor: "var(--border)",
                    color: "var(--black-primary)",
                  }}
                >
                  {otra.nombre}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" style={{ color: "var(--red-oxide)" }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
