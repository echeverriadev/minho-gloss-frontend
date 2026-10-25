# Tasks

## 1. Sesión

- [x] 1.1 Crear `src/features/auth/` con `types.ts`, `api.ts` (`login`, `me`, `cambiarPassword`, `recuperarPassword`, `restablecerPassword`) y `useSessionStore` persistido en `localStorage`
- [x] 1.2 Hacer que `apiClient` agregue `Authorization` desde la sesión y cierre la sesión ante un 401
- [x] 1.3 Crear `LoginForm` y `LoginPage` con React Hook Form
- [x] 1.4 Crear `RequireAuth` y `RequireRole`, aplicarlos en el router y conectar la navegación por rol de `AppLayout`
- [x] 1.5 Descartar la sesión vencida al iniciar la app
- [x] 1.6 Crear `PerfilPage` con cambio de contraseña y cierre de sesión
- [x] 1.7 Crear `RecuperarPasswordPage` y `RestablecerPasswordPage` con el enlace desde el login

## 2. Usuarios

- [x] 2.1 Crear `src/features/usuarios/` con `api.ts`, `types.ts`, `UsuariosList` y `UsuarioForm`
- [x] 2.2 Crear `AjustesPage` y `UsuariosPage` en `/ajustes/usuarios` con crear, editar, desactivar y restablecer contraseña

## 3. Verificación

- [x] 3.1 Probar a mano: login correcto e incorrecto, recarga con sesión, sesión vencida, empleado en ruta de admin, recuperación con el correo de Mailpit
- [x] 3.2 Verificar las pantallas en 360 px
- [x] 3.3 Ejecutar `npm run check` y dejarlo en verde
