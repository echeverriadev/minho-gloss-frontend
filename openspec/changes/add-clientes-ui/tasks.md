# Tasks

## 1. Base de la feature

- [ ] 1.1 Crear `src/features/clientes/` con `types.ts` (Cliente, Vehiculo, listados) y `api.ts` para los endpoints de clientes y vehículos
- [ ] 1.2 Crear `src/shared/lib/contacto.ts` con `enlaceLlamada`, `enlaceWhatsapp` y `enlaceCorreo`
- [ ] 1.3 Crear `useDebouncedValue` en `src/shared/hooks/`

## 2. Pantallas

- [ ] 2.1 Crear `ClienteCard` (con historia de Storybook) y `ClientesList` con búsqueda en la URL y carga paginada
- [ ] 2.2 Crear `ClienteForm` y `VehiculoForm` con React Hook Form, placa en mayúsculas y errores 409 en el campo
- [ ] 2.3 Crear `ClienteDetalle` con vehículos, contadores, historial y acciones de contacto
- [ ] 2.4 Crear las páginas `/clientes`, `/clientes/nuevo`, `/clientes/:id` y `/clientes/:id/editar`
- [ ] 2.5 Agregar, editar y dar de baja vehículos desde la ficha; baja de cliente y borrado de datos personales (RGPD) solo para admin

## 3. Verificación

- [ ] 3.1 Probar a mano: búsqueda por nombre sin tilde, teléfono y placa; alta con vehículo; placa repetida
- [ ] 3.2 Verificar las pantallas en 360 px
- [ ] 3.3 Ejecutar `npm run check` y dejarlo en verde
