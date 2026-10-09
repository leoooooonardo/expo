"use client"

import Link from "next/link"
import { Lock, ShieldAlert, LogIn, ArrowRight, UserCheck, School } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import { CUENTAS_DEMO } from "@/lib/data/usuarios-demo"
import { useSeleccion } from "@/components/providers/seleccion-provider"

interface AccesoRestringidoProps {
  seccion: string
  descripcion?: string
}

export function AccesoRestringido({
  seccion,
  descripcion = "Esta sección contiene información académica interna y de privacidad del alumnado (aulas asignadas, horarios de permanencia en el establecimiento y códigos de aulas virtuales) reservada para la comunidad escolar.",
}: AccesoRestringidoProps) {
  const { ingresar } = useAuth()
  const { setRol } = useSeleccion()

  function probarComoAlumno() {
    const cuenta = CUENTAS_DEMO[3] // Estudiante
    ingresar({ nombre: cuenta.nombre, email: cuenta.email, rol: cuenta.rol })
    setRol(cuenta.rol)
  }

  function probarComoProfesor() {
    const cuenta = CUENTAS_DEMO[1] // Profesor
    ingresar({ nombre: cuenta.nombre, email: cuenta.email, rol: cuenta.rol })
    setRol(cuenta.rol)
  }

  return (
    <section className="section-padding" style={{ backgroundColor: "var(--bg-white)" }}>
      <div className="mx-auto max-w-4xl">
        <div
          className="relative overflow-hidden rounded-3xl border p-8 md:p-12 shadow-sm text-center"
          style={{
            borderColor: "var(--border-color)",
            backgroundColor: "var(--surface-light)",
          }}
        >
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider mb-6"
            style={{ backgroundColor: "rgba(161, 58, 46, 0.1)", color: "var(--red-oxide)" }}
          >
            <ShieldAlert className="w-4 h-4" />
            Privacidad Institucional y Seguridad Escolar
          </div>

          {/* Icono de candado */}
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl shadow-xs"
            style={{ backgroundColor: "rgba(212, 167, 44, 0.15)", color: "var(--gold-primary)" }}
          >
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ color: "var(--text-primary)" }}>
            Acceso Exclusivo para la Comunidad del IPET 249
          </h2>

          <p className="mx-auto max-w-2xl text-sm md:text-base leading-relaxed text-neutral-600 mb-8">
            Estás explorando el sitio en modo <strong>Visitante</strong>. Por motivos de resguardo de los menores de edad y confidencialidad institucional, la sección de <strong>{seccion}</strong> requiere una cuenta registrada (estudiantes, familias, profesores, preceptores o directivos).
          </p>

          {/* Botones principales */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Link
              href="/ingresar"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: "var(--red-oxide)" }}
            >
              <LogIn className="w-4 h-4" />
              Iniciar Sesión Institucional
            </Link>

            <Link
              href="/admisiones"
              className="inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-bold transition-colors hover:bg-neutral-100"
              style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}
            >
              <School className="w-4 h-4 text-[var(--gold-primary)]" />
              Información de Admisiones 2026
            </Link>
          </div>

          {/* Caja explicativa para ingresantes y comunidad */}
          <div
            className="mx-auto max-w-xl rounded-2xl border p-5 text-left text-xs space-y-2 bg-white"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-neutral-800 uppercase tracking-wide">
                ¿Sos alumno o docente del IPET 249?
              </span>
              <span className="text-[10px] font-mono text-neutral-400">Acceso Rápido Demo</span>
            </div>
            <p className="text-neutral-500 leading-relaxed">
              Iniciá sesión con tu correo escolar para desbloquear tus horarios de aula, códigos de Classroom y turnos de tutorías. Podés probar de inmediato con un perfil demostrativo:
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={probarComoAlumno}
                className="rounded-lg border px-3 py-1.5 font-semibold text-neutral-700 hover:border-[var(--gold-primary)] hover:bg-amber-50/50 transition-colors"
                style={{ borderColor: "var(--border-color)" }}
              >
                Ingresar como Alumno →
              </button>
              <button
                type="button"
                onClick={probarComoProfesor}
                className="rounded-lg border px-3 py-1.5 font-semibold text-neutral-700 hover:border-[var(--red-oxide)] hover:bg-red-50/50 transition-colors"
                style={{ borderColor: "var(--border-color)" }}
              >
                Ingresar como Profesor →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
