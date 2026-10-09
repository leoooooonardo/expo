"use client"

import { useActionState } from "react"
import Link from "next/link"
import { CheckCircle2, Loader2 } from "lucide-react"
import {
  inscribirseOportunidad,
  type EstadoInscripcion,
} from "@/app/actions/inscripcion-oportunidad"

const ESTADO_INICIAL: EstadoInscripcion = { ok: false }
const ANIOS = ["1°", "2°", "3°", "4°", "5°", "6°", "7°"]

const estiloInput = {
  backgroundColor: "var(--surface)",
  borderWidth: "2px",
  borderColor: "var(--border)",
  color: "var(--black-primary)",
} as const

function Campo({
  id,
  etiqueta,
  error,
  opcional,
  children,
}: {
  id: string
  etiqueta: string
  error?: string
  opcional?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium" style={{ color: "var(--black-primary)" }}>
        {etiqueta}
        {opcional && (
          <span className="ml-1 font-normal" style={{ color: "var(--foreground-secondary)" }}>
            (opcional)
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm" style={{ color: "var(--red-oxide)" }}>
          {error}
        </p>
      )}
    </div>
  )
}

export function FormularioInscripcion({
  oportunidadId,
  titulo,
  sinMarco = false,
}: {
  oportunidadId: string
  titulo: string
  sinMarco?: boolean
}) {
  const marco = sinMarco ? "space-y-5" : "p-8 rounded space-y-5"
  const [estado, accion, pendiente] = useActionState(inscribirseOportunidad, ESTADO_INICIAL)
  const errores = estado.errores ?? {}
  const valores = estado.valores ?? {}

  if (estado.ok) {
    return (
      <div
        role="status"
        className="p-8 rounded space-y-4"
        style={{
          background: "rgba(212, 167, 44, 0.06)",
          borderWidth: "2px",
          borderColor: "var(--gold-primary)",
        }}
      >
        <CheckCircle2 className="w-10 h-10" style={{ color: "var(--red-oxide)" }} aria-hidden="true" />
        <h2 className="text-xl font-display font-bold" style={{ color: "var(--black-primary)" }}>
          Inscripción registrada
        </h2>
        <p className="leading-relaxed" style={{ color: "var(--foreground-secondary)" }}>
          Recibimos tu inscripción a <strong>{titulo}</strong>. El colegio se va a comunicar con vos
          por el correo o teléfono que dejaste.
        </p>
        <Link
          href="/oportunidades/convocatorias"
          className="inline-flex items-center px-5 py-3 rounded text-sm font-semibold"
          style={{ backgroundColor: "var(--black-primary)", color: "#FFFFFF" }}
        >
          Volver a convocatorias
        </Link>
      </div>
    )
  }

  return (
    <form
      action={accion}
      noValidate
      className={marco}
      style={
        sinMarco
          ? undefined
          : { backgroundColor: "var(--surface)", borderWidth: "2px", borderColor: "var(--border)" }
      }
    >
      <input type="hidden" name="oportunidadId" value={oportunidadId} />

      {estado.mensaje && !estado.ok && (
        <p
          role="alert"
          className="p-3 rounded text-sm"
          style={{ backgroundColor: "rgba(161, 58, 46, 0.1)", color: "var(--red-oxide)" }}
        >
          {estado.mensaje}
        </p>
      )}

      <Campo id="nombre" etiqueta="Nombre y apellido" error={errores.nombre}>
        <input
          id="nombre"
          name="nombre"
          type="text"
          defaultValue={valores.nombre}
          autoComplete="name"
          required
          maxLength={120}
          aria-invalid={Boolean(errores.nombre)}
          aria-describedby={errores.nombre ? "nombre-error" : undefined}
          className="w-full px-4 py-3 rounded"
          style={estiloInput}
        />
      </Campo>

      <div className="grid sm:grid-cols-2 gap-5">
        <Campo id="dni" etiqueta="DNI" error={errores.dni}>
          <input
            id="dni"
            name="dni"
            type="text"
            defaultValue={valores.dni}
            inputMode="numeric"
            placeholder="Sin puntos"
            required
            maxLength={8}
            aria-invalid={Boolean(errores.dni)}
            aria-describedby={errores.dni ? "dni-error" : undefined}
            className="w-full px-4 py-3 rounded"
            style={estiloInput}
          />
        </Campo>
        <Campo id="anio" etiqueta="Año que cursás" opcional>
          <select
            id="anio"
            name="anio"
            defaultValue={valores.anio ?? ""}
            className="w-full px-4 py-3 rounded"
            style={estiloInput}
          >
            <option value="">Seleccioná</option>
            {ANIOS.map((a) => (
              <option key={a} value={a}>
                {a} año
              </option>
            ))}
          </select>
        </Campo>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Campo id="email" etiqueta="Correo electrónico" error={errores.email}>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={valores.email}
            autoComplete="email"
            required
            maxLength={160}
            aria-invalid={Boolean(errores.email)}
            aria-describedby={errores.email ? "email-error" : undefined}
            className="w-full px-4 py-3 rounded"
            style={estiloInput}
          />
        </Campo>
        <Campo id="telefono" etiqueta="Teléfono" opcional>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            defaultValue={valores.telefono}
            autoComplete="tel"
            maxLength={30}
            className="w-full px-4 py-3 rounded"
            style={estiloInput}
          />
        </Campo>
      </div>

      <Campo id="tutor" etiqueta="Madre, padre o tutor/a" opcional>
        <input
          id="tutor"
          name="tutor"
          type="text"
          defaultValue={valores.tutor}
          maxLength={120}
          className="w-full px-4 py-3 rounded"
          style={estiloInput}
        />
      </Campo>

      <Campo id="mensaje" etiqueta="Comentarios" opcional>
        <textarea
          id="mensaje"
          name="mensaje"
          defaultValue={valores.mensaje}
          rows={3}
          maxLength={500}
          className="w-full px-4 py-3 rounded"
          style={estiloInput}
        />
      </Campo>

      <button
        type="submit"
        disabled={pendiente}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded text-sm font-semibold disabled:opacity-60"
        style={{ backgroundColor: "var(--red-oxide)", color: "#FFFFFF" }}
      >
        {pendiente && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
        {pendiente ? "Enviando..." : "Confirmar inscripción"}
      </button>
    </form>
  )
}
