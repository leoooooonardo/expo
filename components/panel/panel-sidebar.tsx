"use client"

import Link from "next/link"
import Image from "next/image"
import {
  LayoutDashboard,
  Bell,
  GraduationCap,
  Calendar,
  ClipboardList,
  Clock,
  BookOpen,
  FileCheck,
  ExternalLink,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  User,
  Sparkles,
  Award,
} from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import { labelRol } from "@/lib/data/roles"
import type { PanelTabAdmin, PanelTabAlumno } from "./panel-types"

interface PanelSidebarProps {
  esAdmin: boolean
  tabAdmin: PanelTabAdmin
  setTabAdmin: (tab: PanelTabAdmin) => void
  tabAlumno: PanelTabAlumno
  setTabAlumno: (tab: PanelTabAlumno) => void
  colapsada: boolean
  setColapsada: (val: boolean) => void
  onCerrarMobile?: () => void
  totalComunicados?: number
  totalInscripciones?: number
}

export function PanelSidebar({
  esAdmin,
  tabAdmin,
  setTabAdmin,
  tabAlumno,
  setTabAlumno,
  colapsada,
  setColapsada,
  onCerrarMobile,
  totalComunicados = 4,
  totalInscripciones = 4,
}: PanelSidebarProps) {
  const { usuario, salir } = useAuth()

  const navItemsAdmin = [
    { id: "resumen" as PanelTabAdmin, label: "Vista General", icon: LayoutDashboard },
    { id: "comunicados" as PanelTabAdmin, label: "Noticias y Avisos", icon: Bell, badge: totalComunicados },
    { id: "academico" as PanelTabAdmin, label: "Cursos y Horarios", icon: GraduationCap },
    { id: "calendario" as PanelTabAdmin, label: "Calendario y Mesas", icon: Calendar },
    { id: "inscripciones" as PanelTabAdmin, label: "Inscripciones y Becas", icon: ClipboardList, badge: totalInscripciones },
  ]

  const navItemsAlumno = [
    { id: "resumen" as PanelTabAlumno, label: "Mi Resumen", icon: LayoutDashboard },
    { id: "horarios" as PanelTabAlumno, label: "Horario Semanal", icon: Clock },
    { id: "evaluaciones" as PanelTabAlumno, label: "Mesas y Exámenes", icon: Calendar },
    { id: "classroom" as PanelTabAlumno, label: "Mis Materias y Aulas", icon: BookOpen },
    { id: "tramites" as PanelTabAlumno, label: "Trámites y Convocatorias", icon: FileCheck },
  ]

  return (
    <aside
      className={`relative flex flex-col border-r transition-all duration-300 select-none ${
        colapsada ? "w-20" : "w-72"
      }`}
      style={{
        backgroundColor: "var(--bg-white)",
        borderColor: "var(--border-color)",
      }}
    >
      {/* Botón flotante para colapsar (solo visible en pantallas medianas/grandes) */}
      <button
        type="button"
        onClick={() => setColapsada(!colapsada)}
        className="hidden md:flex absolute -right-3.5 top-7 z-20 h-7 w-7 items-center justify-center rounded-full border shadow-sm transition-transform hover:scale-110"
        style={{
          backgroundColor: "var(--bg-white)",
          borderColor: "var(--border-color)",
          color: "var(--text-secondary)",
        }}
        title={colapsada ? "Expandir barra lateral" : "Colapsar barra lateral"}
      >
        {colapsada ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Header de la Sidebar con Logo */}
      <div
        className="flex h-20 items-center gap-3 border-b px-4 transition-all"
        style={{ borderColor: "var(--border-color)" }}
      >
        <Link
          href="/"
          className="flex items-center gap-3 overflow-hidden group focus:outline-none"
          title="Ir al inicio de la web"
        >
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl p-1 transition-transform group-hover:scale-105"
            style={{ backgroundColor: "rgba(212, 167, 44, 0.12)" }}
          >
            <Image
              src="/escudo-ipet-oficial.png"
              alt="Escudo IPET 249"
              width={38}
              height={38}
              className="object-contain"
            />
          </div>

          {!colapsada && (
            <div className="min-w-0 flex flex-col">
              <span className="font-extrabold text-sm tracking-tight leading-tight" style={{ color: "var(--gold-primary)" }}>
                IPET 249
              </span>
              <span className="text-xs font-semibold leading-tight truncate" style={{ color: "var(--text-primary)" }}>
                Nicolás Copérnico
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider mt-0.5" style={{ color: "var(--red-oxide)" }}>
                {esAdmin ? "Panel Institucional" : "Portal del Alumno"}
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Card de Usuario Activo */}
      <div
        className="p-3 border-b"
        style={{
          borderColor: "var(--border-color)",
          backgroundColor: "var(--bg-light)",
        }}
      >
        <div className={`flex items-center gap-3 ${colapsada ? "justify-center" : ""}`}>
          <div
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold shadow-sm"
            style={{
              backgroundColor: esAdmin ? "var(--red-oxide)" : "var(--gold-primary)",
              color: "#FFFFFF",
            }}
          >
            {esAdmin ? <ShieldCheck className="w-5 h-5" /> : <User className="w-5 h-5" />}
            <span
              className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500"
              title="En línea"
            />
          </div>

          {!colapsada && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                {usuario?.nombre ?? "Usuario"}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    backgroundColor: esAdmin ? "rgba(161, 58, 46, 0.12)" : "rgba(212, 167, 44, 0.2)",
                    color: esAdmin ? "var(--red-oxide)" : "#8A6D1F",
                  }}
                >
                  {usuario ? labelRol(usuario.rol) : "Sesión"}
                </span>
                <span className="text-[10px] truncate font-mono" style={{ color: "var(--text-muted)" }}>
                  2026
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navegación Principal */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1.5">
        <div className={`px-2 pb-1.5 text-[10px] font-mono uppercase tracking-wider font-semibold ${colapsada ? "text-center" : ""}`}
          style={{ color: "var(--text-muted)" }}
        >
          {colapsada ? "•••" : (esAdmin ? "Módulos de Gestión" : "Mi Espacio Escolar")}
        </div>

        {esAdmin
          ? navItemsAdmin.map((item) => {
              const Icon = item.icon
              const activo = tabAdmin === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setTabAdmin(item.id)
                    onCerrarMobile?.()
                  }}
                  title={colapsada ? item.label : undefined}
                  className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200 ${
                    colapsada ? "justify-center" : ""
                  }`}
                  style={{
                    backgroundColor: activo ? "rgba(212, 167, 44, 0.14)" : "transparent",
                    color: activo ? "#1A1A1A" : "var(--text-secondary)",
                    boxShadow: activo ? "inset 0 0 0 1px rgba(212, 167, 44, 0.4)" : "none",
                  }}
                >
                  <Icon
                    className={`h-4.5 w-4.5 shrink-0 transition-transform group-hover:scale-110 ${
                      activo ? "text-[var(--gold-primary)]" : "text-neutral-500"
                    }`}
                  />
                  {!colapsada && <span className="flex-1 text-left truncate">{item.label}</span>}
                  {!colapsada && item.badge !== undefined && (
                    <span
                      className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold"
                      style={{
                        backgroundColor: activo ? "var(--gold-primary)" : "var(--bg-light)",
                        color: activo ? "#1A1A1A" : "var(--text-muted)",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })
          : navItemsAlumno.map((item) => {
              const Icon = item.icon
              const activo = tabAlumno === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setTabAlumno(item.id)
                    onCerrarMobile?.()
                  }}
                  title={colapsada ? item.label : undefined}
                  className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200 ${
                    colapsada ? "justify-center" : ""
                  }`}
                  style={{
                    backgroundColor: activo ? "rgba(161, 58, 46, 0.12)" : "transparent",
                    color: activo ? "var(--red-oxide)" : "var(--text-secondary)",
                    boxShadow: activo ? "inset 0 0 0 1px rgba(161, 58, 46, 0.3)" : "none",
                  }}
                >
                  <Icon
                    className={`h-4.5 w-4.5 shrink-0 transition-transform group-hover:scale-110 ${
                      activo ? "text-[var(--red-oxide)]" : "text-neutral-500"
                    }`}
                  />
                  {!colapsada && <span className="flex-1 text-left truncate">{item.label}</span>}
                </button>
              )
            })}
      </nav>

      {/* Footer de la Sidebar */}
      <div
        className="border-t p-3 space-y-1.5"
        style={{ borderColor: "var(--border-color)", backgroundColor: "var(--surface-light)" }}
      >
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          title="Abrir el sitio web institucional"
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
            colapsada ? "justify-center" : ""
          }`}
          style={{ color: "var(--text-secondary)" }}
        >
          <ExternalLink className="h-4 w-4 shrink-0 text-neutral-400" />
          {!colapsada && <span className="truncate">Ver sitio web público</span>}
        </Link>

        <button
          type="button"
          onClick={() => {
            salir()
          }}
          title="Cerrar la sesión actual"
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold transition-colors hover:bg-red-50 ${
            colapsada ? "justify-center" : ""
          }`}
          style={{ color: "var(--red-oxide)" }}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!colapsada && <span>Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  )
}
