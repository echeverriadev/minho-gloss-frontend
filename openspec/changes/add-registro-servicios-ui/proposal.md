# Proposal

## Why

Registrar cada servicio es la tarea que más se repite en el día, y se hace de pie en el patio. Si toma más de unos segundos, los empleados dejarán de hacerlo y las métricas no servirán. La pantalla de inicio tiene que ser el registro rápido.

## What Changes

- Pantalla de inicio (`/`) con el botón principal "Registrar servicio" y el resumen de los servicios del día.
- Flujo de registro (`/servicios/nuevo`) en pasos cortos: placa → (cliente nuevo rápido si no existe) → tipo de servicio → precio y método de pago → guardar.
- Lista de servicios prestados (`/servicios`) con filtro por día y totales; el admin puede elegir cualquier fecha.
- Edición del método de pago y notas, y anulación con motivo para el admin.

Fuera de alcance: registrar varios servicios a la vez, escanear placas con la cámara y recibos impresos o por WhatsApp.

## Capabilities

### New Capabilities
- `registro-servicios`: registro rápido y consulta de los servicios prestados del día.

### Modified Capabilities

## Impact

- Código nuevo: `src/features/servicios-prestados/` (api, tipos, `RegistroServicioFlow`, `ServicioPrestadoCard`, `ResumenDia`) y páginas `InicioPage`, `ServiciosPage` y `RegistrarServicioPage`.
- Usa `@/features/clientes` (búsqueda por placa y alta rápida) y `@/features/tipos-servicio` (catálogo y precio de lista).
- Reemplaza la página de inicio de prueba actual (`HomePage`).
- Depende de `add-clientes-ui`, `add-catalogo-servicios-ui` y del cambio `add-servicios-prestados` del backend.
