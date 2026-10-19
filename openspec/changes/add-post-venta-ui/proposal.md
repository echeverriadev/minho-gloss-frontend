# Proposal

## Why

El backend prepara cada día la lista de clientes a contactar con los mensajes listos, pero el contacto por WhatsApp y llamada lo hace una persona desde su celular. La app tiene que dejar ese contacto a un toque y registrar qué se hizo, para no repetir ni olvidar a nadie.

## What Changes

- Pantalla `/post-venta` con los recordatorios pendientes, ordenados por antigüedad, y el contador en la navegación.
- Acciones por recordatorio: abrir WhatsApp con el mensaje prellenado, llamar, enviar correo (desde la API o con `mailto:`), marcar como contactado y descartar.
- Historial de contactos (contactados y descartados) con filtro.
- Pantalla `/ajustes/post-venta` para que el admin configure los días de inactividad, días entre contactos, agradecimiento y plantillas, con vista previa del mensaje.

Fuera de alcance: envío masivo, programar mensajes y estadísticas de respuesta.

## Capabilities

### New Capabilities
- `contacto-post-venta`: pantallas para contactar a los clientes con recordatorios pendientes y configurar la post-venta.

### Modified Capabilities

## Impact

- Código nuevo: `src/features/post-venta/` (api, tipos, `RecordatorioCard`, `ConfiguracionPostVentaForm`) y páginas `PostVentaPage` y `AjustesPostVentaPage`.
- Reutiliza `src/shared/lib/contacto.ts` de `add-clientes-ui`.
- Depende de `add-app-shell`, `add-auth-ui` y del cambio `add-post-venta` del backend.
