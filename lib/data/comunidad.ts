export interface BloqueInfo {
  titulo: string
  parrafos: string[]
}

export interface DatoDestacado {
  etiqueta: string
  valor: string
}

export const COOPERADORA = {
  intro:
    "La Asociación Cooperadora acompaña a la escuela con recursos, mejoras edilicias y equipamiento para los talleres. Está integrada por familias y docentes que colaboran de forma voluntaria.",
  bloques: [
    {
      titulo: "Qué hace la cooperadora",
      parrafos: [
        "Financia mejoras en aulas, laboratorios y talleres que exceden el presupuesto habitual.",
        "Adquiere materiales e insumos para las prácticas de las cuatro especialidades.",
        "Apoya eventos institucionales como Expo IPET, la Feria de Ciencias y Recrearte.",
      ],
    },
    {
      titulo: "Cómo colaborar",
      parrafos: [
        "La colaboración es voluntaria y puede realizarse mensualmente en secretaría o por transferencia.",
        "También se puede participar sumándose a las reuniones y comisiones de trabajo.",
      ],
    },
  ] as BloqueInfo[],
  datos: [
    { etiqueta: "Reuniones", valor: "Mensuales, abiertas a las familias" },
    { etiqueta: "Contacto", valor: "cooperadora@ipet249.edu.ar" },
    { etiqueta: "Colaboración", valor: "Voluntaria" },
  ] as DatoDestacado[],
}

export const HIGIENE_SEGURIDAD = {
  intro:
    "La Tecnicatura en Higiene y Seguridad forma profesionales capaces de prevenir riesgos, cuidar la salud de las personas y promover condiciones seguras en ámbitos de trabajo.",
  bloques: [
    {
      titulo: "De qué se trata",
      parrafos: [
        "Es una propuesta de formación técnica orientada a identificar, evaluar y controlar los riesgos presentes en entornos laborales.",
        "Combina contenidos teóricos con prácticas y trabajo en terreno, en articulación con las especialidades técnicas del instituto.",
      ],
    },
    {
      titulo: "Qué se aprende",
      parrafos: [
        "Normativa vigente en materia de higiene y seguridad en el trabajo.",
        "Identificación y evaluación de riesgos, prevención de accidentes y protocolos de emergencia.",
        "Uso de elementos de protección personal y cultura de la prevención.",
      ],
    },
    {
      titulo: "Salida laboral",
      parrafos: [
        "Industrias, construcción, servicios y organismos públicos requieren personal capacitado en prevención y seguridad.",
        "La formación también habilita a continuar estudios superiores en el área.",
      ],
    },
  ] as BloqueInfo[],
  datos: [
    { etiqueta: "Área", valor: "Prevención y seguridad laboral" },
    { etiqueta: "Modalidad", valor: "Teoría y práctica" },
    { etiqueta: "Inscripción", valor: "Consultar en secretaría" },
  ] as DatoDestacado[],
}

export const PIT = {
  intro:
    "El PIT (Programa de Inclusión y Terminalidad) está destinado a jóvenes de 14 a 17 años que no iniciaron o no completaron la escuela secundaria, ofreciendo una trayectoria adaptada para terminar los estudios.",
  bloques: [
    {
      titulo: "A quién está dirigido",
      parrafos: [
        "Jóvenes de entre 14 y 17 años que se encuentran fuera del sistema educativo.",
        "Estudiantes que necesitan una propuesta flexible para completar el secundario.",
      ],
    },
    {
      titulo: "Cómo es la propuesta",
      parrafos: [
        "Trayectorias formativas acompañadas por tutores y un equipo docente dedicado.",
        "Horarios y ritmos pensados para favorecer la permanencia y la terminalidad.",
        "Articulación con las especialidades técnicas del instituto.",
      ],
    },
  ] as BloqueInfo[],
  datos: [
    { etiqueta: "Edad", valor: "14 a 17 años" },
    { etiqueta: "Modalidad", valor: "Trayectoria acompañada" },
    { etiqueta: "Inscripción", valor: "Consultar en secretaría" },
  ] as DatoDestacado[],
}
