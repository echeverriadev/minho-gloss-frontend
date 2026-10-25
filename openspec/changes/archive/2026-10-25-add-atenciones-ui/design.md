# Design

## Context

Lo más común es un cliente que vuelve y pide un servicio con algún extra. El precio depende del tipo de vehículo, que el empleado ve a simple vista.

## Goals / Non-Goals

**Goals:**
- Registrar una atención con pocos toques: tipo de vehículo, servicio y guardar, con pago recordado.
- Alta de cliente sin salir del registro y sin perder lo ya elegido.

**Non-Goals:**
- Lectura de placas por cámara y facturación fiscal.

## Decisions

1. **Una sola pantalla con secciones** (cliente, vehículo, servicios, pago) en lugar de un asistente por pasos: en el celular se recorre con scroll y se ve el total siempre abajo, en una barra fija con el botón "Guardar". El estado vive en un `useReducer` para que un error al guardar no pierda nada.
2. **Servicios como botones grandes** que se marcan y desmarcan, primero los servicios y luego los extras, con el precio de lista calculado en el frontend (`calcularPrecioLista`) para el tipo de vehículo elegido. Cambiar el tipo de vehículo recalcula los precios de lista.
3. **Precios personalizados solo en la interfaz del admin**: cada línea elegida muestra un campo de precio editable y aparece "Agregar servicio personalizado". El empleado no ve esos controles; la API igual lo valida.
4. **Cliente opcional**: por defecto "Sin cliente". "Buscar cliente" reutiliza la búsqueda de `/clientes`; "Cliente nuevo" abre el `ClienteForm` existente en un `Dialog` y deja al cliente creado elegido. La URL acepta `?clienteId=` para entrar desde la ficha.
5. **Método de pago recordado** en `localStorage` por dispositivo (con `try/catch`), por defecto `efectivo`.
6. **Detalle imprimible con CSS de impresión** (`print:hidden` en la navegación y las acciones) y `window.print()`, que en el celular permite guardar como PDF o compartir. No se generan PDFs en el servidor.
7. **Fechas del listado en la URL** (`?desde=&hasta=`) para el admin; el empleado siempre ve hoy.

## Risks / Trade-offs

- [Clientes duplicados al crearlos con apuro] → el formulario de alta ya avisa con el cliente que usa el teléfono o la cédula.
- [Impresión distinta por navegador] → el detalle usa un diseño de una columna sin colores de fondo.
