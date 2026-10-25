# Proposal

## Why

El dueño pidió que cada usuario pueda leer toda la app en portugués de Portugal o en español, y elegir modo claro u oscuro, guardado en su cuenta.

## What Changes

- Sección "Preferencias" en `/perfil` con idioma y apariencia, aplicadas al momento y guardadas en la cuenta.
- Todos los textos de la interfaz pasan a diccionarios tipados `es` y `pt` en `src/shared/i18n/`; montos y fechas con el formato del idioma.
- Modo oscuro redefiniendo los colores del tema en `src/styles/index.css` (clase `dark` en `<html>`), sin repetir `dark:` en cada componente.
- `apiClient` envía `Accept-Language`; la API responde los errores en el idioma del usuario.
- Se modifican `code-style` (textos), `domain-model` y `product-scope` (igual que el backend).

Fuera de alcance: más idiomas, tema "según el sistema" y traducir los datos que escribe el negocio.

## Capabilities

### New Capabilities
- `preferencias`: idioma y tema de cada usuario.

### Modified Capabilities
- `code-style`: textos de la interfaz en diccionarios por idioma.
- `domain-model`: campo `preferencias` del usuario.
- `product-scope`: la app puede verse en portugués de Portugal.

## Impact

- Código nuevo: `src/shared/i18n/`, `src/shared/preferencias/`, `PreferenciasForm` en `src/features/auth/`.
- Todos los componentes y páginas usan `useTextos()`; `bg-white` pasa a `bg-surface`.
- Depende del cambio `add-preferencias-usuario` del backend.
