import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const inscripcionesOportunidades = pgTable("inscripciones_oportunidades", {
  id: serial("id").primaryKey(),
  oportunidadId: text("oportunidad_id").notNull(),
  nombre: text("nombre").notNull(),
  dni: text("dni").notNull(),
  email: text("email").notNull(),
  telefono: text("telefono"),
  anio: text("anio"),
  tutor: text("tutor"),
  mensaje: text("mensaje"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})
