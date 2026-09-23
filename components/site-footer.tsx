import { SITE_NAME } from "@/lib/site"

type SiteFooterProps = {
  /** Disclaimer específico de la propiedad mostrada (precio, fotos, etc.). Se omite en el home del Hub. */
  disclaimer?: string
}

export function SiteFooter({ disclaimer }: SiteFooterProps) {
  return (
    <footer className="border-t border-emerald-100 bg-slate-50 py-10">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="text-lg font-bold text-slate-800">{SITE_NAME}</span>

        {disclaimer && (
          <p className="mt-4 text-sm leading-relaxed text-slate-500">{disclaimer}</p>
        )}

        <p className="mt-4 text-sm text-slate-500">
          <a
            href="/docs/AVISO-DE-PRIVACIDAD-MYPO-GLOBAL.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-emerald-700"
          >
            Aviso de privacidad
          </a>
        </p>
        <p className="mt-4 text-sm text-slate-500">
          Este sitio y su contenido son propiedad y responsabilidad de Mypo Global Business, S.A.P.I. de C.V.
        </p>
        <p className="mt-4 text-sm text-slate-500">
          © 2026 Mypo Global Business, S.A.P.I. de C.V. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
