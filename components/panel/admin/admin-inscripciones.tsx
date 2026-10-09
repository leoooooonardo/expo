"use client"

import { useState } from "react"
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Mail,
  Phone,
  FileCheck,
  Check,
  X,
  Filter,
} from "lucide-react"
import type { InscripcionRegistro } from "../panel-types"

interface AdminInscripcionesProps {
  inscripciones: InscripcionRegistro[]
  setInscripciones: React.Dispatch<React.SetStateAction<InscripcionRegistro[]>>
}

export function AdminInscripciones({
  inscripciones,
  setInscripciones,
}: AdminInscripcionesProps) {
  const [busqueda, setBusqueda] = useState("")
  const [filtroEstado, setFiltroEstado] = useState<string>("todos")

  function cambiarEstado(id: string, nuevoEstado: "pendiente" | "aprobada" | "observada") {
    setInscripciones((prev) =>
      prev.map((ins) => (ins.id === id ? { ...ins, estado: nuevoEstado } : ins)),
    )
  }

  const filtradas = inscripciones.filter((ins) => {
    const coincideTexto =
      ins.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      ins.dni.includes(busqueda) ||
      ins.tituloOportunidad.toLowerCase().includes(busqueda.toLowerCase())
    const coincideEstado = filtroEstado === "todos" || ins.estado === filtroEstado
    return coincideTexto && coincideEstado
  })

  return (
    <div className="space-y-6">
      {/* Barra de Filtros */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border p-4 shadow-xs"
        style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
      >
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Buscar por alumno, DNI o trámite..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full rounded-xl border pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2"
            style={{
              borderColor: "var(--border-color)",
              backgroundColor: "var(--bg-light)",
              color: "var(--text-primary)",
            }}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-neutral-400" />
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="rounded-xl border px-3 py-2 text-xs font-semibold focus:outline-none w-full sm:w-auto"
            style={{
              borderColor: "var(--border-color)",
              backgroundColor: "var(--bg-white)",
              color: "var(--text-primary)",
            }}
          >
            <option value="todos">Todos los estados</option>
            <option value="pendiente">Solo Pendientes</option>
            <option value="aprobada">Solo Aprobadas</option>
            <option value="observada">Solo Observadas</option>
          </select>
        </div>
      </div>

      {/* Listado / Tabla de Inscripciones */}
      <div
        className="overflow-hidden rounded-2xl border shadow-xs"
        style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
      >
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border-color)" }}>
          <h3 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
            Solicitudes Registradas ({filtradas.length})
          </h3>
          <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
            Postulaciones online
          </span>
        </div>

        {filtradas.length === 0 ? (
          <div className="p-12 text-center">
            <ClipboardList className="mx-auto w-10 h-10 mb-3 text-neutral-300" />
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              No hay solicitudes con ese criterio
            </p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "var(--border-color)" }}>
            {filtradas.map((ins) => (
              <div
                key={ins.id}
                className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-colors hover:bg-neutral-50"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-md px-2 py-0.5 text-[10px] font-mono font-bold uppercase"
                      style={{
                        backgroundColor:
                          ins.estado === "aprobada"
                            ? "#E7F1E9"
                            : ins.estado === "observada"
                            ? "#FDE8E8"
                            : "#FEF3C7",
                        color:
                          ins.estado === "aprobada"
                            ? "#2F6B3C"
                            : ins.estado === "observada"
                            ? "#9B1C1C"
                            : "#92400E",
                      }}
                    >
                      {ins.estado}
                    </span>
                    <span className="text-xs font-bold" style={{ color: "var(--gold-primary)" }}>
                      {ins.tituloOportunidad}
                    </span>
                    <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                      · {ins.fecha}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                    {ins.nombre}{" "}
                    <span className="font-normal font-mono text-xs text-neutral-500">
                      (DNI: {ins.dni})
                    </span>
                  </h4>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-600">
                    {ins.anio && <span>Curso: {ins.anio}</span>}
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-neutral-400" />
                      {ins.email}
                    </span>
                    {ins.telefono && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-neutral-400" />
                        {ins.telefono}
                      </span>
                    )}
                  </div>
                </div>

                {/* Botones de Cambio de Estado Rápido */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => cambiarEstado(ins.id, "aprobada")}
                    className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                      ins.estado === "aprobada"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-bold"
                        : "hover:bg-neutral-100 text-neutral-600 border-neutral-300"
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 inline mr-1" />
                    Aprobar
                  </button>

                  <button
                    type="button"
                    onClick={() => cambiarEstado(ins.id, "observada")}
                    className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                      ins.estado === "observada"
                        ? "bg-rose-50 text-rose-700 border-rose-300 font-bold"
                        : "hover:bg-neutral-100 text-neutral-600 border-neutral-300"
                    }`}
                  >
                    <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
                    Observar
                  </button>

                  <button
                    type="button"
                    onClick={() => cambiarEstado(ins.id, "pendiente")}
                    className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                      ins.estado === "pendiente"
                        ? "bg-amber-50 text-amber-800 border-amber-300 font-bold"
                        : "hover:bg-neutral-100 text-neutral-600 border-neutral-300"
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 inline mr-1" />
                    Pendiente
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
