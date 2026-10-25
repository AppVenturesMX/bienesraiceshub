# Quemar marca de agua en fotos de propiedades

Script que "imprime" (quema en los píxeles) la marca de Bienes Raíces Hub —
el mismo ícono casa + 3 nodos conectados (`HubMark`) y el mismo badge circular
blanco que ya usa el overlay CSS (`components/photo-watermark.tsx`) en los 8
sitios — directamente en el archivo de la foto, antes de subirla al portal.

## Por qué existe

El overlay CSS (`PhotoWatermark`) solo se dibuja encima de la foto *en el
navegador*. El archivo de imagen que se sirve públicamente no tiene ninguna
marca: quien haga clic derecho → "Guardar imagen como", o copie la URL directa
de la foto, se lleva el archivo limpio, sin marca. Este script resuelve esa
brecha para fotos nuevas, quemando la marca en los píxeles del archivo que se
sube al repo — así una descarga o copia directa también se lleva la marca.

**Decisión de Alex (25 oct 2026):** solo se aplica a fotos nuevas de aquí en
adelante, como paso del proceso de alta de propiedades. No se reprocesan
retroactivamente las fotos ya publicadas en las 8 propiedades existentes (esas
siguen protegidas solo por el overlay CSS en pantalla).

## Cuándo usarlo

Paso obligatorio al dar de alta una propiedad nueva (ver
`bienes-raices-hub-proceso-alta-propiedades.md` en el proyecto de Claude):
correr este script sobre cada foto **antes** de subirla al repo de la
propiedad (ya sea una landing independiente o `public/images/properties/<slug>/`
en el Hub).

## Requisitos

```
pip install Pillow cairosvg --break-system-packages
```

## Uso

```bash
# Una foto, archivo de salida distinto
python3 burn_watermark.py fachada.jpg fachada-marcada.jpg

# Una foto, sobreescribir el mismo archivo
python3 burn_watermark.py --inplace fachada.jpg

# Todas las fotos de una carpeta (sobreescribe cada una)
python3 burn_watermark.py --dir fotos-propiedad-nueva/
```

## Qué hace exactamente

- Calcula el tamaño del badge como ~11% del lado corto de la foto (con un piso
  mínimo de 72px), para que se vea proporcionado tanto en fotos grandes como
  en miniaturas.
- Dibuja el mismo círculo blanco semi-transparente con sombra suave que el
  badge CSS (`bg-white/90 shadow-lg ring-1 ring-black/5`).
- Renderiza el ícono `HubMark` exacto (SVG de `components/hub-mark.tsx`,
  color `emerald-700` / `#047857`) centrado en el badge, al ~62% del diámetro
  — la misma proporción icono/badge que el CSS.
- Coloca el badge en la esquina inferior derecha, con el mismo margen relativo
  que usa el overlay.
- Guarda como JPEG calidad 92.

Si en algún momento cambia el diseño del badge CSS (tamaño, opacidad, colores),
hay que actualizar las constantes `BADGE_RATIO`, `MARGIN_RATIO`, `ICON_RATIO`
y el SVG embebido (`HUBMARK_SVG`) en este script para que seguro consistente.
