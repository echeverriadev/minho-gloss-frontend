# Design

## Context

Las métricas se miran en el celular, con pocos datos por gráfico (hasta 31 barras por mes). El bundle debe seguir siendo liviano para redes móviles.

## Goals / Non-Goals

**Goals:**
- Lectura clara en 360 px.
- Cero dependencias nuevas si es posible.

**Non-Goals:**
- Gráficos interactivos complejos (zoom, series múltiples).

## Decisions

1. **Gráfico de barras propio con divs y Tailwind** (altura proporcional al máximo, etiqueta del valor al tocar la barra). Alternativas: Recharts (unos 100 KB comprimidos) o Chart.js; se reconsideran si se piden gráficos más complejos.
2. **Periodo en la URL** (`?periodo=semana` o `?desde=&hasta=`) para poder recargar y compartir la vista.
3. **Semana de lunes a domingo** y fechas calculadas en `Europe/Lisbon` con `Intl`, sin librería de fechas.
4. **Las dos llamadas (resumen y serie diaria) en paralelo** con `Promise.all` al cambiar el periodo.

## Risks / Trade-offs

- [El gráfico propio es menos accesible que una tabla] → cada gráfico tiene debajo una tabla equivalente visualmente oculta para lectores de pantalla.
