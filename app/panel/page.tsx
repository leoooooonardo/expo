"use client"

import { useState } from "react"
import Link from "next/link"
import { Lock, LogIn, Sparkles, ShieldCheck, GraduationCap, ArrowRight, User } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import { useSeleccion } from "@/components/providers/seleccion-provider"
import { CUENTAS_DEMO } from "@/lib/data/usuarios-demo"
import { labelRol } from "@/lib/data/roles"

// Componentes del Panel
import { PanelSidebar } from "@/components/panel/panel-sidebar"
import { PanelHeader } from "@/components/panel/panel-header"
import { AdminOverview } from "@/components/panel/admin/admin-overview"
import { AdminComunicados } from "@/components/panel/admin/admin-comunicados"
import { AdminAcademico } from "@/components/panel/admin/admin-academico"
import { AdminInscripciones } from "@/components/panel/admin/admin-inscripciones"
import { AlumnoOverview } from "@/components/panel/alumno/alumno-overview"
import { AlumnoHorarios } from "@/components/panel/alumno/alumno-horarios"
import { AlumnoMaterias } from "@/components/panel/alumno/alumno-materias"
import { AlumnoTramites } from "@/components/panel/alumno/alumno-tramites"
import { CalendarioView } from "@/components/calendario/calendario-view"

// Datos y Tipos
import { COMUNICADOS_INICIALES, INSCRIPCIONES_INICIALES } from "@/components/panel/panel-mock-data"
import type { PanelTabAdmin, PanelTabAlumno, ComunicadoItem, InscripcionRegistro } from "@/components/panel/panel-types"

export default function PanelPage() {
  const { usuario, puedeAdministrar, ingresar } = useAuth()
  const { setRol } = useSeleccion()

  // Estados de navegación interna
  const [tabAdmin, setTabAdmin] = useState<PanelTabAdmin>("resumen")
  const [tabAlumno, setTabAlumno] = useState<PanelTabAlumno>("resumen")

  // Estado responsivo de la Sidebar
  const [sidebarColapsada, setSidebarColapsada] = useState(false)
  const [mobileAbierto, setMobileAbierto] = useState(false)

  // Datos interactivos del panel (CRUD simulado)
  const [comunicados, setComunicados] = useState<ComunicadoItem[]>(COMUNICADOS_INICIALES)
  const [inscripciones, setInscripciones] = useState<InscripcionRegistro[]>(INSCRIPCIONES_INICIALES)

  // Estado del formulario de creación/edición de comunicados
  const [formularioAbierto, setFormularioAbierto] = useState(false)
  const [itemEditando, setItemEditando] = useState<ComunicadoItem | null>(null)

  function iniciarDemo(cuenta: (typeof CUENTAS_DEMO)[number]) {
    ingresar({ nombre: cuenta.nombre, email: cuenta.email, rol: cuenta.rol })
    setRol(cuenta.rol)
  }

  // --- Vista si NO hay sesión iniciada ---
  if (!usuario) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-neutral-50/50">
        <div
          className="mx-auto max-w-lg w-full rounded-3xl border p-8 md:p-10 shadow-lg text-center"
          style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg-white)" }}
        >
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl shadow-xs"
            style={{ backgroundColor: "rgba(212, 167, 44, 0.15)", color: "var(--gold-primary)" }}
          >
            <Lock className="w-8 h-8" />
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Portal IPET 249
          </span>

          <h2 className="text-2xl font-black mb-3" style={{ color: "var(--text-primary)" }}>
            Acceso al Panel de Control
          </h2>

          <p className="mb-6 text-sm leading-relaxed text-neutral-600">
            Iniciá sesión para ingresar al espacio institucional de gestión o consultar tu portal del alumno y familia.
          </p>

          <Link
            href="/ingresar"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white shadow-sm transition-transform hover:scale-102 active:scale-98"
            style={{ backgroundColor: "var(--red-oxide)" }}
          >
            <LogIn className="w-4 h-4" />
            Ir a Iniciar Sesión
          </Link>

          {/* Accesos rápidos de prueba directa */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--border-color)" }}>
            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-3">
              O ingresá al instante con un perfil demo:
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => iniciarDemo(CUENTAS_DEMO[0])}
                className="flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs font-semibold transition-all hover:border-[var(--gold-primary)] hover:bg-neutral-50"
                style={{ borderColor: "var(--border-color)" }}
              >
                <ShieldCheck className="w-4 h-4 text-[var(--gold-primary)] shrink-0" />
                <div className="min-w-0">
                  <p className="font-bold truncate text-neutral-800">Dirección</p>
                  <p className="text-[10px] text-neutral-500">Panel Director</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => iniciarDemo(CUENTAS_DEMO[3])}
                className="flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs font-semibold transition-all hover:border-[var(--red-oxide)] hover:bg-neutral-50"
                style={{ borderColor: "var(--border-color)" }}
              >
                <GraduationCap className="w-4 h-4 text-[var(--red-oxide)] shrink-0" />
                <div className="min-w-0">
                  <p className="font-bold truncate text-neutral-800">Estudiante</p>
                  <p className="text-[10px] text-neutral-500">Portal Alumno</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // --- Vista Principal del Panel Dual (Admin o Alumno) ---
  const esAdmin = puedeAdministrar

  return (
    <div className="min-h-screen flex bg-neutral-50/40 text-neutral-900">
      {/* Sidebar Desktop */}
      <div className="hidden md:flex shrink-0 sticky top-0 h-screen">
        <PanelSidebar
          esAdmin={esAdmin}
          tabAdmin={tabAdmin}
          setTabAdmin={setTabAdmin}
          tabAlumno={tabAlumno}
          setTabAlumno={setTabAlumno}
          colapsada={sidebarColapsada}
          setColapsada={setSidebarColapsada}
          totalComunicados={comunicados.length}
          totalInscripciones={inscripciones.length}
        />
      </div>

      {/* Drawer Mobile de la Sidebar */}
      {mobileAbierto && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileAbierto(false)}
          />
          <div className="relative z-10 flex h-full">
            <PanelSidebar
              esAdmin={esAdmin}
              tabAdmin={tabAdmin}
              setTabAdmin={setTabAdmin}
              tabAlumno={tabAlumno}
              setTabAlumno={setTabAlumno}
              colapsada={false}
              setColapsada={() => {}}
              onCerrarMobile={() => setMobileAbierto(false)}
              totalComunicados={comunicados.length}
              totalInscripciones={inscripciones.length}
            />
          </div>
        </div>
      )}

      {/* Contenedor Principal */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        <PanelHeader
          esAdmin={esAdmin}
          tabAdmin={tabAdmin}
          tabAlumno={tabAlumno}
          onAbrirMobile={() => setMobileAbierto(true)}
        />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {esAdmin ? (
            // ================= VISTAS DE ADMINISTRACIÓN =================
            <>
              {tabAdmin === "resumen" && (
                <AdminOverview
                  comunicados={comunicados}
                  inscripciones={inscripciones}
                  setTabAdmin={setTabAdmin}
                  onCrearComunicado={() => {
                    setTabAdmin("comunicados")
                    setFormularioAbierto(true)
                    setItemEditando(null)
                  }}
                />
              )}

              {tabAdmin === "comunicados" && (
                <AdminComunicados
                  comunicados={comunicados}
                  setComunicados={setComunicados}
                  formularioAbierto={formularioAbierto}
                  setFormularioAbierto={setFormularioAbierto}
                  itemEditando={itemEditando}
                  setItemEditando={setItemEditando}
                />
              )}

              {tabAdmin === "academico" && <AdminAcademico />}

              {tabAdmin === "calendario" && (
                <div className="rounded-2xl border bg-white p-6 shadow-xs" style={{ borderColor: "var(--border-color)" }}>
                  <CalendarioView />
                </div>
              )}

              {tabAdmin === "inscripciones" && (
                <AdminInscripciones
                  inscripciones={inscripciones}
                  setInscripciones={setInscripciones}
                />
              )}
            </>
          ) : (
            // ================= VISTAS DEL PORTAL DEL ALUMNO =================
            <>
              {tabAlumno === "resumen" && (
                <AlumnoOverview setTabAlumno={setTabAlumno} />
              )}

              {tabAlumno === "horarios" && <AlumnoHorarios />}

              {tabAlumno === "evaluaciones" && (
                <div className="rounded-2xl border bg-white p-6 shadow-xs" style={{ borderColor: "var(--border-color)" }}>
                  <CalendarioView />
                </div>
              )}

              {tabAlumno === "classroom" && <AlumnoMaterias />}

              {tabAlumno === "tramites" && <AlumnoTramites />}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
