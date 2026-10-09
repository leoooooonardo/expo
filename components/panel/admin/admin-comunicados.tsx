"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  FileText,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  Eye,
  Megaphone,
} from "lucide-react"
import type { ComunicadoItem } from "../panel-types"
import type { Categoria, Rol, Anio } from "@/lib/types"
import { ROLES, ANIOS } from "@/lib/data/roles"

const CATEGORIAS: { value: Categoria; label: string }[] = [
  { value: "institucional", label: "Institucional" },
  { value: "academico", label: "Académico" },
  { value: "admisiones", label: "Admisiones" },
  { value: "vida-escolar", label: "Vida escolar" },
  { value: "oportunidades", label: "Oportunidades" },
  { value: "comunidad", label: "Comunidad" },
]

interface AdminComunicadosProps {
  comunicados: ComunicadoItem[]
  setComunicados: React.Dispatch<React.SetStateAction<ComunicadoItem[]>>
  formularioAbierto: boolean
  setFormularioAbierto: (val: boolean) => void
  itemEditando: ComunicadoItem | null
  setItemEditando: (item: ComunicadoItem | null) => void
}

export function AdminComunicados({
  comunicados,
  setComunicados,
  formularioAbierto,
  setFormularioAbierto,
  itemEditando,
  setItemEditando,
}: AdminComunicadosProps) {
  const [busqueda, setBusqueda] = useState("")
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todas")
  const [filtroEstado, setFiltroEstado] = useState<string>("todos")

  // Estado del formulario
  const [form, setForm] = useState<Omit<ComunicadoItem, "id">>({
    titulo: "",
    resumen: "",
    contenido: "",
    categoria: "institucional",
    fecha: new Date().toISOString().split("T")[0],
    roles: [],
    anios: [],
    estado: "publicado",
    destacado: false,
    autor: "Equipo de Gestión",
  })

  function abrirNuevo() {
    setForm({
      titulo: "",
      resumen: "",
      contenido: "",
      categoria: "institucional",
      fecha: new Date().toISOString().split("T")[0],
      roles: [],
      anios: [],
      estado: "publicado",
      destacado: false,
      autor: "Equipo de Gestión",
    })
    setItemEditando(null)
    setFormularioAbierto(true)
  }

  function abrirEdicion(item: ComunicadoItem) {
    const { id, ...resto } = item
    setForm(resto)
    setItemEditando(item)
    setFormularioAbierto(true)
  }

  function cerrarFormulario() {
    setFormularioAbierto(false)
    setItemEditando(null)
  }

  function toggleRol(rol: Rol) {
    setForm((f) => ({
      ...f,
      roles: f.roles.includes(rol) ? f.roles.filter((r) => r !== rol) : [...f.roles, rol],
    }))
  }

  function toggleAnio(anio: Anio) {
    setForm((f) => ({
      ...f,
      anios: f.anios.includes(anio) ? f.anios.filter((a) => a !== anio) : [...f.anios, anio],
    }))
  }

  function guardar(e: React.FormEvent) {
    e.preventDefault()
    if (itemEditando) {
      setComunicados((prev) =>
        prev.map((c) => (c.id === itemEditando.id ? { ...form, id: itemEditando.id } : c)),
      )
    } else {
      const nuevo: ComunicadoItem = {
        ...form,
        id: `com-${Date.now()}`,
      }
      setComunicados((prev) => [nuevo, ...prev])
    }
    cerrarFormulario()
  }

  function eliminar(id: string) {
    if (confirm("¿Estás seguro de que deseas eliminar este comunicado?")) {
      setComunicados((prev) => prev.filter((c) => c.id !== id))
    }
  }

  // Filtrado
  const filtrados = comunicados.filter((item) => {
    const coincideTexto =
      item.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      (item.resumen && item.resumen.toLowerCase().includes(busqueda.toLowerCase()))
    const coincideCat = filtroCategoria === "todas" || item.categoria === filtroCategoria
    const coincideEst = filtroEstado === "todos" || item.estado === filtroEstado
    return coincideTexto && coincideCat && coincideEst
  })

  return (
    <div className="space-y-6">
      {/* Barra de Filtros y Búsqueda */}
      <div
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border p-4 shadow-xs"
        style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
      >
        <div className="flex flex-1 flex-col sm:flex-row items-center gap-3">
          {/* Buscador */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar por título o palabra clave..."
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

          {/* Filtro Categoría */}
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="w-full sm:w-auto rounded-xl border px-3 py-2 text-xs font-semibold focus:outline-none"
            style={{
              borderColor: "var(--border-color)",
              backgroundColor: "var(--bg-white)",
              color: "var(--text-primary)",
            }}
          >
            <option value="todas">Todas las categorías</option>
            {CATEGORIAS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>

          {/* Filtro Estado */}
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="w-full sm:w-auto rounded-xl border px-3 py-2 text-xs font-semibold focus:outline-none"
            style={{
              borderColor: "var(--border-color)",
              backgroundColor: "var(--bg-white)",
              color: "var(--text-primary)",
            }}
          >
            <option value="todos">Todos los estados</option>
            <option value="publicado">Publicados</option>
            <option value="borrador">Borradores</option>
          </select>
        </div>

        <button
          type="button"
          onClick={abrirNuevo}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
          style={{ backgroundColor: "var(--red-oxide)" }}
        >
          <Plus className="w-4 h-4" />
          Nuevo Comunicado
        </button>
      </div>

      {/* Modal / Panel de Creación y Edición */}
      {formularioAbierto && (
        <div
          className="rounded-3xl border p-6 md:p-8 shadow-md"
          style={{
            borderColor: "var(--gold-primary)",
            backgroundColor: "var(--bg-light)",
          }}
        >
          <div className="flex items-center justify-between pb-4 border-b mb-6" style={{ borderColor: "var(--border-color)" }}>
            <div className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-[var(--gold-primary)]" />
              <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                {itemEditando ? "Editar Comunicado Institucional" : "Redactar Nuevo Comunicado"}
              </h3>
            </div>
            <button
              type="button"
              onClick={cerrarFormulario}
              className="rounded-lg p-1.5 transition-colors hover:bg-neutral-200"
              style={{ color: "var(--text-muted)" }}
              aria-label="Cerrar formulario"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={guardar} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="block md:col-span-2">
                <span className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
                  Título del comunicado *
                </span>
                <input
                  type="text"
                  required
                  placeholder="Ej: Cronograma de Exámenes de Diciembre 2026..."
                  value={form.titulo}
                  onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))}
                  className="w-full rounded-xl border px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:ring-2"
                  style={{
                    borderColor: "var(--border-color)",
                    backgroundColor: "var(--bg-white)",
                    color: "var(--text-primary)",
                  }}
                />
              </label>

              <label className="block">
                <span className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
                  Categoría
                </span>
                <select
                  value={form.categoria}
                  onChange={(e) => setForm((f) => ({ ...f, categoria: e.target.value as Categoria }))}
                  className="w-full rounded-xl border px-3.5 py-2.5 text-xs font-semibold focus:outline-none"
                  style={{
                    borderColor: "var(--border-color)",
                    backgroundColor: "var(--bg-white)",
                    color: "var(--text-primary)",
                  }}
                >
                  {CATEGORIAS.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Resumen breve (subtítulo para listados)
              </span>
              <input
                type="text"
                placeholder="Breve descripción que aparecerá en la vista previa del inicio..."
                value={form.resumen}
                onChange={(e) => setForm((f) => ({ ...f, resumen: e.target.value }))}
                className="w-full rounded-xl border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2"
                style={{
                  borderColor: "var(--border-color)",
                  backgroundColor: "var(--bg-white)",
                  color: "var(--text-primary)",
                }}
              />
            </label>

            <label className="block">
              <span className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Cuerpo del comunicado / Circular completa
              </span>
              <textarea
                rows={4}
                placeholder="Detalle completo de la noticia, fechas, aulas, requisitos..."
                value={form.contenido}
                onChange={(e) => setForm((f) => ({ ...f, contenido: e.target.value }))}
                className="w-full rounded-xl border p-3.5 text-xs leading-relaxed focus:outline-none focus:ring-2"
                style={{
                  borderColor: "var(--border-color)",
                  backgroundColor: "var(--bg-white)",
                  color: "var(--text-primary)",
                }}
              />
            </label>

            {/* Audiencia por rol */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>
                Audiencia objetivo (dejar vacío para toda la comunidad)
              </span>
              <div className="flex flex-wrap gap-2">
                {ROLES.map((r) => {
                  const activo = form.roles.includes(r.value)
                  return (
                    <button
                      type="button"
                      key={r.value}
                      onClick={() => toggleRol(r.value)}
                      className="rounded-full border px-3 py-1 text-xs font-semibold transition-all"
                      style={{
                        borderColor: activo ? "var(--gold-primary)" : "var(--border-color)",
                        backgroundColor: activo ? "var(--gold-primary)" : "var(--bg-white)",
                        color: activo ? "#1A1A1A" : "var(--text-secondary)",
                      }}
                    >
                      {r.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Años/Cursos destinatarios */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>
                Años lectivos a los que aplica (opcional)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {ANIOS.map((a) => {
                  const activo = form.anios.includes(a.value)
                  return (
                    <button
                      type="button"
                      key={a.value}
                      onClick={() => toggleAnio(a.value)}
                      className="rounded-lg border px-2.5 py-1 text-xs font-mono font-bold transition-all"
                      style={{
                        borderColor: activo ? "var(--red-oxide)" : "var(--border-color)",
                        backgroundColor: activo ? "var(--red-oxide)" : "var(--bg-white)",
                        color: activo ? "#FFFFFF" : "var(--text-secondary)",
                      }}
                    >
                      {a.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t" style={{ borderColor: "var(--border-color)" }}>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.estado === "publicado"}
                    onChange={(e) => setForm((f) => ({ ...f, estado: e.target.checked ? "publicado" : "borrador" }))}
                    className="h-4 w-4 rounded accent-[var(--red-oxide)]"
                  />
                  <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                    Publicar de inmediato
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.destacado}
                    onChange={(e) => setForm((f) => ({ ...f, destacado: e.target.checked }))}
                    className="h-4 w-4 rounded accent-[var(--gold-primary)]"
                  />
                  <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                    Fijar como destacado en portada
                  </span>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={cerrarFormulario}
                  className="rounded-xl border px-4 py-2 text-xs font-bold transition-colors hover:bg-neutral-100"
                  style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl px-5 py-2 text-xs font-bold text-white shadow-sm transition-transform hover:scale-105"
                  style={{ backgroundColor: "var(--red-oxide)" }}
                >
                  {itemEditando ? "Guardar Modificaciones" : "Crear Comunicado"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Lista de Comunicados con Tarjetas Modernas */}
      <div
        className="overflow-hidden rounded-2xl border shadow-xs"
        style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
      >
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border-color)" }}>
          <h3 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
            Listado de Comunicados ({filtrados.length})
          </h3>
          <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
            Total registros: {comunicados.length}
          </span>
        </div>

        {filtrados.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="mx-auto w-10 h-10 mb-3 text-neutral-300" />
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              No se encontraron comunicados
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Probá ajustando la búsqueda o creá uno nuevo.
            </p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "var(--border-color)" }}>
            {filtrados.map((item) => (
              <div
                key={item.id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:bg-neutral-50"
              >
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-md px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: item.estado === "publicado" ? "#E7F1E9" : "#F3F3F3",
                        color: item.estado === "publicado" ? "#2F6B3C" : "var(--text-muted)",
                      }}
                    >
                      {item.estado}
                    </span>
                    {item.destacado && (
                      <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Destacado
                      </span>
                    )}
                    <span
                      className="rounded-md px-2 py-0.5 text-[10px] font-semibold"
                      style={{ backgroundColor: "rgba(212, 167, 44, 0.15)", color: "#8A6D1F" }}
                    >
                      {item.categoria}
                    </span>
                    <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                      {item.fecha}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold leading-snug" style={{ color: "var(--text-primary)" }}>
                    {item.titulo}
                  </h4>

                  {item.resumen && (
                    <p className="text-xs line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                      {item.resumen}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono" style={{ color: "var(--text-muted)" }}>
                    <span>Destinado a: {item.roles.length === 0 ? "Comunidad general" : item.roles.join(", ")}</span>
                    {item.anios.length > 0 && <span>· Años: {item.anios.join(", ")}°</span>}
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => abrirEdicion(item)}
                    className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors hover:bg-neutral-100"
                    style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => eliminar(item.id)}
                    className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors hover:bg-red-50"
                    style={{ borderColor: "var(--border-color)", color: "var(--red-oxide)" }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Eliminar
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
