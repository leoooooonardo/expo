"use client"

import { useState } from "react"
import {
  Menu,
  Bell,
  Sparkles,
  CalendarDays,
  ShieldCheck,
  User,
  GraduationCap,
  Users,
  Check,
  ChevronDown,
} from "lucide-react"
import { useAuth, type UsuarioDemo } from "@/components/providers/auth-provider"
import { useSeleccion } from "@/components/providers/seleccion-provider"
import { CUENTAS_DEMO } from "@/lib/data/usuarios-demo"
import { labelRol } from "@/lib/data/roles"
import type { PanelTabAdmin, PanelTabAlumno } from "./panel-types"

interface PanelHeaderProps {
  esAdmin: boolean
  tabAdmin: PanelTabAdmin
  tabAlumno: PanelTabAlumno
  onAbrirMobile: () => void
}

export function PanelHeader({
  esAdmin,
  tabAdmin,
  tabAlumno,
  onAbrirMobile,
}: PanelHeaderProps) {
  const { usuario, ingresar } = useAuth()
  const { setRol } = useSeleccion()
  const [selectorAbierto, setSelectorAbierto] = useState(false)
  const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false)

  // Título según la pestaña activa
  const titulosAdmin: Record<PanelTabAdmin, { titulo: string; descripcion: string }> = {
    resumen: {
      titulo: "Tablero Principal de Gestión",
      descripcion: "Indicadores clave, alertas académicas y accesos operativos del IPET 249.",
    },
    comunicados: {
      titulo: "Gestión de Comunicados y Noticias",
      descripcion: "Creación y publicación de avisos oficiales, circulares y novedades para la comunidad.",
    },
    academico: {
      titulo: "Cursos, Divisiones y Asignación de Horarios",
      descripcion: "Estructura curricular de 1° a 7° año, distribución de aulas y talleres técnicos.",
    },
    calendario: {
      titulo: "Calendario Escolar y Mesas de Examen",
      descripcion: "Cronograma unificado de feriados, actos cívicos y turnos de evaluación.",
    },
    inscripciones: {
      titulo: "Postulaciones, Pasantías y Becas",
      descripcion: "Seguimiento de solicitudes online enviadas por estudiantes y familias.",
    },
  }

  const titulosAlumno: Record<PanelTabAlumno, { titulo: string; descripcion: string }> = {
    resumen: {
      titulo: "Portal del Estudiante y Familia",
      descripcion: "Resumen de cursado, estado académico y avisos dirigidos a tu curso.",
    },
    horarios: {
      titulo: "Mis Horarios de Clase y Talleres",
      descripcion: "Grilla horaria semanal con aulas y talleres asignados.",
    },
    evaluaciones: {
      titulo: "Mesas de Examen y Evaluaciones",
      descripcion: "Fechas de parciales, recuperatorios y turnos de materias previas.",
    },
    classroom: {
      titulo: "Aulas Virtuales y Códigos Classroom",
      descripcion: "Acceso a los códigos de vinculación de tus materias activas.",
    },
    tramites: {
      titulo: "Trámites y Convocatorias Escolares",
      descripcion: "Gestión de certificados de alumno regular, becas e inscripciones deportivas.",
    },
  }

  const activoInfo = esAdmin ? titulosAdmin[tabAdmin] : titulosAlumno[tabAlumno]

  function cambiarUsuario(cuenta: (typeof CUENTAS_DEMO)[number]) {
    ingresar({ nombre: cuenta.nombre, email: cuenta.email, rol: cuenta.rol })
    setRol(cuenta.rol)
    setSelectorAbierto(false)
  }

  return (
    <header
      className="sticky top-0 z-30 flex h-20 items-center justify-between border-b px-4 md:px-8 transition-colors backdrop-blur-md"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderColor: "var(--border-color)",
      }}
    >
      {/* Lado izquierdo: Botón Menú Mobile + Títulos */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onAbrirMobile}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border transition-colors hover:bg-neutral-100"
          style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}
          aria-label="Abrir menú de navegación"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base md:text-lg font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
              {activoInfo.titulo}
            </h1>
            <span
              className="hidden lg:inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold"
              style={{
                backgroundColor: esAdmin ? "rgba(212, 167, 44, 0.16)" : "rgba(161, 58, 46, 0.12)",
                color: esAdmin ? "#8A6D1F" : "var(--red-oxide)",
              }}
            >
              <Sparkles className="w-3 h-3" />
              {esAdmin ? "Modo Administración" : "Portal Alumno"}
            </span>
          </div>
          <p className="hidden sm:block text-xs truncate max-w-xl" style={{ color: "var(--text-secondary)" }}>
            {activoInfo.descripcion}
          </p>
        </div>
      </div>

      {/* Lado derecho: Selector Rápido de Cuenta Demo + Notificaciones */}
      <div className="flex items-center gap-3">
        {/* Selector de cambio de rol para pruebas interactivas */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setSelectorAbierto(!selectorAbierto)
              setNotificacionesAbiertas(false)
            }}
            className="flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-semibold shadow-xs transition-all hover:border-[var(--gold-primary)]"
            style={{
              borderColor: "var(--border-color)",
              backgroundColor: "var(--surface-light)",
              color: "var(--text-primary)",
            }}
            title="Cambiar de perfil para probar vistas"
          >
            <span className="hidden sm:inline" style={{ color: "var(--text-muted)" }}>
              Probar como:
            </span>
            <span className="font-bold flex items-center gap-1.5">
              {usuario?.rol === "alumno" ? (
                <GraduationCap className="w-3.5 h-3.5 text-[var(--red-oxide)]" />
              ) : (
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
              )}
              {usuario?.nombre ?? "Demo"}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          {selectorAbierto && (
            <div
              className="absolute right-0 top-full mt-2 w-72 rounded-2xl border p-2 shadow-xl backdrop-blur-md z-40"
              style={{
                backgroundColor: "var(--bg-white)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="px-3 py-2 border-b mb-1" style={{ borderColor: "var(--border-color)" }}>
                <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                  Simulador de Roles del IPET 249
                </p>
                <p className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
                  Alterná entre perfiles para visualizar el comportamiento dual del panel.
                </p>
              </div>

              <div className="space-y-1">
                {CUENTAS_DEMO.map((cuenta) => {
                  const esActual = usuario?.email === cuenta.email
                  return (
                    <button
                      key={cuenta.email}
                      type="button"
                      onClick={() => cambiarUsuario(cuenta)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-colors hover:bg-neutral-50"
                      style={{
                        backgroundColor: esActual ? "rgba(212, 167, 44, 0.12)" : "transparent",
                      }}
                    >
                      <div className="min-w-0">
                        <p className="font-bold truncate" style={{ color: "var(--text-primary)" }}>
                          {cuenta.nombre}
                        </p>
                        <p className="text-[10px] font-mono truncate" style={{ color: "var(--text-muted)" }}>
                          {cuenta.email} · {cuenta.admin ? "Admin" : labelRol(cuenta.rol)}
                        </p>
                      </div>
                      {esActual && <Check className="w-4 h-4 text-[var(--gold-primary)] shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Campana de Notificaciones */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotificacionesAbiertas(!notificacionesAbiertas)
              setSelectorAbierto(false)
            }}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border transition-colors hover:bg-neutral-100"
            style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}
            aria-label="Notificaciones del sistema"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600 animate-pulse" />
          </button>

          {notificacionesAbiertas && (
            <div
              className="absolute right-0 top-full mt-2 w-80 rounded-2xl border p-4 shadow-xl z-40"
              style={{
                backgroundColor: "var(--bg-white)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: "var(--border-color)" }}>
                <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                  Avisos Recientes
                </p>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                  3 nuevos
                </span>
              </div>

              <div className="mt-3 space-y-2.5 text-xs">
                <div className="rounded-lg p-2.5 bg-neutral-50 border border-neutral-100">
                  <p className="font-semibold text-neutral-800">Inscripción a Torneos Deportivos</p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">Se registraron 4 nuevos estudiantes para fútbol y vóley.</p>
                </div>
                <div className="rounded-lg p-2.5 bg-neutral-50 border border-neutral-100">
                  <p className="font-semibold text-neutral-800">Mesas Extraordinarias de Examen</p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">Publicadas las fechas para los alumnos de 4° y 6° año.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
