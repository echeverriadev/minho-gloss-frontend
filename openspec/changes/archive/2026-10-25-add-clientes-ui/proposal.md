# Proposal

## Why

Guardar y encontrar rápido a los clientes es el corazón de la app. En la fase 2 el dueño pidió registrar de cada cliente su nombre, apellido, cédula, teléfono celular, correo, dirección y fecha de nacimiento, y gestionarlos desde el celular.

## What Changes

- Lista de clientes (`/clientes`) con buscador único por nombre, apellido, cédula o teléfono y carga paginada.
- Ficha del cliente (`/clientes/:id`) con sus datos personales, contadores y acciones rápidas de contacto (llamar, WhatsApp, correo).
- Formulario de alta y edición (`/clientes/nuevo`, `/clientes/:id/editar`) con los campos que pidió el dueño.
- Baja del cliente y borrado de datos personales (RGPD), solo para admin.
- Se modifica la entidad `Cliente` de `domain-model`, igual que en el backend.

Fuera de alcance: vehículos e historial de servicios (pasan a `add-vehiculos-ui`), importar clientes desde archivos, fusionar duplicados y notas con historial.

## Capabilities

### New Capabilities
- `gestion-clientes`: pantallas para buscar, ver, crear, editar y dar de baja clientes.

### Modified Capabilities
- `domain-model`: la entidad `Cliente` agrega `apellido`, `cedula`, `direccion` y `fechaNacimiento`, y el correo pasa a ser obligatorio.

## Impact

- Código nuevo: `src/features/clientes/` (api, tipos, `ClientesList`, `ClienteCard`, `ClienteForm`, `ClienteDetalle`) y páginas `ClientesPage`, `ClienteDetallePage`, `ClienteNuevoPage`, `ClienteEditarPage`.
- Utilidad compartida para construir enlaces `tel:`, `wa.me` y `mailto:` en `src/shared/lib/contacto.ts` (la reutiliza `add-post-venta-ui`).
- Depende de `add-app-shell`, `add-auth-ui` y del cambio `add-clientes` del backend.
