# Spec Delta

## Purpose
Registro rápido de los servicios prestados desde el celular y consulta de los servicios del día con sus totales.

## ADDED Requirements

### Requirement: Inicio con el registro rápido
La pantalla de inicio `/` SHALL mostrar el botón principal "Registrar servicio" al alcance del pulgar y el resumen del día actual: cantidad de servicios y total cobrado (este último solo para `admin`), y los últimos servicios registrados hoy.

#### Scenario: Empleado abre la app
- **WHEN** un empleado inicia sesión
- **THEN** ve "Registrar servicio" y los servicios registrados hoy, sin el total de dinero

### Requirement: Identificar el vehículo por placa
El registro SHALL empezar pidiendo la placa con el teclado adecuado y en mayúsculas. Si la placa existe, SHALL mostrar el vehículo y su cliente para confirmar. Si no existe, SHALL ofrecer crear un cliente nuevo con su vehículo (nombre, teléfono, tipo de vehículo y autorización de contacto) sin salir del flujo, o elegir un cliente existente para agregarle el vehículo.

#### Scenario: Cliente conocido
- **WHEN** el empleado escribe `AA12BB` y la placa existe
- **THEN** la app muestra "AA12BB · Auto · Ana Gómez" con el botón "Continuar"

#### Scenario: Placa nueva
- **WHEN** la placa no existe
- **THEN** la app ofrece "Cliente nuevo" y "Agregar a un cliente existente"

### Requirement: Elegir servicio, precio y pago
Después del vehículo, la app SHALL mostrar los tipos de servicio activos como opciones grandes con el precio de lista para el tipo de vehículo, y luego el precio cobrado (prellenado con el de lista y editable con `MoneyInput`, mostrando el descuento si es menor), el método de pago (preseleccionado con el último usado en el dispositivo) y notas opcionales.

#### Scenario: Descuento
- **WHEN** el precio de lista es 20,00 € y el empleado escribe 18,00 €
- **THEN** la app muestra "Descuento: 2,00 €" antes de guardar

### Requirement: Guardar el servicio
Al tocar "Guardar", la app SHALL llamar a `POST /api/servicios-prestados`, mostrar el aviso "Servicio registrado" y volver al inicio con el servicio en la lista del día. Un error de la API SHALL mostrarse sin perder lo elegido.

#### Scenario: Error de conexión al guardar
- **WHEN** falla la conexión al guardar
- **THEN** la app muestra "No hay conexión con el servidor" y conserva placa, servicio, precio y método de pago para reintentar

### Requirement: Lista de servicios prestados
La pantalla `/servicios` SHALL listar los servicios del día actual con hora, placa, cliente, tipo de servicio, precio cobrado y método de pago, con el resumen (cantidad y total) arriba. El `admin` SHALL poder elegir otro día o rango de fechas, que quedan en la URL; el `empleado` SHALL ver solo el día actual.

#### Scenario: Admin revisa ayer
- **WHEN** el admin elige el día de ayer
- **THEN** la lista y el resumen corresponden a ayer y la URL incluye `desde` y `hasta`

### Requirement: Corregir y anular
Desde un servicio de la lista, el usuario SHALL poder cambiar el método de pago y las notas (el `empleado` solo en servicios de hoy). El `admin` SHALL poder anularlo escribiendo un motivo obligatorio y confirmando; un servicio anulado SHALL desaparecer de la lista por defecto y del resumen.

#### Scenario: Anular un registro duplicado
- **WHEN** el admin anula un servicio con motivo "Registrado dos veces"
- **THEN** el servicio desaparece de la lista y el total del día baja en su precio
