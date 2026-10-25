# Tasks

## 1. Feature

- [x] 1.1 Crear `src/features/atenciones/` con `types.ts` y `api.ts` (registrar, listar con resumen, detalle, editar, anular)
- [x] 1.2 Crear `RegistroAtencionForm` con `useReducer`: cliente, vehículo, servicios, precios personalizados del admin, pago y total
- [x] 1.3 Recordar el último método de pago en `localStorage` (con `try/catch`)
- [x] 1.4 Crear `AtencionCard`, `ResumenDia` y `AtencionDetalle` imprimible, con historias de Storybook
- [x] 1.5 Textos en español y portugués de Portugal

## 2. Pantallas

- [x] 2.1 Crear `InicioPage` en `/` y retirar `HomePage`
- [x] 2.2 Crear `RegistrarServicioPage` en `/servicios/nuevo` aceptando `?clienteId=`
- [x] 2.3 Crear `ServiciosPage` en `/servicios` con filtro de fechas en la URL para admin y agregarla a la navegación
- [x] 2.4 Crear `AtencionDetallePage` en `/servicios/:id` con impresión, edición de pago y notas, y anulación con motivo para admin
- [x] 2.5 Mostrar el historial y "Registrar servicio" en la ficha del cliente

## 3. Verificación

- [x] 3.1 Probar a mano: sin cliente, cliente nuevo desde el registro, descuento y servicio personalizado del admin, anulación e impresión
- [x] 3.2 Verificar las pantallas en 360 px y en modo oscuro
- [x] 3.3 Ejecutar `npm run check` y dejarlo en verde
