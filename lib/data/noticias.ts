export interface Noticia {
  id: number
  title: string
  date: string
  category: string
  excerpt: string
}

// Ordenadas de la más reciente a la más antigua.
export const NOTICIAS: Noticia[] = [
  {
    id: 3,
    title: 'Expo Técnica IPET 249',
    date: '28 de febrero, 2025',
    category: 'Evento',
    excerpt:
      'Muestra de proyectos finales de nuestros estudiantes. Exhibición de trabajos en Automotores, Informática, Mecánica y Electrónica.',
  },
  {
    id: 2,
    title: 'Taller de Automatización Industrial',
    date: '22 de enero, 2025',
    category: 'Actividad Académica',
    excerpt:
      'Estudiantes de Electrónica participarán en un taller especial de sistemas automatizados. Colaboración con empresas del sector.',
  },
  {
    id: 1,
    title: 'Convocatoria de Admisión 2025',
    date: '15 de enero, 2025',
    category: 'Convocatoria',
    excerpt:
      'Abierta la inscripción para los estudiantes que deseen ingresar a primer año. Consulta los requisitos y fechas importantes en nuestra sección de admisión.',
  },
]
