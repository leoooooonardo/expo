import type { Metadata } from "next"
import { Calendar } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { NOTICIAS } from "@/lib/data/noticias"

export const metadata: Metadata = {
  title: 'Noticias | IPET 249 "Nicolás Copérnico"',
  description:
    "Todas las noticias recientes del IPET 249: convocatorias, actividades académicas y eventos de la institución.",
}

export default function NoticiasPage() {
  return (
    <main>
      <PageHero
        etiqueta="NOTICIAS"
        titulo="Todas las noticias"
        descripcion="Novedades, convocatorias y actividades recientes de la comunidad del IPET 249."
        migas={[{ label: "Inicio", href: "/" }, { label: "Noticias" }]}
      />
      <section className="section-padding" style={{ backgroundColor: "var(--bg-white)" }}>
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NOTICIAS.map((item) => (
            <article
              key={item.id}
              className="flex flex-col p-6 rounded-lg"
              style={{ backgroundColor: "var(--surface-light)", border: "1px solid var(--border-color)" }}
            >
              <span
                className="self-start px-3 py-1 text-xs font-mono font-medium rounded mb-4"
                style={{ backgroundColor: "rgba(161, 58, 46, 0.1)", color: "var(--red-oxide)" }}
              >
                {item.category}
              </span>
              <h2 className="text-xl font-bold mb-3 text-balance" style={{ color: "var(--text-primary)" }}>
                {item.title}
              </h2>
              <div className="flex items-center gap-2 text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                <Calendar className="w-4 h-4" style={{ color: "var(--gold-primary)" }} aria-hidden="true" />
                <time className="font-mono">{item.date}</time>
              </div>
              <p className="text-pretty" style={{ color: "var(--text-secondary)" }}>
                {item.excerpt}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
