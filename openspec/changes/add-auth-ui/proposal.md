# Proposal

## Why

La app maneja datos privados del negocio, así que solo deben verla los usuarios con sesión, y cada rol debe ver solo lo suyo. Además, el admin necesita crear las cuentas de sus empleados sin depender de nadie más.

## What Changes

- Pantalla de inicio de sesión (`/login`) con correo y contraseña.
- Sesión guardada en el navegador con Zustand, enviada en cada llamada a la API y cerrada automáticamente al vencer o recibir 401.
- Protección de rutas: sin sesión se va a `/login`; rutas de admin protegidas por rol.
- Perfil propio (`/perfil`) con cambio de contraseña y botón de cerrar sesión.
- Gestión de usuarios para el admin (`/ajustes/usuarios`): listar, crear, editar rol, desactivar y restablecer contraseña.

Fuera de alcance: recordar la sesión más allá del vencimiento del token, recuperación de contraseña por correo e inicio de sesión con proveedores externos.

## Capabilities

### New Capabilities
- `sesion`: inicio y cierre de sesión, persistencia de la sesión y protección de rutas por rol.
- `gestion-usuarios`: pantallas del admin para administrar los usuarios del negocio.

### Modified Capabilities

## Impact

- Código nuevo: `src/features/auth/` (store, api, `LoginForm`, `RequireAuth`, `RequireRole`), `src/features/usuarios/`, páginas `LoginPage`, `PerfilPage` y `UsuariosPage`.
- `apiClient` agrega el encabezado `Authorization` y reacciona a 401.
- Depende de `add-app-shell` y del cambio `add-auth` del backend.
