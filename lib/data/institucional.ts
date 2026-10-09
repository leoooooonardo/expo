export interface MotivoElegir {
  id: string
  titulo: string
  descripcion: string
  icono: "award" | "wrench" | "users" | "briefcase" | "cpu" | "heart"
}

// "Por qué este colegio es ideal para tu hijo/a"
export const MOTIVOS_ELEGIR: MotivoElegir[] = [
  {
    id: "trayectoria",
    titulo: "Más de 75 años de trayectoria",
    descripcion:
      "Una institución técnica reconocida en Córdoba, con miles de egresados insertados en la industria y la universidad.",
    icono: "award",
  },
  {
    id: "especialidades",
    titulo: "Cuatro especialidades técnicas",
    descripcion:
      "Automotores, Informática, Electrónica y Mecánica. Título de Técnico con salida laboral y base sólida para seguir estudiando.",
    icono: "wrench",
  },
  {
    id: "talleres",
    titulo: "Talleres y laboratorios equipados",
    descripcion:
      "Aprendizaje práctico desde los primeros años en talleres reales, no solo teoría. Se aprende haciendo.",
    icono: "cpu",
  },
  {
    id: "pasantias",
    titulo: "Pasantías y vínculo con empresas",
    descripcion:
      "Convenios con talleres y empresas de la región que abren la puerta al primer empleo antes de egresar.",
    icono: "briefcase",
  },
  {
    id: "acompanamiento",
    titulo: "Acompañamiento de trayectorias",
    descripcion:
      "Tutorías, preceptoría cercana y programa PIT para que cada estudiante avance con apoyo real.",
    icono: "heart",
  },
  {
    id: "comunidad",
    titulo: "Comunidad educativa activa",
    descripcion:
      "Cooperadora, familias y docentes comprometidos con eventos como Expo IPET, Recrearte y la Feria de Ciencias.",
    icono: "users",
  },
]

export interface PuntoMapa {
  id: string
  nombre: string
  descripcion: string
  sector: "Planta baja" | "Primer piso" | "Segundo piso" | "Exterior"
}

// Mapa indicativo (referencia textual de sectores del edificio).
export const PUNTOS_MAPA: PuntoMapa[] = [
  { id: "cantina", nombre: "Cantina", descripcion: "Kiosco y venta de refrigerios.", sector: "Planta baja" },
  { id: "sum", nombre: "SUM", descripcion: "Salón de Usos Múltiples para actos y actividades.", sector: "Planta baja" },
  { id: "cooperadora", nombre: "Cooperadora", descripcion: "Oficina de la Asociación Cooperadora.", sector: "Planta baja" },
  { id: "lab-automotores", nombre: "Laboratorio de Automotores", descripcion: "Especialidad Automotores.", sector: "Planta baja" },
  { id: "comedor", nombre: "Comedor", descripcion: "Servicio de comedor escolar.", sector: "Planta baja" },
  { id: "secretaria", nombre: "Secretaría", descripcion: "Inscripciones, certificados y trámites.", sector: "Planta baja" },
  { id: "vicedireccion", nombre: "Vicedirección", descripcion: "Atención de vicedirección con turno previo.", sector: "Planta baja" },
  { id: "direccion", nombre: "Dirección", descripcion: "Atención de dirección con turno previo.", sector: "Planta baja" },
  { id: "despacho-alumno", nombre: "Despacho de alumnos", descripcion: "Atención y trámites de estudiantes.", sector: "Planta baja" },
  { id: "aulas-basico", nombre: "Aulas del ciclo básico", descripcion: "1° a 3° año.", sector: "Primer piso" },
  { id: "aulas-superior", nombre: "Aulas del ciclo superior", descripcion: "4° a 7° año.", sector: "Primer piso" },
  { id: "lab-info", nombre: "Laboratorio de Informática", descripcion: "Especialidad Informática.", sector: "Primer piso" },
  { id: "lab-quimica", nombre: "Laboratorio de Química", descripcion: "Prácticas y experimentos de ciencias.", sector: "Primer piso" },
  { id: "radio-copernico", nombre: "Sala Radio Copérnico", descripcion: "Radio escolar del instituto.", sector: "Primer piso" },
  { id: "biblioteca", nombre: "Biblioteca", descripcion: "Préstamo de libros y espacio de estudio.", sector: "Primer piso" },
  { id: "aulas-basico-2p", nombre: "Aulas del ciclo básico", descripcion: "1° año.", sector: "Segundo piso" },
  { id: "aulas-superior-2p", nombre: "Aulas del ciclo superior", descripcion: "4°, 5° y 6° año.", sector: "Segundo piso" },
  { id: "pit", nombre: "PIT", descripcion: "Espacio del PIT.", sector: "Segundo piso" },
  { id: "patio", nombre: "Patio central", descripcion: "Actos, recreos y actividades.", sector: "Exterior" },
  { id: "cancha-voley", nombre: "Cancha de vóley", descripcion: "Educación física y actividades deportivas.", sector: "Exterior" },
  { id: "cancha-basquet", nombre: "Cancha de básquet", descripcion: "Educación física y actividades deportivas.", sector: "Exterior" },
  { id: "cancha-futbol5", nombre: "Cancha de fútbol 5", descripcion: "Educación física y actividades deportivas.", sector: "Exterior" },
]

export const DIRECCION_ESCUELA = {
  direccion: "Mariano Moreno 551, Córdoba, Argentina",
  telefono: "(0351) 400-0000",
  email: "contacto@ipet249.edu.ar",
}

export interface Promocion {
  cohorte: string // ej. "Promoción 2024"
  anio: number
  especialidad: string
  cantidad: number
  destacado?: string
}

export const PROMOCIONES: Promocion[] = [
  { cohorte: "Promoción 2024", anio: 2024, especialidad: "Informática", cantidad: 28, destacado: "Proyecto final premiado en Expo IPET" },
  { cohorte: "Promoción 2024", anio: 2024, especialidad: "Automotores", cantidad: 24 },
  { cohorte: "Promoción 2023", anio: 2023, especialidad: "Electrónica", cantidad: 22, destacado: "3 egresados en pasantías que se volvieron empleo" },
  { cohorte: "Promoción 2023", anio: 2023, especialidad: "Mecánica", cantidad: 26 },
  { cohorte: "Promoción 2022", anio: 2022, especialidad: "Informática", cantidad: 30 },
  { cohorte: "Promoción 2022", anio: 2022, especialidad: "Automotores", cantidad: 25 },
]
