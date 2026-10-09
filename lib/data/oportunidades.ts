import type { Rol, Anio } from "@/lib/types"

export type TipoOportunidad =
  | "convocatoria"
  | "beca"
  | "olimpiada"
  | "pasantia"
  | "empleo"

export interface Oportunidad {
  id: string
  titulo: string
  tipo: TipoOportunidad
  organizacion: string
  descripcion: string
  cierre?: string // ISO, fecha límite de postulación
  link?: string
  requisitos?: string[]
  /** "colegio": se gestiona íntegramente con el IPET 249 y se puede completar online. */
  modalidad?: "colegio" | "externa"
  pasos?: string[]
  contacto?: string
  roles: Rol[]
  anios: Anio[]
}

export const TIPOS_CON_DETALLE: TipoOportunidad[] = ["convocatoria", "beca", "olimpiada"]

export function tieneDetalle(o: Oportunidad): boolean {
  return TIPOS_CON_DETALLE.includes(o.tipo)
}

export function permiteInscripcionOnline(o: Oportunidad): boolean {
  return o.modalidad === "colegio"
}

export interface TipoOportunidadInfo {
  value: TipoOportunidad
  label: string
  color: string
  bg: string
}

export const TIPOS_OPORTUNIDAD: TipoOportunidadInfo[] = [
  { value: "convocatoria", label: "Convocatorias", color: "#D4A72C", bg: "rgba(212, 167, 44, 0.14)" },
  { value: "beca", label: "Becas", color: "#A13A2E", bg: "rgba(161, 58, 46, 0.1)" },
  { value: "olimpiada", label: "Olimpiadas", color: "#8A6D1F", bg: "rgba(212, 167, 44, 0.1)" },
  { value: "pasantia", label: "Pasantías", color: "#C04F40", bg: "rgba(192, 79, 64, 0.1)" },
  { value: "empleo", label: "Empleo", color: "#1A1A1A", bg: "rgba(26, 26, 26, 0.08)" },
]

export function tipoOportunidadInfo(tipo: TipoOportunidad): TipoOportunidadInfo {
  return TIPOS_OPORTUNIDAD.find((t) => t.value === tipo) ?? TIPOS_OPORTUNIDAD[0]
}

export const OPORTUNIDADES: Oportunidad[] = [
  {
    id: "deporte-futbol",
    titulo: "Inscripción a Fútbol",
    tipo: "convocatoria",
    organizacion: "IPET 249",
    descripcion: "Inscripción online al torneo de Fútbol de la Semana del Estudiante.",
    modalidad: "colegio",
    roles: ["alumno"],
    anios: [],
  },
  {
    id: "deporte-voley",
    titulo: "Inscripción a Vóley",
    tipo: "convocatoria",
    organizacion: "IPET 249",
    descripcion: "Inscripción online al torneo de Vóley de la Semana del Estudiante.",
    modalidad: "colegio",
    roles: ["alumno"],
    anios: [],
  },
  {
    id: "deporte-basquet",
    titulo: "Inscripción a Básquet",
    tipo: "convocatoria",
    organizacion: "IPET 249",
    descripcion: "Inscripción online al torneo de Básquet de la Semana del Estudiante.",
    modalidad: "colegio",
    roles: ["alumno"],
    anios: [],
  },
  {
    id: "deporte-ajedrez",
    titulo: "Inscripción a Ajedrez",
    tipo: "convocatoria",
    organizacion: "IPET 249",
    descripcion: "Inscripción online al torneo de Ajedrez de la Semana del Estudiante.",
    modalidad: "colegio",
    roles: ["alumno"],
    anios: [],
  },
  {
    id: "beca-progresar",
    titulo: "Becas Progresar",
    tipo: "beca",
    organizacion: "Ministerio de Educación de la Nación",
    descripcion:
      "Beca nacional de apoyo económico para estudiantes de nivel secundario que deseen iniciar o continuar sus estudios.",
    cierre: "2026-04-30",
    requisitos: ["Ser argentino/a nativo o naturalizado", "Tener entre 16 y 24 años", "Ingreso familiar dentro del tope"],
    modalidad: "externa",
    link: "https://www.argentina.gob.ar/educacion/progresar",
    contacto: "Secretaría del colegio, para obtener el certificado de alumno regular.",
    pasos: [
      "Ingresá a Mi Argentina con tu CUIL y tu clave de la Seguridad Social.",
      "Entrá al sitio oficial de Progresar y completá el formulario de inscripción.",
      "Pedí en Secretaría el certificado de alumno regular si te lo solicitan.",
      "Revisá que la solicitud quede presentada y seguí su estado desde Mi Argentina.",
    ],
    roles: ["alumno", "familia"],
    anios: [],
  },
  {
    id: "olimpiada-info",
    titulo: "Olimpiada Informática Argentina (OIA)",
    tipo: "olimpiada",
    organizacion: "OIA",
    descripcion:
      "Competencia nacional de programación y resolución de problemas. Inscripción a través del profesor de la especialidad.",
    cierre: "2026-11-13",
    requisitos: ["Estar cursando la especialidad Informática", "Presentar autorización del tutor"],
    modalidad: "colegio",
    contacto: "Profesor/a de Informática o Secretaría del colegio.",
    pasos: [
      "Hablá con tu profesor/a de Informática para confirmar que podés participar.",
      "Pedí en Secretaría la autorización del tutor y llevala firmada.",
      "Completá la inscripción online desde esta página.",
      "El colegio confirma tu lugar y te avisa la fecha de la instancia colegial.",
    ],
    roles: ["alumno"],
    anios: [4, 5, 6],
  },
  {
    id: "olimpiada-mate",
    titulo: "Olimpiada Matemática Ñandú / OMA",
    tipo: "olimpiada",
    organizacion: "Olimpiada Matemática Argentina",
    descripcion: "Certamen de matemática por niveles. Instancia colegial, zonal y nacional.",
    cierre: "2026-11-27",
    modalidad: "colegio",
    contacto: "Profesor/a de Matemática o Secretaría del colegio.",
    pasos: [
      "Consultá con tu profesor/a de Matemática en qué nivel te corresponde participar.",
      "Completá la inscripción online desde esta página.",
      "Rendí la instancia colegial en la fecha que te indique el colegio.",
      "Si clasificás, el colegio te acompaña con la inscripción a las instancias zonal y nacional.",
    ],
    roles: ["alumno"],
    anios: [1, 2, 3, 4, 5],
  },
  {
    id: "convocatoria-robotica",
    titulo: "Convocatoria a proyectos de robótica",
    tipo: "convocatoria",
    organizacion: "Ministerio de Educación de Córdoba",
    descripcion:
      "Financiamiento de kits y materiales para proyectos de robótica educativa presentados por equipos de estudiantes.",
    cierre: "2026-06-10",
    modalidad: "externa",
    contacto: "Profesor/a responsable del proyecto o Secretaría del colegio.",
    pasos: [
      "Armá un equipo de estudiantes y elegí un profesor/a responsable.",
      "Definí el proyecto: objetivo, materiales necesarios y cronograma.",
      "Presentá el proyecto al profesor/a para que lo cargue ante el Ministerio de Educación de Córdoba.",
      "Consultá las bases oficiales de la convocatoria y esperá la comunicación de resultados.",
    ],
    roles: ["alumno", "profesor"],
    anios: [3, 4, 5, 6],
  },
  {
    id: "convocatoria-docente",
    titulo: "Formación docente en tecnologías educativas",
    tipo: "convocatoria",
    organizacion: "ISEP Córdoba",
    descripcion: "Trayecto formativo gratuito para docentes de escuelas técnicas. Cupos limitados.",
    cierre: "2026-03-28",
    modalidad: "externa",
    contacto: "Dirección o Secretaría del colegio.",
    pasos: [
      "Consultá en Dirección o Secretaría si el colegio tiene cupo asignado.",
      "Reuní tus datos personales y tu constancia de cargo docente.",
      "Completá la inscripción en el sitio del ISEP siguiendo las bases oficiales.",
      "Esperá la confirmación del cupo por parte del instituto.",
    ],
    roles: ["profesor"],
    anios: [],
  },
  {
    id: "pasantia-automotores",
    titulo: "Pasantía en taller mecánico",
    tipo: "pasantia",
    organizacion: "Red de talleres asociados",
    descripcion:
      "Práctica profesionalizante para estudiantes de Automotores en talleres y concesionarias de la ciudad.",
    cierre: "2026-08-31",
    requisitos: ["Estar cursando 6° o 7° de Automotores", "Tener el 80% de asistencia"],
    roles: ["alumno"],
    anios: [6, 7],
  },
  {
    id: "pasantia-informatica",
    titulo: "Pasantía en desarrollo de software",
    tipo: "pasantia",
    organizacion: "Empresas tecnológicas de Córdoba",
    descripcion:
      "Práctica en empresas de software para estudiantes avanzados de Informática. Incluye acompañamiento de un tutor.",
    cierre: "2026-09-15",
    requisitos: ["Cursar 6° de Informática", "Conocimientos de programación web"],
    roles: ["alumno"],
    anios: [6],
  },
  {
    id: "empleo-tecnico-electronica",
    titulo: "Búsqueda: Técnico/a en electrónica junior",
    tipo: "empleo",
    organizacion: "Industria local",
    descripcion:
      "Oportunidad laboral para egresados recientes de la especialidad Electrónica. Jornada part-time.",
    cierre: "2026-07-05",
    requisitos: ["Título en trámite o egresado", "Especialidad Electrónica"],
    roles: ["alumno"],
    anios: [7],
  },
  {
    id: "empleo-soporte-it",
    titulo: "Búsqueda: Soporte técnico IT",
    tipo: "empleo",
    organizacion: "Empresa de servicios",
    descripcion: "Puesto de soporte técnico de primer nivel. Ideal para egresados de Informática.",
    cierre: "2026-06-20",
    roles: ["alumno"],
    anios: [7],
  },
]

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
]

export function getOportunidad(id: string): Oportunidad | undefined {
  return OPORTUNIDADES.find((o) => o.id === id)
}

export function formatearCierre(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  return `${d} de ${MESES[m - 1]} de ${y}`
}

export function diasRestantes(iso: string): number {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)
  const [y, m, d] = iso.split("-").map(Number)
  const cierre = new Date(y, m - 1, d)
  return Math.round((cierre.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24))
}
