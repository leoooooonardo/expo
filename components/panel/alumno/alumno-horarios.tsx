"use client"

import { Clock, MapPin, User, CalendarDays } from "lucide-react"
import { HORARIOS, DIAS } from "@/lib/data/horarios"
import { ALUMNO_DEMO_DATA } from "../panel-mock-data"

export function AlumnoHorarios() {
  // Tomamos el horario del curso del estudiante (4° A Informática)
  const horarioAlumno = HORARIOS.find((h) => h.id === "4a-info") ?? HORARIOS[0]

  return (
    <div className="space-y-6">
      <div
        className="rounded-2xl border p-5 shadow-xs"
        style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
              Horario Semanal de Clases y Laboratorios
            </h3>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Curso: {ALUMNO_DEMO_DATA.curso} · Especialidad {ALUMNO_DEMO_DATA.especialidad} · Turno {ALUMNO_DEMO_DATA.turno}
            </p>
          </div>
          <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-800">
            Ciclo Lectivo 2026
          </span>
        </div>
      </div>

      {/* Grilla Semanal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {DIAS.map((dia) => {
          const materiasDia = horarioAlumno.franjas.filter((f) => f.dia === dia)
          return (
            <div
              key={dia}
              className="rounded-2xl border p-4 shadow-xs flex flex-col gap-3"
              style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
            >
              <div
                className="pb-2.5 border-b text-center font-bold text-xs uppercase tracking-wider"
                style={{ borderColor: "var(--border-color)", color: "var(--red-oxide)" }}
              >
                {dia}
              </div>

              {materiasDia.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono text-neutral-400">
                  Sin clases
                </div>
              ) : (
                materiasDia.map((m, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border p-3 space-y-1.5 transition-all hover:border-[var(--gold-primary)]"
                    style={{ backgroundColor: "var(--surface-light)", borderColor: "var(--border-color)" }}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono font-bold" style={{ color: "var(--gold-primary)" }}>
                      <span>{m.desde} - {m.hasta}</span>
                      {m.aula && (
                        <span className="rounded bg-neutral-200 px-1.5 py-0.2 text-[10px] text-neutral-700">
                          {m.aula}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
                      {m.materia}
                    </p>
                    {m.profesor && (
                      <p className="text-[11px] text-neutral-500 flex items-center gap-1">
                        <User className="w-3 h-3 text-neutral-400" />
                        {m.profesor}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
