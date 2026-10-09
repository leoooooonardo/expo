"use client"

import { usePathname, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

function rutaPadre(pathname: string) {
  const segmentos = pathname.split("/").filter(Boolean)
  segmentos.pop()
  return segmentos.length ? `/${segmentos.join("/")}` : "/"
}

export function BackButton() {
  const router = useRouter()
  const pathname = usePathname()

  if (pathname === "/") return null

  function volver() {
    // La navegación del preview puede conservar una ruta anterior (como Progresar)
    // en el historial. Volver al padre mantiene el flujo de la sección actual.
    router.push(rutaPadre(pathname))
  }

  return (
    <div
      className="border-b"
      style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--border-color)" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-2 md:px-8">
        <button
          type="button"
          onClick={volver}
          aria-label="Volver a la página anterior"
          className="group inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors hover:bg-[var(--bg-light)] focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            color: "var(--text-primary)",
            borderColor: "var(--border-color)",
            outlineColor: "var(--gold-primary)",
          }}
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          Volver
        </button>
      </div>
    </div>
  )
}
