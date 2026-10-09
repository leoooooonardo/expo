export interface Especialidad {
  slug: string
  nombre: string
  titulo: string
  resumen: string
  presentacion: string[]
  queAprenden: { titulo: string; detalle: string }[]
  tramos: { etapa: string; descripcion: string }[]
  salidaLaboral: string[]
  continuarEstudios: string[]
  espacios: string[]
  perfil: string[]
}

export const especialidades: Especialidad[] = [
  {
    slug: "automotores",
    nombre: "Automotores",
    titulo: "Técnico en Automotores",
    resumen:
      "Formación integral en sistemas de motores, transmisión, dirección, frenos, electricidad y diagnóstico automotriz.",
    presentacion: [
      "La especialidad Automotores forma técnicos capaces de diagnosticar, mantener, reparar y optimizar vehículos livianos y pesados, tanto de motor naftero como diésel, incorporando las tecnologías de inyección electrónica y control computarizado.",
      "A lo largo de la cursada los estudiantes combinan la teoría con la práctica en taller, trabajando con herramientas, instrumentos de medición y equipos de diagnóstico similares a los que se utilizan en la industria.",
    ],
    queAprenden: [
      {
        titulo: "Motores de combustión interna",
        detalle:
          "Funcionamiento, armado y desarmado, mediciones y puesta a punto de motores nafteros y diésel.",
      },
      {
        titulo: "Transmisión, dirección y frenos",
        detalle:
          "Cajas de velocidades, embragues, diferenciales, suspensión, sistemas de dirección y frenos hidráulicos y neumáticos.",
      },
      {
        titulo: "Electricidad y electrónica del automotor",
        detalle:
          "Circuitos eléctricos, encendido, carga y arranque, sensores, actuadores e inyección electrónica.",
      },
      {
        titulo: "Diagnóstico y mantenimiento",
        detalle:
          "Uso de scanner, osciloscopio y otros instrumentos para detectar fallas y planificar el mantenimiento preventivo.",
      },
    ],
    tramos: [
      {
        etapa: "Ciclo básico",
        descripcion:
          "Introducción al taller, seguridad e higiene, herramientas manuales, mediciones y nociones básicas de mecánica y electricidad.",
      },
      {
        etapa: "Ciclo superior",
        descripcion:
          "Sistemas del automotor, diagnóstico, electrónica aplicada, prácticas profesionalizantes y proyecto integrador.",
      },
    ],
    salidaLaboral: [
      "Talleres mecánicos y concesionarias oficiales",
      "Servicios de mantenimiento de flotas y transporte",
      "Estaciones de servicio y centros de diagnóstico",
      "Emprendimiento propio: taller mecánico independiente",
    ],
    continuarEstudios: [
      "Ingeniería Electromecánica y Mecánica",
      "Tecnicaturas superiores en el área automotriz",
      "Cursos de actualización en nuevas tecnologías del automotor",
    ],
    espacios: [
      "Taller de automotores",
      "Banco de pruebas y herramental específico",
      "Aula de informática para simulación y diagnóstico",
    ],
    perfil: [
      "Interés por la mecánica y el funcionamiento de las máquinas",
      "Capacidad para resolver problemas de forma práctica",
      "Responsabilidad y cuidado en el trabajo con herramientas",
    ],
  },
  {
    slug: "informatica",
    nombre: "Informática",
    titulo: "Técnico en Informática",
    resumen:
      "Desarrollo de software, administración de sistemas, redes informáticas, bases de datos y aplicaciones.",
    presentacion: [
      "La especialidad Informática forma técnicos con conocimientos en programación, redes, bases de datos y soporte de sistemas, preparados para insertarse en un entorno laboral en constante transformación digital.",
      "Los estudiantes desarrollan proyectos reales, aprenden a trabajar en equipo y se familiarizan con las herramientas y los lenguajes más utilizados en la industria del software.",
    ],
    queAprenden: [
      {
        titulo: "Programación y desarrollo de software",
        detalle:
          "Lógica de programación, lenguajes actuales, desarrollo de aplicaciones web y de escritorio.",
      },
      {
        titulo: "Redes y comunicaciones",
        detalle:
          "Diseño, instalación y configuración de redes cableadas e inalámbricas, y nociones de seguridad informática.",
      },
      {
        titulo: "Bases de datos",
        detalle:
          "Modelado, diseño y consulta de bases de datos relacionales para el almacenamiento de información.",
      },
      {
        titulo: "Hardware y soporte técnico",
        detalle:
          "Armado, mantenimiento y reparación de equipos, instalación de sistemas operativos y asistencia al usuario.",
      },
    ],
    tramos: [
      {
        etapa: "Ciclo básico",
        descripcion:
          "Alfabetización digital, herramientas ofimáticas, pensamiento computacional y primeras nociones de hardware.",
      },
      {
        etapa: "Ciclo superior",
        descripcion:
          "Programación, redes, bases de datos, desarrollo web, prácticas profesionalizantes y proyecto integrador.",
      },
    ],
    salidaLaboral: [
      "Desarrollo de software y aplicaciones web",
      "Soporte técnico y administración de sistemas",
      "Administración de redes en empresas e instituciones",
      "Trabajo freelance y emprendimientos tecnológicos",
    ],
    continuarEstudios: [
      "Ingeniería en Sistemas de Información",
      "Licenciatura en Ciencias de la Computación",
      "Tecnicaturas superiores en programación y redes",
    ],
    espacios: [
      "Laboratorio de informática",
      "Laboratorio de redes",
      "Espacio de armado y reparación de equipos",
    ],
    perfil: [
      "Curiosidad por la tecnología y ganas de aprender de forma continua",
      "Pensamiento lógico y ordenado",
      "Interés por crear soluciones digitales",
    ],
  },
  {
    slug: "mecanica",
    nombre: "Mecánica",
    titulo: "Técnico en Mecánica",
    resumen:
      "Diseño, manufactura y mantenimiento de equipos con dominio de máquinas-herramientas, CNC, metrología y soldadura.",
    presentacion: [
      "La especialidad Mecánica forma técnicos que diseñan, fabrican y mantienen piezas, equipos e instalaciones industriales, aplicando normas de calidad y de seguridad en todo el proceso productivo.",
      "Desde el primer año los estudiantes trabajan en taller con máquinas-herramientas, aprendiendo a interpretar planos y a transformar un diseño en una pieza terminada.",
    ],
    queAprenden: [
      {
        titulo: "Dibujo técnico y diseño",
        detalle:
          "Interpretación y elaboración de planos, normas de dibujo y diseño asistido por computadora (CAD).",
      },
      {
        titulo: "Máquinas-herramientas y CNC",
        detalle:
          "Operación de torno, fresadora, taladro y máquinas de control numérico computarizado.",
      },
      {
        titulo: "Metrología y control de calidad",
        detalle:
          "Uso de instrumentos de medición de precisión y verificación de tolerancias.",
      },
      {
        titulo: "Soldadura y procesos industriales",
        detalle:
          "Técnicas de soldadura, conformado de materiales y organización de procesos de producción.",
      },
    ],
    tramos: [
      {
        etapa: "Ciclo básico",
        descripcion:
          "Seguridad en el taller, herramientas manuales, ajuste, mediciones básicas y dibujo técnico inicial.",
      },
      {
        etapa: "Ciclo superior",
        descripcion:
          "Mecanizado, CNC, soldadura, mantenimiento industrial, prácticas profesionalizantes y proyecto integrador.",
      },
    ],
    salidaLaboral: [
      "Industria metalmecánica y de autopartes",
      "Mantenimiento de maquinaria agrícola e industrial",
      "Talleres de matricería, mecanizado y soldadura",
      "Emprendimiento propio: taller de fabricación y reparación",
    ],
    continuarEstudios: [
      "Ingeniería Mecánica e Industrial",
      "Ingeniería Electromecánica",
      "Tecnicaturas superiores en mecatrónica y mantenimiento industrial",
    ],
    espacios: [
      "Taller de mecánica general",
      "Sector de máquinas-herramientas",
      "Sala de metrología y dibujo técnico",
    ],
    perfil: [
      "Gusto por construir, armar y reparar",
      "Precisión, orden y atención al detalle",
      "Interés por la industria y los procesos productivos",
    ],
  },
  {
    slug: "electronica",
    nombre: "Electrónica",
    titulo: "Técnico en Electrónica",
    resumen:
      "Circuitos analógicos y digitales, electrónica industrial, sistemas de control, telecomunicaciones y energías renovables.",
    presentacion: [
      "La especialidad Electrónica forma técnicos que diseñan, construyen, reparan y ponen en funcionamiento circuitos y sistemas electrónicos, desde dispositivos simples hasta equipos de automatización y control.",
      "Mediante prácticas de laboratorio y proyectos, los estudiantes se acercan a áreas de gran crecimiento como la automatización, la robótica, el Internet de las Cosas (IoT) y las energías renovables.",
    ],
    queAprenden: [
      {
        titulo: "Circuitos analógicos y digitales",
        detalle:
          "Análisis, diseño y armado de circuitos con componentes electrónicos, y sistemas lógicos digitales.",
      },
      {
        titulo: "Microcontroladores y automatización",
        detalle:
          "Programación de microcontroladores, sensores y actuadores para sistemas de control automático.",
      },
      {
        titulo: "Electrónica industrial y potencia",
        detalle:
          "Control de motores, fuentes de alimentación y equipos de uso industrial.",
      },
      {
        titulo: "Telecomunicaciones y energías renovables",
        detalle:
          "Fundamentos de comunicaciones, antenas y sistemas de generación de energía solar.",
      },
    ],
    tramos: [
      {
        etapa: "Ciclo básico",
        descripcion:
          "Seguridad eléctrica, magnitudes y mediciones, componentes básicos y primeros circuitos.",
      },
      {
        etapa: "Ciclo superior",
        descripcion:
          "Electrónica digital, microcontroladores, control industrial, telecomunicaciones, prácticas profesionalizantes y proyecto integrador.",
      },
    ],
    salidaLaboral: [
      "Reparación y mantenimiento de equipos electrónicos",
      "Automatización y control en industrias",
      "Empresas de telecomunicaciones y energía",
      "Diseño y desarrollo de proyectos propios",
    ],
    continuarEstudios: [
      "Ingeniería Electrónica y Eléctrica",
      "Ingeniería en Telecomunicaciones",
      "Tecnicaturas superiores en robótica, automatización y energías renovables",
    ],
    espacios: [
      "Laboratorio de electrónica",
      "Banco de instrumentos de medición",
      "Espacio de proyectos con microcontroladores",
    ],
    perfil: [
      "Interés por la tecnología, la robótica y la automatización",
      "Curiosidad por descubrir cómo funcionan los dispositivos",
      "Paciencia y prolijidad en el trabajo de precisión",
    ],
  },
]

export function getEspecialidad(slug: string) {
  return especialidades.find((e) => e.slug === slug)
}
