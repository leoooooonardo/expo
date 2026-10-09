import type { Categoria, Rol, Anio } from "@/lib/types"

export type PanelTabAdmin = "resumen" | "comunicados" | "academico" | "calendario" | "inscripciones"
export type PanelTabAlumno = "resumen" | "horarios" | "evaluaciones" | "classroom" | "tramites"

export interface ComunicadoItem {
  id: string
  titulo: string
  resumen?: string
  contenido?: string
  categoria: Categoria
  fecha: string
  roles: Rol[]
  anios: Anio[]
  estado: "publicado" | "borrador"
  destacado?: boolean
  autor?: string
}

export interface InscripcionRegistro {
  id: string
  oportunidadId: string
  tituloOportunidad: string
  nombre: string
  dni: string
  email: string
  telefono?: string
  anio?: string
  fecha: string
  estado: "pendiente" | "aprobada" | "observada"
}
