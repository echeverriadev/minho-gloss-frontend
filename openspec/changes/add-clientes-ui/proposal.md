# Proposal

## Why

Guardar y encontrar rápido a los clientes es el corazón de la app. En el patio, el empleado tiene que encontrar a un cliente por placa o teléfono en segundos, y dar de alta uno nuevo con su vehículo en un solo formulario.

## What Changes

- Lista de clientes (`/clientes`) con buscador único por nombre, teléfono o placa y carga paginada.
- Ficha del cliente (`/clientes/:id`) con datos de contacto, vehículos, contadores e historial de servicios.
- Formulario de alta y edición (`/clientes/nuevo`, `/clientes/:id/editar`) con vehículos en el mismo formulario.
- Agregar, editar y dar de baja vehículos desde la ficha.
- Acciones rápidas de contacto (llamar, WhatsApp, correo) desde la ficha.
- Baja del cliente, solo para admin.

Fuera de alcance: importar clientes desde archivos, fusionar duplicados y notas con historial.

## Capabilities

### New Capabilities
- `gestion-clientes`: pantallas para buscar, ver, crear, editar y dar de baja clientes y sus vehículos.

### Modified Capabilities

## Impact

- Código nuevo: `src/features/clientes/` (api, tipos, hooks, `ClientesList`, `ClienteCard`, `ClienteForm`, `VehiculoForm`, `ClienteDetalle`) y páginas `ClientesPage`, `ClienteDetallePage`, `ClienteFormPage`.
- Utilidad compartida para construir enlaces `tel:`, `wa.me` y `mailto:` en `src/shared/lib/contacto.ts` (la reutiliza `add-post-venta-ui`).
- Depende de `add-app-shell`, `add-auth-ui` y del cambio `add-clientes` del backend.
