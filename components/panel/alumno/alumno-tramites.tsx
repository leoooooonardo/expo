"use client"

import { useState } from "react"
import Link from "next/link"
import {
  FileCheck,
  Download,
  CheckCircle2,
  Trophy,
  Briefcase,
  ExternalLink,
  Clock,
  Sparkles,
} from "lucide-react"
import { OPORTUNIDADES } from "@/lib/data/oportunidades"

export function AlumnoTramites() {
  const [descargado, setDescargado] = useState(false)

  const simularDescargaCertificado = () => {
    setDescargado(true)
    setTimeout(() => setDescargado(false), 3000)
  }

  // Filtrar oportunidades escolares para alumnos (convocatorias, torneos y becas, excluyendo pasantías y búsquedas laborales externas)
  const oportunidadesAlumno = OPORTUNIDADES.filter(
    (o) =>
      (o.roles.includes("alumno") || o.roles.length === 0) &&
      o.tipo !== "pasantia" &&
      o.tipo !== "empleo",
  )

  return (
    <div className="space-y-6">
      {/* Sección 1: Emisión de Certificado Rápido */}
      <div
        className="rounded-2xl border p-6 shadow-xs"
        style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-bold"
              style={{ backgroundColor: "rgba(212, 167, 44, 0.15)", color: "var(--gold-primary)" }}
            >
              <FileCheck className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                Certificado de Alumno Regular
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Constancia oficial digital para presentar ante ANSES, boletos de transporte estudiantil o cobertura médica.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={simularDescargaCertificado}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-transform hover:scale-105 active:scale-95 shrink-0"
            style={{ backgroundColor: "var(--red-oxide)" }}
          >
            {descargado ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Generando constancia...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Descargar Constancia Digital (PDF)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sección 2: Convocatorias, Torneos y Becas Escolares */}
      <div
        className="rounded-2xl border p-6 shadow-xs"
        style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
      >
        <div className="mb-4">
          <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
            Convocatorias e Inscripciones Abiertas
          </h3>
          <p className="text-xs text-neutral-500">
            Postulate directamente online a competencias técnicas, deportes o becas escolares.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {oportunidadesAlumno.map((op) => (
            <div
              key={op.id}
              className="rounded-2xl border p-5 shadow-xs flex flex-col justify-between gap-4 transition-all hover:border-[var(--gold-primary)]"
              style={{ backgroundColor: "var(--surface-light)", borderColor: "var(--border-color)" }}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-md px-2 py-0.5 text-[10px] font-mono uppercase font-bold bg-amber-100 text-amber-800">
                    {op.tipo}
                  </span>
                  {op.cierre && (
                    <span className="text-[11px] font-mono text-neutral-500">
                      Cierre: {op.cierre}
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold mt-2" style={{ color: "var(--text-primary)" }}>
                  {op.titulo}
                </h4>
                <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
                  {op.descripcion}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "var(--border-color)" }}>
                <span className="text-[11px] font-mono text-neutral-500">
                  {op.organizacion}
                </span>

                <Link
                  href={`/oportunidades/convocatorias/${op.id}/inscripcion`}
                  className="inline-flex items-center gap-1 text-xs font-bold hover:underline"
                  style={{ color: "var(--red-oxide)" }}
                >
                  Inscribirse online →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
