"use client"

import { Dialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import { FormularioInscripcion } from "@/components/oportunidades/formulario-inscripcion"

export function InscripcionDialog({
  oportunidadId,
  titulo,
}: {
  oportunidadId: string
  titulo: string
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="mt-4 inline-flex items-center justify-center px-3 py-2 rounded text-sm font-semibold cursor-pointer"
        style={{ backgroundColor: "var(--red-oxide)", color: "#FFFFFF" }}
      >
        Inscribirse online
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop
          className="fixed inset-0 z-50 transition-opacity duration-150 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
        />
        <Dialog.Viewport className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4">
          <Dialog.Popup
            className="relative w-full max-w-lg rounded-lg p-6 sm:p-8 outline-none transition-all duration-150 data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:scale-95"
            style={{ backgroundColor: "var(--bg-white)" }}
          >
            <Dialog.Close
              aria-label="Cerrar"
              className="absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded cursor-pointer"
              style={{ color: "var(--text-secondary)" }}
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </Dialog.Close>
            <Dialog.Title
              className="text-xl font-bold pr-10"
              style={{ color: "var(--text-primary)" }}
            >
              Inscripción a {titulo}
            </Dialog.Title>
            <Dialog.Description
              className="text-sm mt-1 mb-5 leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Completá tus datos y el colegio se comunicará con vos.
            </Dialog.Description>
            <FormularioInscripcion oportunidadId={oportunidadId} titulo={titulo} sinMarco />
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
