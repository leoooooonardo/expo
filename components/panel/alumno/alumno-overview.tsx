"use client"

import {
  GraduationCap,
  Calendar,
  Clock,
  BookOpen,
  KeyRound,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  Flame,
} from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import { ALUMNO_DEMO_DATA } from "../panel-mock-data"
import type { PanelTabAlumno } from "../panel-types"

interface AlumnoOverviewProps {
  setTabAlumno: (tab: PanelTabAlumno) => void
}

export function AlumnoOverview({ setTabAlumno }: AlumnoOverviewProps) {
  const { usuario } = useAuth()
  const data = ALUMNO_DEMO_DATA

  return (
    <div className="space-y-8">
      {/* Tarjeta de Bienvenida y Credencial Estudiantil */}
      <div
        className="relative overflow-hidden rounded-3xl p-6 md:p-8 border shadow-sm"
        style={{
          background: "linear-gradient(135deg, rgba(161, 58, 46, 0.08) 0%, rgba(212, 167, 44, 0.08) 100%), #FFFFFF",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl font-bold shadow-sm"
              style={{ backgroundColor: "var(--gold-primary)", color: "#FFFFFF" }}
            >
              <GraduationCap className="w-8 h-8" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                  Alumno Regular
                </span>
                <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                  Legajo: {data.legajo}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black" style={{ color: "var(--text-primary)" }}>
                ¡Hola, {usuario?.nombre ?? data.nombre}!
              </h2>
              <p className="mt-0.5 text-xs md:text-sm font-semibold" style={{ color: "var(--red-oxide)" }}>
                {data.curso} · Especialidad {data.especialidad} (Turno {data.turno})
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setTabAlumno("horarios")}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-transform hover:scale-105"
              style={{ backgroundColor: "var(--red-oxide)" }}
            >
              <Clock className="w-4 h-4" />
              Ver Horario Semanal
            </button>
            <button
              type="button"
              onClick={() => setTabAlumno("classroom")}
              className="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-colors hover:bg-neutral-50"
              style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}
            >
              <KeyRound className="w-4 h-4 text-[var(--gold-primary)]" />
              Códigos Classroom
            </button>
          </div>
        </div>
      </div>

      {/* Métricas del Estudiante */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className="rounded-2xl border p-5 shadow-xs"
          style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
              Materias Cursando
            </span>
            <BookOpen className="w-5 h-5 text-[var(--gold-primary)]" />
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>
              {data.materias.length}
            </span>
            <p className="text-xs text-neutral-500 mt-1">Especialidad técnica activa</p>
          </div>
        </div>

        <div
          className="rounded-2xl border p-5 shadow-xs"
          style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
              Asistencia General
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-emerald-600">
              {data.asistenciaGeneral}
            </span>
            <p className="text-xs text-neutral-500 mt-1">Condición de regularidad óptima (min. 80%)</p>
          </div>
        </div>

        <div
          className="rounded-2xl border p-5 shadow-xs"
          style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
              Próximos Exámenes
            </span>
            <Calendar className="w-5 h-5 text-[var(--red-oxide)]" />
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>
              {data.proximasFechas.length}
            </span>
            <p className="text-xs text-neutral-500 mt-1">Evaluaciones programadas en marzo</p>
          </div>
        </div>
      </div>

      {/* Próximas Evaluaciones y Clases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximas Evaluaciones */}
        <div
          className="rounded-2xl border p-6 shadow-xs"
          style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--red-oxide)]" />
              <h3 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                Próximas Mesas y Evaluaciones
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setTabAlumno("evaluaciones")}
              className="text-xs font-bold hover:underline"
              style={{ color: "var(--red-oxide)" }}
            >
              Ver calendario completo →
            </button>
          </div>

          <div className="space-y-3">
            {data.proximasFechas.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border p-3.5 flex items-center justify-between gap-4 transition-colors hover:bg-neutral-50"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded px-1.5 py-0.5 text-[10px] font-mono font-bold bg-amber-100 text-amber-800">
                      {f.tipo}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">{f.fecha}</span>
                  </div>
                  <p className="text-xs font-bold mt-1" style={{ color: "var(--text-primary)" }}>
                    {f.materia}
                  </p>
                  <p className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-neutral-400" /> {f.hora}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trámites Rápidos y Convocatorias */}
        <div
          className="rounded-2xl border p-6 shadow-xs flex flex-col justify-between"
          style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[var(--gold-primary)]" />
                <h3 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                  Trámites y Convocatorias Escolares
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setTabAlumno("tramites")}
                className="text-xs font-bold hover:underline"
                style={{ color: "var(--gold-primary)" }}
              >
                Ir a trámites →
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="rounded-xl border p-3 flex items-center justify-between" style={{ borderColor: "var(--border-color)" }}>
                <div>
                  <p className="font-bold text-neutral-800">Certificado de Alumno Regular</p>
                  <p className="text-[11px] text-neutral-500">Solicitud para asignaciones o transporte</p>
                </div>
                <span className="rounded-md bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold">
                  Disponible
                </span>
              </div>

              <div className="rounded-xl border p-3 flex items-center justify-between" style={{ borderColor: "var(--border-color)" }}>
                <div>
                  <p className="font-bold text-neutral-800">Torneo de Fútbol y Vóley</p>
                  <p className="text-[11px] text-neutral-500">Inscripción abierta para 4° año</p>
                </div>
                <span className="rounded-md bg-amber-100 text-amber-800 px-2 py-0.5 text-[10px] font-bold">
                  Abierta
                </span>
              </div>

              <div className="rounded-xl border p-3 flex items-center justify-between" style={{ borderColor: "var(--border-color)" }}>
                <div>
                  <p className="font-bold text-neutral-800">Olimpiada Informática (OIA)</p>
                  <p className="text-[11px] text-neutral-500">Representá al IPET 249 en programación</p>
                </div>
                <span className="rounded-md bg-rose-100 text-rose-800 px-2 py-0.5 text-[10px] font-bold">
                  Inscripción online
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
