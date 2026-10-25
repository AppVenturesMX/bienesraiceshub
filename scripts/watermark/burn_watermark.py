#!/usr/bin/env python3
"""
Quema la marca de agua del Hub (HubMark: casa + 3 nodos conectados) directamente
en los pixeles de una foto de propiedad, replicando el mismo diseño que ya usa
el overlay CSS (components/photo-watermark.tsx) en los 8 sitios: badge circular
blanco semi-transparente con sombra, en la esquina inferior derecha, con el
icono HubMark completo en emerald-700.

Motivo: el overlay CSS solo se ve en pantalla -- un "guardar imagen como" o una
URL directa a la foto se lleva el archivo limpio, sin marca. Esta es la pieza
que falta para que las fotos descargadas o copiadas tambien lleven la marca.

Uso:
    python3 burn_watermark.py entrada.jpg salida.jpg
    python3 burn_watermark.py --inplace foto.jpg          # sobreescribe el mismo archivo
    python3 burn_watermark.py --dir carpeta/               # procesa todas las fotos de una carpeta

Alcance (decision de Alex, 25 oct 2026): solo fotos nuevas de aqui en adelante,
como paso del proceso de alta de propiedades -- no se reprocesan retroactivamente
las ~100 fotos ya publicadas en las 8 propiedades.
"""
import sys
import io
import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter
import cairosvg

# SVG exacto de HubMark (components/hub-mark.tsx), color emerald-700 (#047857)
# sustituido por currentColor. Opacidades de lineas/nodos iguales al original.
HUBMARK_SVG = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <g stroke="#047857" stroke-width="2" stroke-linecap="round" opacity="0.5">
    <line x1="42" y1="34" x2="55" y2="17" />
    <line x1="42" y1="38" x2="59" y2="36" />
    <line x1="42" y1="44" x2="55" y2="53" />
  </g>
  <polygon points="20,32 32,22 44,32" fill="#047857" />
  <rect x="22" y="32" width="20" height="16" fill="#047857" />
  <circle cx="55" cy="17" r="5" fill="#047857" opacity="0.55" />
  <circle cx="59" cy="36" r="5" fill="#047857" opacity="0.55" />
  <circle cx="55" cy="53" r="5" fill="#047857" opacity="0.55" />
</svg>
"""

# Proporciones calcadas del badge CSS (h-16/h-20 sobre un hero de ~520-620px
# de ancho mostrado en pantalla, icono h-10/h-12 dentro del badge h-16/h-20):
# icono ~62% del diametro del badge, badge ~11% del lado corto de la foto,
# margen ~3.2% del lado corto.
BADGE_RATIO = 0.11
MARGIN_RATIO = 0.032
ICON_RATIO = 0.62  # del diametro del badge


def render_icon(diameter_px: int) -> Image.Image:
    png_bytes = cairosvg.svg2png(
        bytestring=HUBMARK_SVG.encode("utf-8"),
        output_width=diameter_px,
        output_height=diameter_px,
    )
    return Image.open(io.BytesIO(png_bytes)).convert("RGBA")


def burn_watermark(src_path: Path, dst_path: Path) -> None:
    base = Image.open(src_path).convert("RGBA")
    w, h = base.size
    short_side = min(w, h)

    badge_d = max(round(short_side * BADGE_RATIO), 72)  # piso para fotos pequenas
    margin = max(round(short_side * MARGIN_RATIO), 14)
    icon_d = round(badge_d * ICON_RATIO)

    # Lienzo del badge con margen extra para que la sombra no se recorte
    pad = round(badge_d * 0.25)
    canvas_d = badge_d + pad * 2
    badge_layer = Image.new("RGBA", (canvas_d, canvas_d), (0, 0, 0, 0))

    # Sombra: circulo oscuro difuminado, levemente desplazado hacia abajo
    shadow = Image.new("RGBA", (canvas_d, canvas_d), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.ellipse(
        [pad - 2, pad + 3, pad + badge_d + 2, pad + badge_d + 7],
        fill=(0, 0, 0, 70),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=max(badge_d * 0.06, 3)))
    badge_layer = Image.alpha_composite(badge_layer, shadow)

    # Circulo blanco semi-transparente (bg-white/90) con anillo sutil (ring-black/5)
    circle_draw = ImageDraw.Draw(badge_layer)
    circle_draw.ellipse(
        [pad, pad, pad + badge_d, pad + badge_d],
        fill=(255, 255, 255, 230),
        outline=(0, 0, 0, 13),
        width=max(round(badge_d * 0.012), 1),
    )

    # Icono centrado
    icon = render_icon(icon_d)
    icon_pos = (pad + (badge_d - icon_d) // 2, pad + (badge_d - icon_d) // 2)
    badge_layer.alpha_composite(icon, dest=icon_pos)

    # Posicion final: esquina inferior derecha de la foto, con margen
    dest_x = w - margin - canvas_d + pad
    dest_y = h - margin - canvas_d + pad
    base.alpha_composite(badge_layer, dest=(dest_x, dest_y))

    out = base.convert("RGB")
    dst_path.parent.mkdir(parents=True, exist_ok=True)
    out.save(dst_path, "JPEG", quality=92, optimize=True)


def main():
    parser = argparse.ArgumentParser(description="Quema el watermark HubMark en fotos de propiedades")
    parser.add_argument("input", nargs="?", help="Foto de entrada, o carpeta con --dir")
    parser.add_argument("output", nargs="?", help="Foto de salida (omitir con --inplace o --dir)")
    parser.add_argument("--inplace", action="store_true", help="Sobreescribe el mismo archivo de entrada")
    parser.add_argument("--dir", action="store_true", help="Procesa todas las .jpg/.jpeg/.png de la carpeta 'input' (sobreescribe cada una)")
    args = parser.parse_args()

    if not args.input:
        parser.error("Falta la ruta de entrada")

    if args.dir:
        folder = Path(args.input)
        exts = {".jpg", ".jpeg", ".png"}
        photos = sorted(p for p in folder.iterdir() if p.suffix.lower() in exts)
        if not photos:
            print(f"No se encontraron fotos en {folder}")
            return
        for p in photos:
            burn_watermark(p, p)
            print(f"OK  {p}")
        print(f"\n{len(photos)} foto(s) procesadas en {folder}")
        return

    src = Path(args.input)
    if args.inplace:
        burn_watermark(src, src)
        print(f"OK  {src} (sobreescrita con marca)")
    else:
        if not args.output:
            parser.error("Falta la ruta de salida (o usa --inplace)")
        dst = Path(args.output)
        burn_watermark(src, dst)
        print(f"OK  {src} -> {dst}")


if __name__ == "__main__":
    main()
