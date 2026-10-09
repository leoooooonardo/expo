import { CalendarClock, ChevronDown, Clock } from "lucide-react"
import { HORARIO_INSCRIPCION, INSCRIPCIONES_OTROS_ANIOS } from "@/lib/data/admisiones"
import { formatearRango } from "@/lib/data/calendario"

export function InscripcionesOtrosAnios() {
  return (
    <div className="space-y-3">
      {INSCRIPCIONES_OTROS_ANIOS.map((item) => (
        <details
          key={item.anio}
          className="group rounded-lg overflow-hidden"
          style={{ backgroundColor: "var(--surface-light)", borderWidth: "1px", borderColor: "var(--border-color)" }}
        >
          <summary
            className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-bold [&::-webkit-details-marker]:hidden"
            style={{ color: "var(--text-primary)" }}
          >
            <span>{item.anio}</span>
            <span className="flex items-center gap-3">
              <span
                className="hidden sm:inline text-sm font-mono font-semibold"
                style={{ color: "var(--gold-primary)" }}
              >
                {formatearRango(item.desde, item.hasta)}
              </span>
              <ChevronDown
                className="w-5 h-5 transition-transform group-open:rotate-180"
                style={{ color: "var(--red-oxide)" }}
                aria-hidden="true"
              />
            </span>
          </summary>
          <div
            className="space-y-3 px-5 pb-5 pt-4"
            style={{ borderTopWidth: "1px", borderColor: "var(--border-color)" }}
          >
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {item.detalle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm font-mono font-semibold">
              <span className="inline-flex items-center gap-2" style={{ color: "var(--gold-primary)" }}>
                <CalendarClock className="w-4 h-4" aria-hidden="true" />
                {formatearRango(item.desde, item.hasta)}
              </span>
              <span className="inline-flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <Clock className="w-4 h-4" aria-hidden="true" />
                {HORARIO_INSCRIPCION}
              </span>
            </div>
          </div>
        </details>
      ))}
    </div>
  )
}
