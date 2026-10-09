"use client"

import { useState } from "react"
import {
  GraduationCap,
  Calendar,
  Clock,
  Layers,
  KeyRound,
  Copy,
  Check,
  Building,
  Users,
  Search,
} from "lucide-react"
import { HORARIOS, MODULOS, DIAS } from "@/lib/data/horarios"
import { CLASSROOMS } from "@/lib/data/classroom"
import { ANIOS } from "@/lib/data/roles"
import type { Anio } from "@/lib/types"

export function AdminAcademico() {
  const [anioSeleccionado, setAnioSeleccionado] = useState<Anio>(4)
  const [cursoIdSeleccionado, setCursoIdSeleccionado] = useState<string>("4a-info")
  const [copiadoId, setCopiadoId] = useState<string | null>(null)

  // Cursos disponibles para el año seleccionado
  const cursosDelAnio = HORARIOS.filter((h) => h.anio === anioSeleccionado)
  const cursoActivo =
    HORARIOS.find((h) => h.id === cursoIdSeleccionado) ?? cursosDelAnio[0] ?? HORARIOS[0]

  const copiarCodigo = (codigo: string, id: string) => {
    navigator.clipboard.writeText(codigo)
    setCopiadoId(id)
    setTimeout(() => setCopiadoId(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Selector de Año y Especialidad */}
      <div
        className="rounded-2xl border p-5 shadow-xs"
        style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
              Nivel y Ciclo Técnico
            </h3>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Seleccioná un curso para consultar y administrar la distribución horaria y aulas asignadas.
            </p>
          </div>

          {/* Chips de Años (1° a 7°) */}
          <div className="flex flex-wrap gap-1.5">
            {ANIOS.map((a) => {
              const activo = a.value === anioSeleccionado
              return (
                <button
                  key={a.value}
                  type="button"
                  onClick={() => {
                    setAnioSeleccionado(a.value)
                    const primero = HORARIOS.find((h) => h.anio === a.value)
                    if (primero) setCursoIdSeleccionado(primero.id)
                  }}
                  className="rounded-xl px-3 py-1.5 text-xs font-bold transition-all"
                  style={{
                    backgroundColor: activo ? "var(--red-oxide)" : "var(--bg-light)",
                    color: activo ? "#FFFFFF" : "var(--text-secondary)",
                    borderColor: activo ? "var(--red-oxide)" : "var(--border-color)",
                    borderWidth: "1px",
                  }}
                >
                  {a.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Divisiones del Año Seleccionado */}
        {cursosDelAnio.length > 0 && (
          <div className="mt-4 pt-4 border-t flex flex-wrap items-center gap-2" style={{ borderColor: "var(--border-color)" }}>
            <span className="text-xs font-mono font-semibold text-neutral-500 mr-2">
              Divisiones registradas:
            </span>
            {cursosDelAnio.map((c) => {
              const activo = c.id === cursoActivo?.id
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCursoIdSeleccionado(c.id)}
                  className="rounded-xl px-3 py-1 text-xs font-semibold transition-all"
                  style={{
                    backgroundColor: activo ? "var(--gold-primary)" : "var(--surface-light)",
                    color: activo ? "#1A1A1A" : "var(--text-primary)",
                    borderColor: activo ? "var(--gold-primary)" : "var(--border-color)",
                    borderWidth: "1px",
                  }}
                >
                  División {c.division} {c.especialidad ? `· ${c.especialidad}` : ""} ({c.turno})
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Grilla Horaria Semanal del Curso Activo */}
      <div
        className="rounded-2xl border shadow-xs overflow-hidden"
        style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
      >
        <div className="px-6 py-4 border-b flex flex-wrap items-center justify-between gap-3" style={{ borderColor: "var(--border-color)" }}>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[var(--gold-primary)]" />
            <h3 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
              Horario Semanal: {cursoActivo.anio}° &quot;{cursoActivo.division}&quot; {cursoActivo.especialidad ?? "Ciclo Básico"}
            </h3>
            <span className="rounded px-2 py-0.5 text-[10px] font-mono bg-neutral-100 text-neutral-600 uppercase">
              Turno {cursoActivo.turno}
            </span>
          </div>
        </div>

        <div className="p-6 overflow-x-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 min-w-[700px]">
            {DIAS.map((dia) => {
              const franjasDelDia = cursoActivo.franjas.filter((f) => f.dia === dia)
              return (
                <div
                  key={dia}
                  className="rounded-xl border p-3 flex flex-col gap-2.5"
                  style={{ backgroundColor: "var(--surface-light)", borderColor: "var(--border-color)" }}
                >
                  <div className="border-b pb-2 text-center">
                    <span className="font-bold text-xs uppercase tracking-wider" style={{ color: "var(--red-oxide)" }}>
                      {dia}
                    </span>
                  </div>

                  {franjasDelDia.length === 0 ? (
                    <div className="py-6 text-center text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                      Sin módulos
                    </div>
                  ) : (
                    franjasDelDia.map((franja, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg p-2.5 border shadow-2xs space-y-1"
                        style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono font-semibold" style={{ color: "var(--gold-primary)" }}>
                          <span>{franja.desde} - {franja.hasta}</span>
                          {franja.aula && (
                            <span className="rounded bg-neutral-100 px-1 py-0.2 text-neutral-600">
                              {franja.aula}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
                          {franja.materia}
                        </p>
                        {franja.profesor && (
                          <p className="text-[11px] truncate" style={{ color: "var(--text-secondary)" }}>
                            {franja.profesor}
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
      </div>

      {/* Códigos Classroom del Área Técnica */}
      <div
        className="rounded-2xl border p-6 shadow-xs"
        style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
              Aulas Virtuales y Códigos de Classroom Activos
            </h3>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Códigos de acceso rápido para distribución a estudiantes y familias
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {CLASSROOMS.slice(0, 6).map((c) => (
            <div
              key={c.id}
              className="rounded-xl border p-3.5 flex items-center justify-between gap-3 transition-colors hover:bg-neutral-50"
              style={{ borderColor: "var(--border-color)", backgroundColor: "var(--surface-light)" }}
            >
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase rounded bg-neutral-200 px-1.5 py-0.5 text-neutral-700">
                  {c.especialidad ?? "Ciclo Básico"}
                </span>
                <p className="font-bold text-xs mt-1 truncate" style={{ color: "var(--text-primary)" }}>
                  {c.materia}
                </p>
                <p className="text-[11px] truncate" style={{ color: "var(--text-secondary)" }}>
                  Prof. {c.profesor}
                </p>
              </div>

              <button
                type="button"
                onClick={() => copiarCodigo(c.codigo, c.id)}
                className="flex items-center gap-1 shrink-0 rounded-lg border px-2.5 py-1.5 text-xs font-mono font-bold transition-all hover:bg-white"
                style={{ borderColor: "var(--border-color)", color: "var(--gold-primary)" }}
                title="Copiar código de Classroom"
              >
                {copiadoId === c.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{c.codigo}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
