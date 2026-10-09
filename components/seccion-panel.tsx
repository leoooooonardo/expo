import Link from "next/link"
import { ArrowRight, type LucideIcon } from "lucide-react"

export interface AccesoSeccion {
  href: string
  titulo: string
  descripcion: string
  icon: LucideIcon
}

export function SeccionPanel({ accesos }: { accesos: AccesoSeccion[] }) {
  return (
    <section className="section-padding" style={{ backgroundColor: "var(--bg-white)" }}>
      <div className="mx-auto max-w-6xl grid sm:grid-cols-2 gap-4">
        {accesos.map((a) => {
          const Icon = a.icon
          return (
            <Link
              key={a.href}
              href={a.href}
              className="group flex items-center gap-4 p-5 rounded-lg transition-all hover:shadow-md"
              style={{ backgroundColor: "var(--surface-light)", border: "1px solid var(--border-color)" }}
            >
              <div
                className="flex items-center justify-center w-11 h-11 rounded-lg flex-shrink-0"
                style={{ backgroundColor: "rgba(212, 167, 44, 0.14)", color: "var(--gold-primary)" }}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h2 className="font-bold leading-snug" style={{ color: "var(--text-primary)" }}>
                  {a.titulo}
                </h2>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {a.descripcion}
                </p>
              </div>
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                style={{ color: "var(--gold-primary)" }}
                aria-hidden="true"
              />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
