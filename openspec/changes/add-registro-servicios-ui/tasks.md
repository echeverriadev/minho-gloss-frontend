# Tasks

## 1. Feature

- [ ] 1.1 Crear `src/features/servicios-prestados/` con `types.ts` y `api.ts` (registrar, listar con resumen, editar, anular)
- [ ] 1.2 Crear `RegistroServicioFlow` con `useReducer` y los pasos placa, cliente nuevo, servicio y pago
- [ ] 1.3 Recordar el último método de pago en `localStorage` (con `try/catch`)
- [ ] 1.4 Crear `ServicioPrestadoCard` y `ResumenDia` con historias de Storybook

## 2. Pantallas

- [ ] 2.1 Crear `InicioPage` en `/` y retirar `HomePage`
- [ ] 2.2 Crear `RegistrarServicioPage` en `/servicios/nuevo` aceptando `?clienteId=&vehiculoId=`
- [ ] 2.3 Crear `ServiciosPage` en `/servicios` con filtro de fechas en la URL para admin
- [ ] 2.4 Agregar edición de método de pago y notas, y anulación con motivo para admin

## 3. Verificación

- [ ] 3.1 Cronometrar el registro de un cliente conocido desde el celular (objetivo: menos de 30 segundos)
- [ ] 3.2 Probar a mano: placa nueva con cliente nuevo, descuento, error de conexión al guardar, anulación
- [ ] 3.3 Ejecutar `npm run check` y dejarlo en verde
