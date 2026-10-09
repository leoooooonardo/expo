"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageHero } from "@/components/page-hero"
import { useAuth } from "@/components/providers/auth-provider"
import { useSeleccion } from "@/components/providers/seleccion-provider"
import { CUENTAS_DEMO } from "@/lib/data/usuarios-demo"
import { labelRol } from "@/lib/data/roles"
import { LogIn, ShieldCheck, Info, UserRound, KeyRound } from "lucide-react"

export default function IngresarPage() {
  const router = useRouter()
  const { ingresar } = useAuth()
  const { setRol } = useSeleccion()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [codigo, setCodigo] = useState("")
  const [error, setError] = useState<string | null>(null)

  function completarSesion(cuenta: { nombre: string; email: string; rol: (typeof CUENTAS_DEMO)[number]["rol"]; admin: boolean }) {
    ingresar({ nombre: cuenta.nombre, email: cuenta.email, rol: cuenta.rol })
    setRol(cuenta.rol) // el sitio pasa a filtrarse por el rol de la sesión
    router.push("/panel")
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const cuenta = CUENTAS_DEMO.find(
      (c) =>
        c.email.toLowerCase() === email.trim().toLowerCase() &&
        c.password === password &&
        c.codigoUnico.toUpperCase() === codigo.trim().toUpperCase(),
    )
    if (!cuenta) {
      setError("Credenciales o código único incorrecto. Verificá tu correo, contraseña y código.")
      return
    }
    setError(null)
    completarSesion(cuenta)
  }

  function autoRellenar(c: (typeof CUENTAS_DEMO)[number]) {
    setEmail(c.email)
    setPassword(c.password)
    setCodigo(c.codigoUnico)
    setError(null)
  }

  const inputStyle = {
    borderColor: "var(--border-color)",
    backgroundColor: "var(--bg-white)",
    color: "var(--text-primary)",
  } as const

  return (
    <main>
      <PageHero
        etiqueta="Acceso"
        titulo="Ingresar al portal"
        descripcion="Iniciá sesión para cargar y editar contenidos. Prototipo de demostración: la autenticación es simulada."
        migas={[{ label: "Inicio", href: "/" }, { label: "Ingresar" }]}
      />

      <section className="mx-auto max-w-6xl px-4 md:px-8 py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Formulario */}
          <div>
            <form
              onSubmit={onSubmit}
              className="rounded-xl border p-6 md:p-8"
              style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg-white)" }}
            >
              <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                Iniciar sesión
              </h2>

              <label className="block mb-4">
                <span className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                  Correo institucional
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@ipet249.edu.ar"
                  className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2"
                  style={inputStyle}
                  required
                />
              </label>

              <label className="block mb-4">
                <span className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                  Contraseña
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2"
                  style={inputStyle}
                  required
                />
              </label>

              <label className="block mb-6">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="block text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                    Código único institucional
                  </span>
                  <span className="text-[11px] font-mono font-semibold" style={{ color: "var(--gold-primary)" }}>
                    Token de seguridad
                  </span>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                    placeholder="Ej: DIR-249 o ALU-249"
                    className="w-full rounded-md border pl-9 pr-3 py-2 text-sm uppercase font-mono tracking-wider focus:outline-none focus:ring-2"
                    style={inputStyle}
                    required
                  />
                </div>
                <span className="block text-[11px] text-neutral-500 mt-1">
                  Código de verificación único asignado por la institución a tu legajo o cargo.
                </span>
              </label>

              {error && (
                <p
                  className="mb-4 rounded-md px-3 py-2 text-sm"
                  style={{ backgroundColor: "#FBEAE8", color: "var(--red-oxide)" }}
                  role="alert"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: "var(--red-oxide)" }}
              >
                <LogIn className="w-4 h-4" aria-hidden="true" />
                Ingresar
              </button>
            </form>
          </div>

          {/* Cuentas de demostración */}
          <div>
            <div
              className="mb-4 flex items-start gap-2 rounded-lg border px-4 py-3"
              style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg-light)" }}
            >
              <Info className="mt-0.5 w-4 h-4 shrink-0" style={{ color: "var(--gold-primary)" }} aria-hidden="true" />
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Este es un <strong>prototipo interactivo</strong>. Elegí una cuenta para ver el flujo:
                los roles administrativos acceden al <strong>Panel Institucional</strong> de gestión de contenidos y cursos; las cuentas de alumno acceden al <strong>Portal del Estudiante</strong> con sus horarios, exámenes y aulas virtuales.
              </p>
            </div>

            <h3 className="text-sm font-semibold font-mono mb-3" style={{ color: "var(--text-muted)" }}>
              CUENTAS DE DEMOSTRACIÓN
            </h3>
            <ul className="flex flex-col gap-3">
              {CUENTAS_DEMO.map((c) => (
                <li key={c.email}>
                  <button
                    onClick={() => completarSesion(c)}
                    className="flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-colors hover:border-[var(--gold-primary)]"
                    style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg-white)" }}
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: "var(--bg-light)", color: "var(--gold-primary)" }}
                    >
                      {c.admin ? (
                        <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                      ) : (
                        <UserRound className="w-5 h-5" aria-hidden="true" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                        {c.nombre}
                        <span
                          className="ml-2 rounded px-1.5 py-0.5 text-[10px] font-mono uppercase"
                          style={{
                            backgroundColor: c.admin ? "var(--gold-primary)" : "var(--bg-light)",
                            color: c.admin ? "#1A1A1A" : "var(--text-muted)",
                          }}
                        >
                          {c.admin ? "Admin" : labelRol(c.rol)}
                        </span>
                      </span>
                      <span className="block truncate text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                        {c.email} · Clave: {c.password}
                      </span>
                      <span className="flex items-center gap-1.5 text-[11px] font-mono font-bold mt-0.5" style={{ color: "var(--gold-primary)" }}>
                        <KeyRound className="w-3 h-3" />
                        Código único: {c.codigoUnico}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        autoRellenar(c)
                      }}
                      className="hidden sm:inline-flex rounded-md border px-2 py-1 text-[11px] font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
                      style={{ borderColor: "var(--border-color)" }}
                      title="Copiar estos datos al formulario de login"
                    >
                      Rellenar
                    </button>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
