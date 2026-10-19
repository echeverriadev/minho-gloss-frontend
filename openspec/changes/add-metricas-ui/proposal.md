# Proposal

## Why

El dueño quiere ver de un vistazo cómo va el negocio: cuánto entró hoy, en la semana o en el mes, qué servicios se venden más y qué clientes dejaron de venir. Las métricas del backend solo sirven si se pueden leer cómodamente en el celular.

## What Changes

- Pantalla `/metricas`, solo para admin, con selector de periodo (hoy, ayer, esta semana, este mes, mes anterior y rango personalizado).
- Tarjetas de indicadores: ingresos, cantidad de servicios, ticket promedio y clientes atendidos (nuevos y recurrentes), con la variación frente al periodo anterior.
- Gráfico de barras de la serie diaria, desglose por tipo de servicio, por método de pago y por tipo de vehículo.
- Lista de clientes inactivos con acceso a su ficha y a la post-venta.

Fuera de alcance: exportar a Excel o PDF, comparar periodos arbitrarios y métricas por empleado.

## Capabilities

### New Capabilities
- `panel-metricas`: visualización de las métricas del negocio por periodo.

### Modified Capabilities

## Impact

- Código nuevo: `src/features/metricas/` (api, tipos, `SelectorPeriodo`, `IndicadorCard`, `GraficoBarras`, `DesgloseLista`, `ClientesInactivosList`) y `MetricasPage`.
- Sin librería de gráficos en la v1 (ver `design.md`).
- Depende de `add-app-shell`, `add-auth-ui` y del cambio `add-metricas` del backend.
