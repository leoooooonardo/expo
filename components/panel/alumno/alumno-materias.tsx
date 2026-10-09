"use client"

import { useState } from "react"
import {
  BookOpen,
  KeyRound,
  Copy,
  Check,
  ExternalLink,
  GraduationCap,
  Calendar,
  CheckCircle2,
} from "lucide-react"
import { ALUMNO_DEMO_DATA } from "../panel-mock-data"

export function AlumnoMaterias() {
  const [copiadoIdx, setCopiadoIdx] = useState<number | null>(null)
  const data = ALUMNO_DEMO_DATA

  const copiar = (codigo: string, idx: number) => {
    navigator.clipboard.writeText(codigo)
    setCopiadoIdx(idx)
    setTimeout(() => setCopiadoIdx(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div
        className="rounded-2xl border p-5 shadow-xs"
        style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
      >
        <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
          Mis Materias y Códigos de Aula Virtual
        </h3>
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          Utilizá los códigos para unirte a las clases en Google Classroom y consultar materiales o consignas de examen.
        </p>
      </div>

      {/* Lista de Materias y Aulas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.materias.map((mat, idx) => {
          const aulaVirtual = data.classroomCodigos[idx] ?? {
            codigo: `ipet-${mat.nombre.slice(0, 4).toLowerCase()}`,
            link: "https://classroom.google.com",
          }

          return (
            <div
              key={idx}
              className="rounded-2xl border p-5 shadow-xs flex flex-col justify-between gap-4 transition-all hover:shadow-md"
              style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-amber-100 text-amber-800 px-2 py-0.5 text-[10px] font-bold">
                    {mat.aula}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {mat.estado} (Prom: {mat.promedio})
                  </span>
                </div>

                <h4 className="text-sm font-bold mt-2" style={{ color: "var(--text-primary)" }}>
                  {mat.nombre}
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Docente a cargo: {mat.profesor}
                </p>
              </div>

              <div
                className="rounded-xl border p-3 flex items-center justify-between gap-3"
                style={{ backgroundColor: "var(--surface-light)", borderColor: "var(--border-color)" }}
              >
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[var(--gold-primary)]" />
                  <div>
                    <span className="block text-[10px] uppercase font-mono text-neutral-400">
                      Código Classroom
                    </span>
                    <span className="font-mono text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                      {aulaVirtual.codigo}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => copiar(aulaVirtual.codigo, idx)}
                    className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all hover:bg-white"
                    style={{ borderColor: "var(--border-color)", color: "var(--gold-primary)" }}
                    title="Copiar código al portapapeles"
                  >
                    {copiadoIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiadoIdx === idx ? "Copiado" : "Copiar"}</span>
                  </button>

                  <a
                    href="https://classroom.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center p-1.5 rounded-lg border text-neutral-400 hover:text-neutral-700 hover:bg-white transition-colors"
                    title="Abrir Google Classroom"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
