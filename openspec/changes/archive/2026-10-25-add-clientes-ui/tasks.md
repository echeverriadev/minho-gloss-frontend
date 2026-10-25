# Tasks

## 1. Base de la feature

- [x] 1.1 Crear `src/features/clientes/` con `types.ts` (Cliente, listados) y `api.ts` para los endpoints de clientes
- [x] 1.2 Crear `src/shared/lib/contacto.ts` con `enlaceLlamada`, `enlaceWhatsapp` y `enlaceCorreo`
- [x] 1.3 Crear `useDebouncedValue` en `src/shared/hooks/`

## 2. Pantallas

- [x] 2.1 Crear `ClienteCard` (con historia de Storybook) y `ClientesList` con búsqueda en la URL y carga paginada
- [x] 2.2 Crear `ClienteForm` con React Hook Form, validaciones de `domain-model` y errores 409 en el campo
- [x] 2.3 Crear `ClienteDetalle` con datos personales, contadores y acciones de contacto
- [x] 2.4 Crear las páginas `/clientes`, `/clientes/nuevo`, `/clientes/:id` y `/clientes/:id/editar`
- [x] 2.5 Baja de cliente y borrado de datos personales (RGPD) solo para admin

## 3. Verificación

- [x] 3.1 Probar a mano: búsqueda por nombre sin tilde, teléfono y cédula; alta; cédula repetida
- [x] 3.2 Verificar las pantallas en 360 px
- [x] 3.3 Ejecutar `npm run check` y dejarlo en verde
