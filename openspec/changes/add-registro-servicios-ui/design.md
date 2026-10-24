# Design

## Context

El caso más común es un cliente que ya existe y vuelve con el mismo vehículo. El objetivo de `product-scope` es registrarlo en menos de 30 segundos desde el celular.

## Goals / Non-Goals

**Goals:**
- Cliente conocido: placa, tipo de servicio y guardar, con precio y método de pago por defecto.
- Cliente nuevo: no salir del flujo para crearlo.

**Non-Goals:**
- Reconocimiento de placas por cámara.

## Decisions

1. **Flujo en una sola página con pasos** (estado local con `useReducer`), no en rutas separadas, para no perder datos al volver atrás. La URL acepta `?clienteId=&vehiculoId=` para entrar con el vehículo ya elegido desde la ficha del cliente.
2. **Paso 1 por placa**: al escribir la placa completa se consulta `GET /api/vehiculos/por-placa/:placa`. Si existe, se muestra el cliente para confirmar; si no, se ofrece "Cliente nuevo" (nombre, teléfono, tipo de vehículo y autorización de contacto) o "Buscar cliente existente" para agregarle el vehículo.
3. **Tipos de servicio como botones grandes** en el orden del catálogo, con el precio de lista para el tipo de vehículo ya calculado en el frontend (`calcularPrecioLista`) para no hacer otra llamada.
4. **Método de pago recordado**: el último método usado en el dispositivo se preselecciona (guardado en `localStorage`, por defecto `efectivo`).
5. **El precio cobrado** se muestra prellenado con el precio de lista; si se cambia, la app muestra el descuento calculado.

## Risks / Trade-offs

- [Placas mal escritas crean clientes duplicados] → el paso de cliente nuevo muestra coincidencias por teléfono antes de guardar, y la API rechaza teléfonos repetidos.
