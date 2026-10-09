"use client"

import {
  Users,
  GraduationCap,
  Bell,
  ClipboardList,
  Calendar,
  Clock,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  AlertCircle,
  FileText,
  Flame,
  Award,
} from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import type { ComunicadoItem, InscripcionRegistro, PanelTabAdmin } from "../panel-types"
import { EVENTOS, tipoInfo } from "@/lib/data/calendario"

interface AdminOverviewProps {
  comunicados: ComunicadoItem[]
  inscripciones: InscripcionRegistro[]
  setTabAdmin: (tab: PanelTabAdmin) => void
  onCrearComunicado: () => void
}

export function AdminOverview({
  comunicados,
  inscripciones,
  setTabAdmin,
  onCrearComunicado,
}: AdminOverviewProps) {
  const { usuario } = useAuth()

  const publicadosCount = comunicados.filter((c) => c.estado === "publicado").length
  const borradoresCount = comunicados.filter((c) => c.estado === "borrador").length
  const pendientesCount = inscripciones.filter((i) => i.estado === "pendiente").length

  return (
    <div className="space-y-8">
      {/* Banner de Bienvenida Institucional */}
      <div
        className="relative overflow-hidden rounded-3xl p-6 md:p-8 border shadow-sm"
        style={{
          background: "linear-gradient(135deg, rgba(212, 167, 44, 0.08) 0%, rgba(161, 58, 46, 0.06) 100%), #FFFFFF",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider" style={{ color: "var(--gold-primary)" }}>
                Portal Operativo IPET 249
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
              Bienvenido, {usuario?.nombre ?? "Colega"}
            </h2>
            <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Gestión centralizada de contenidos, cronograma escolar de talleres y registro de postulaciones para la comunidad técnica de Nicolás Copérnico.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onCrearComunicado}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: "var(--red-oxide)" }}
            >
              <Plus className="w-4 h-4" />
              Nuevo Comunicado
            </button>
            <button
              type="button"
              onClick={() => setTabAdmin("inscripciones")}
              className="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-colors hover:bg-neutral-50"
              style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}
            >
              <ClipboardList className="w-4 h-4 text-[var(--gold-primary)]" />
              Ver Solicitudes ({pendientesCount} nuevas)
            </button>
          </div>
        </div>
      </div>

      {/* Tarjetas de Métricas (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Alumnos */}
        <div
          className="rounded-2xl border p-5 shadow-xs transition-all hover:shadow-md"
          style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>
              Matrícula Activa
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: "rgba(212, 167, 44, 0.14)", color: "var(--gold-primary)" }}
            >
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>
              1.240
            </span>
            <p className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
              Estudiantes en 7 años lectivos y 4 turnos
            </p>
          </div>
        </div>

        {/* KPI 2: Especialidades */}
        <div
          className="rounded-2xl border p-5 shadow-xs transition-all hover:shadow-md"
          style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>
              Especialidades
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: "rgba(161, 58, 46, 0.12)", color: "var(--red-oxide)" }}
            >
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>
              4
            </span>
            <p className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
              Automotores, Informática, Electrónica, Mecánica
            </p>
          </div>
        </div>

        {/* KPI 3: Noticias y Avisos */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setTabAdmin("comunicados")}
          onKeyDown={(e) => { if (e.key === 'Enter') setTabAdmin("comunicados") }}
          className="rounded-2xl border p-5 shadow-xs transition-all hover:shadow-md cursor-pointer group text-left"
          style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>
              Comunicados
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl group-hover:scale-110 transition-transform"
              style={{ backgroundColor: "rgba(212, 167, 44, 0.14)", color: "var(--gold-primary)" }}
            >
              <Bell className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>
                {comunicados.length}
              </span>
              <p className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                {publicadosCount} publicados · {borradoresCount} borradores
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[var(--gold-primary)] transition-colors" />
          </div>
        </div>

        {/* KPI 4: Inscripciones recibidas */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setTabAdmin("inscripciones")}
          onKeyDown={(e) => { if (e.key === 'Enter') setTabAdmin("inscripciones") }}
          className="rounded-2xl border p-5 shadow-xs transition-all hover:shadow-md cursor-pointer group text-left"
          style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>
              Postulaciones
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl group-hover:scale-110 transition-transform"
              style={{ backgroundColor: "rgba(161, 58, 46, 0.12)", color: "var(--red-oxide)" }}
            >
              <ClipboardList className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>
                {inscripciones.length}
              </span>
              <p className="mt-1 text-xs font-semibold" style={{ color: "var(--red-oxide)" }}>
                {pendientesCount} pendientes de revisión
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[var(--red-oxide)] transition-colors" />
          </div>
        </div>
      </div>

      {/* Filas de Información Operativa: Actividad Reciente + Fechas de Calendario */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Comunicados Recientes */}
        <div
          className="lg:col-span-2 rounded-2xl border p-6 shadow-xs"
          style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-sm md:text-base" style={{ color: "var(--text-primary)" }}>
                Últimos Comunicados Institucionales
              </h3>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Publicaciones más recientes visibles en el portal
              </p>
            </div>
            <button
              type="button"
              onClick={() => setTabAdmin("comunicados")}
              className="text-xs font-bold hover:underline"
              style={{ color: "var(--red-oxide)" }}
            >
              Administrar todos →
            </button>
          </div>

          <div className="divide-y" style={{ borderColor: "var(--border-color)" }}>
            {comunicados.slice(0, 3).map((item) => (
              <div key={item.id} className="py-3.5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="rounded-md px-2 py-0.5 text-[10px] font-mono uppercase font-bold"
                      style={{
                        backgroundColor: item.estado === "publicado" ? "#E7F1E9" : "#F3F3F3",
                        color: item.estado === "publicado" ? "#2F6B3C" : "var(--text-muted)",
                      }}
                    >
                      {item.estado}
                    </span>
                    <span className="text-[11px] font-mono" style={{ color: "var(--text-muted)" }}>
                      {item.fecha}
                    </span>
                    <span className="text-[11px] font-semibold" style={{ color: "var(--gold-primary)" }}>
                      · {item.categoria}
                    </span>
                  </div>
                  <h4 className="font-semibold text-xs md:text-sm mt-1 truncate" style={{ color: "var(--text-primary)" }}>
                    {item.titulo}
                  </h4>
                  {item.resumen && (
                    <p className="text-xs line-clamp-1 mt-0.5" style={{ color: "var(--text-secondary)" }}>
                      {item.resumen}
                    </p>
                  )}
                </div>

                <span className="shrink-0 text-[11px] font-mono px-2 py-1 rounded bg-neutral-100 text-neutral-600">
                  {item.roles.length === 0 ? "Público" : `${item.roles.length} roles`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Próximos Hitos del Calendario Escolar */}
        <div
          className="rounded-2xl border p-6 shadow-xs flex flex-col justify-between"
          style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--gold-primary)]" />
                <h3 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                  Próximas Fechas Escolares
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setTabAdmin("calendario")}
                className="text-xs font-semibold hover:underline"
                style={{ color: "var(--gold-primary)" }}
              >
                Ver más
              </button>
            </div>

            <div className="space-y-3">
              {EVENTOS.slice(0, 4).map((ev) => {
                const info = tipoInfo(ev.tipo)
                return (
                  <div
                    key={ev.id}
                    className="rounded-xl p-3 border transition-colors hover:bg-neutral-50"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="rounded px-1.5 py-0.5 text-[10px] font-mono font-bold"
                        style={{ backgroundColor: info.bg, color: info.color }}
                      >
                        {info.label}
                      </span>
                      <span className="text-[11px] font-mono font-medium" style={{ color: "var(--text-muted)" }}>
                        {ev.fecha}
                      </span>
                    </div>
                    <p className="text-xs font-bold mt-1.5 line-clamp-1" style={{ color: "var(--text-primary)" }}>
                      {ev.titulo}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          <div
            className="mt-4 rounded-xl p-3 border flex items-center gap-3"
            style={{ backgroundColor: "var(--bg-light)", borderColor: "var(--border-color)" }}
          >
            <Clock className="w-5 h-5 text-[var(--red-oxide)] shrink-0" />
            <div className="text-[11px] leading-tight">
              <span className="font-bold block" style={{ color: "var(--text-primary)" }}>
                Horario de Atención
              </span>
              <span style={{ color: "var(--text-secondary)" }}>
                Lunes a Viernes 07:30 a 19:30 hs.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
