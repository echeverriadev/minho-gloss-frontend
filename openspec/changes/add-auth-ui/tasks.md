# Tasks

## 1. Sesión

- [ ] 1.1 Crear `src/features/auth/` con `types.ts`, `api.ts` (`login`, `me`, `cambiarPassword`) y `useSessionStore` persistido en `localStorage`
- [ ] 1.2 Hacer que `apiClient` agregue `Authorization` desde la sesión y cierre la sesión ante un 401
- [ ] 1.3 Crear `LoginForm` y `LoginPage` con React Hook Form
- [ ] 1.4 Crear `RequireAuth` y `RequireRole`, aplicarlos en el router y conectar la navegación por rol de `AppLayout`
- [ ] 1.5 Descartar la sesión vencida al iniciar la app
- [ ] 1.6 Crear `PerfilPage` con cambio de contraseña y cierre de sesión

## 2. Usuarios

- [ ] 2.1 Crear `src/features/usuarios/` con `api.ts`, `types.ts`, `UsuariosList` y `UsuarioForm`
- [ ] 2.2 Crear `UsuariosPage` en `/ajustes/usuarios` con crear, editar, desactivar y restablecer contraseña

## 3. Verificación

- [ ] 3.1 Probar a mano: login correcto e incorrecto, recarga con sesión, sesión vencida, empleado en ruta de admin
- [ ] 3.2 Verificar las pantallas en 360 px
- [ ] 3.3 Ejecutar `npm run check` y dejarlo en verde
