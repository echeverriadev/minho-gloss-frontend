# Proposal

## Why

En el patio la forma más rápida de identificar a un cliente es la placa de su vehículo. Este cambio se separó de `add-clientes-ui` en la fase 2, cuando el dueño pidió primero la gestión de los datos personales del cliente; se implementa junto con `add-vehiculos` del backend, antes del registro de servicios.

## What Changes

- Agregar, editar y dar de baja vehículos desde la ficha del cliente (`/clientes/:id`).
- Agregar uno o más vehículos en el mismo formulario de alta del cliente.
- Búsqueda de clientes también por placa y placas visibles en las tarjetas de la lista.
- Historial de servicios prestados en la ficha y botón "Registrar servicio" (cuando exista `add-registro-servicios-ui`).

Fuera de alcance: fotos de vehículos y lectura automática de placas.

## Capabilities

### New Capabilities
- `vehiculos-cliente`: pantallas para gestionar los vehículos de cada cliente.

### Modified Capabilities

## Impact

- Código nuevo en `src/features/clientes/` (`VehiculoForm`, lista de vehículos en la ficha).
- Depende de `add-clientes-ui` y del cambio `add-vehiculos` del backend.
