"use server"

import { z } from "zod"
import { db } from "@/lib/db"
import { inscripcionesOportunidades } from "@/lib/db/schema"
import {
  diasRestantes,
  getOportunidad,
  permiteInscripcionOnline,
} from "@/lib/data/oportunidades"

export type EstadoInscripcion = {
  ok: boolean
  mensaje?: string
  errores?: Partial<Record<string, string>>
  valores?: Partial<Record<string, string>>
}

const CAMPOS = ["nombre", "dni", "email", "telefono", "anio", "tutor", "mensaje"] as const

function leerValores(formData: FormData) {
  const valores: Record<string, string> = {}
  for (const campo of CAMPOS) {
    const valor = formData.get(campo)
    if (typeof valor === "string") valores[campo] = valor
  }
  return valores
}

const esquema = z.object({
  oportunidadId: z.string().min(1),
  nombre: z.string().trim().min(3, "Ingresá tu nombre completo.").max(120),
  dni: z
    .string()
    .trim()
    .regex(/^\d{7,8}$/, "Ingresá el DNI sin puntos, de 7 u 8 números."),
  email: z.string().trim().email("Ingresá un correo válido.").max(160),
  telefono: z.string().trim().max(30).optional(),
  anio: z.string().trim().max(10).optional(),
  tutor: z.string().trim().max(120).optional(),
  mensaje: z.string().trim().max(500).optional(),
})

function texto(formData: FormData, campo: string) {
  const valor = formData.get(campo)
  return typeof valor === "string" && valor.length > 0 ? valor : undefined
}

export async function inscribirseOportunidad(
  _estado: EstadoInscripcion,
  formData: FormData,
): Promise<EstadoInscripcion> {
  const valores = leerValores(formData)
  const parsed = esquema.safeParse({
    oportunidadId: texto(formData, "oportunidadId"),
    nombre: texto(formData, "nombre") ?? "",
    dni: texto(formData, "dni") ?? "",
    email: texto(formData, "email") ?? "",
    telefono: texto(formData, "telefono"),
    anio: texto(formData, "anio"),
    tutor: texto(formData, "tutor"),
    mensaje: texto(formData, "mensaje"),
  })

  if (!parsed.success) {
    const errores: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const campo = String(issue.path[0])
      if (!errores[campo]) errores[campo] = issue.message
    }
    return { ok: false, errores, valores, mensaje: "Revisá los campos marcados." }
  }

  const datos = parsed.data
  const oportunidad = getOportunidad(datos.oportunidadId)

  if (!oportunidad || !permiteInscripcionOnline(oportunidad)) {
    return { ok: false, valores, mensaje: "Esta convocatoria no admite inscripción online." }
  }

  if (oportunidad.cierre && diasRestantes(oportunidad.cierre) < 0) {
    return { ok: false, valores, mensaje: "La inscripción a esta convocatoria ya cerró." }
  }

  try {
    const insertadas = await db
      .insert(inscripcionesOportunidades)
      .values({
        oportunidadId: datos.oportunidadId,
        nombre: datos.nombre,
        dni: datos.dni,
        email: datos.email,
        telefono: datos.telefono ?? null,
        anio: datos.anio ?? null,
        tutor: datos.tutor ?? null,
        mensaje: datos.mensaje ?? null,
      })
      .onConflictDoNothing()
      .returning({ id: inscripcionesOportunidades.id })

    if (insertadas.length === 0) {
      return {
        ok: false,
        valores,
        mensaje: "Ya hay una inscripción registrada con ese DNI para esta convocatoria.",
        errores: { dni: "Este DNI ya está inscripto." },
      }
    }

    return { ok: true, mensaje: "Tu inscripción quedó registrada." }
  } catch (error) {
    console.error("[inscripcion-oportunidad] error al guardar", error)
    return {
      ok: false,
      valores,
      mensaje: "No pudimos guardar tu inscripción. Probá de nuevo en unos minutos.",
    }
  }
}
