# Proposal

## Why

El dueño quiere que los empleados y el admin registren durante el día cada vehículo atendido, con todos sus servicios, para conocer la gestión del autolavado y calcular métricas más adelante. El registro se hace de pie en el patio, así que tiene que ser rápido desde el celular, permitir clientes que no quieren registrarse y dar de alta a un cliente nuevo sin salir de la pantalla. El cliente puede pedir un detalle de lo cobrado.

Este cambio reemplaza a `add-registro-servicios-ui`, que registraba un servicio por vez a partir de la placa de un vehículo ya registrado.

## What Changes

- Inicio (`/`) con el botón principal "Registrar servicio", el resumen del día (cantidad y, para el admin, total cobrado) y las últimas atenciones de hoy.
- Registro (`/servicios/nuevo`) en una sola pantalla: cliente (sin cliente, buscar o crear uno nuevo en un diálogo), tipo de vehículo y placa opcional, servicios y extras del catálogo con su precio, precios personalizados y servicios fuera del catálogo para el admin, método de pago recordado, notas y total.
- Operación del día (`/servicios`) con el listado y el resumen; el admin elige otro día o rango, que queda en la URL.
- Detalle de la atención (`/servicios/:id`) imprimible, con corrección del método de pago y las notas, y anulación con motivo para el admin.
- Historial de atenciones y botón "Registrar servicio" en la ficha del cliente.

Fuera de alcance: métricas, gestión de vehículos por placa (`add-vehiculos-ui`), envío del detalle por correo o WhatsApp y facturas fiscales.

## Capabilities

### New Capabilities
- `registro-atenciones`: registro rápido, consulta, detalle imprimible, corrección y anulación de las atenciones del día.

### Modified Capabilities
- `domain-model`: la entidad `ServicioPrestado` se reemplaza por `Atencion` con ítems.
- `product-scope`: módulo "Operación del día" y glosario.

## Impact

- Código nuevo: `src/features/atenciones/` y páginas `InicioPage`, `ServiciosPage`, `RegistrarServicioPage` y `AtencionDetallePage`.
- Usa `@/features/clientes` (búsqueda y alta) y `@/features/tipos-servicio` (catálogo y precio de lista).
- Reemplaza la página de inicio de prueba (`HomePage`) y agrega "Servicios" a la navegación.
- Depende del cambio `add-atenciones` del backend.
