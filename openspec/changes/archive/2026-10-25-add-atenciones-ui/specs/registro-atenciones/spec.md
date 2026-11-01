# Spec Delta

## Purpose
Registro rápido de las atenciones del día desde el celular, con sus servicios prestados, y consulta, detalle imprimible y anulación de lo registrado.

## ADDED Requirements

### Requirement: Inicio con el registro rápido
La pantalla de inicio `/` SHALL mostrar el botón principal "Registrar servicio", el resumen del día actual (cantidad de atenciones, y total cobrado solo para `admin`) y las últimas atenciones registradas hoy.

#### Scenario: Empleado abre la app
- **WHEN** un empleado inicia sesión
- **THEN** ve "Registrar servicio" y las atenciones registradas hoy, sin el total de dinero

### Requirement: Cliente opcional en el registro
El registro SHALL empezar con "Sin cliente" elegido y SHALL permitir buscar un cliente existente por nombre, cédula o teléfono, o crear uno nuevo en un diálogo con el formulario de alta de clientes sin perder lo ya cargado. Al entrar con `?clienteId=` el cliente SHALL venir elegido.

#### Scenario: Cliente nuevo durante el registro
- **WHEN** el empleado toca "Cliente nuevo", completa el formulario y guarda
- **THEN** el diálogo se cierra, el cliente queda elegido y los servicios ya marcados se conservan

#### Scenario: Registrar desde la ficha
- **WHEN** el usuario toca "Registrar servicio" en la ficha de un cliente
- **THEN** se abre el registro con ese cliente elegido

### Requirement: Elegir vehículo y servicios
El registro SHALL pedir el tipo de vehículo (Ligeiro, SUV, Monovolume o Carrinha) y la placa opcional, y SHALL mostrar los servicios y luego los extras activos como opciones grandes con su precio de lista para ese tipo de vehículo. Se SHALL poder elegir uno o más, y el total SHALL verse siempre junto al botón "Guardar".

#### Scenario: Servicio con extra
- **WHEN** el empleado elige SUV, "EXPRESS GLOSS" (20,00 €) y el extra "Higienização com ozono" (15,00 €)
- **THEN** el total muestra 35,00 €

#### Scenario: Cambiar el tipo de vehículo
- **WHEN** el empleado cambia de SUV a Carrinha con servicios ya elegidos
- **THEN** los precios de lista y el total se recalculan para Carrinha

### Requirement: Precios personalizados del admin
Para el `admin`, cada servicio elegido SHALL mostrar su precio editable (prellenado con el de lista) y la diferencia con el de lista, y SHALL existir "Agregar servicio personalizado" con nombre y precio. El `empleado` SHALL NOT ver estos controles.

#### Scenario: Descuento
- **WHEN** el admin cambia FULL GLOSS de 25,00 € a 20,00 €
- **THEN** la línea muestra "Descuento: 5,00 €" y el total baja 5,00 €

### Requirement: Pago y guardado
El registro SHALL pedir el método de pago (preseleccionado con el último usado en el dispositivo) y notas opcionales. Al tocar "Guardar" la app SHALL registrar la atención, mostrar "Servicio registrado" y abrir su detalle. Un error de la API SHALL mostrarse sin perder lo elegido.

#### Scenario: Error de conexión al guardar
- **WHEN** falla la conexión al guardar
- **THEN** la app muestra "No hay conexión con el servidor" y conserva cliente, vehículo, servicios y pago para reintentar

### Requirement: Operación del día
La pantalla `/servicios` SHALL listar las atenciones del día actual con número, hora, cliente (o "Sin cliente"), tipo de vehículo y placa, servicios, total y método de pago, con el resumen arriba. El `admin` SHALL poder elegir otro día o rango, que quedan en la URL como `desde` y `hasta`; el `empleado` SHALL ver solo hoy.

#### Scenario: Admin revisa ayer
- **WHEN** el admin elige el día de ayer
- **THEN** la lista y el resumen corresponden a ayer y la URL incluye `desde` y `hasta`

### Requirement: Detalle imprimible
La pantalla `/servicios/:id` SHALL mostrar el detalle de la atención: número, fecha y hora, cliente con sus datos de contacto, vehículo, cada servicio con su precio de lista y cobrado, descuentos, total, método de pago y quién la registró, con el aviso de que no es una factura. El botón "Imprimir" SHALL imprimir solo el detalle, sin la navegación ni los botones.

#### Scenario: El cliente pide el detalle
- **WHEN** el empleado toca "Imprimir" en el detalle
- **THEN** el navegador abre la impresión con solo el detalle de la atención

### Requirement: Corregir y anular
Desde el detalle, el usuario SHALL poder cambiar el método de pago y las notas (el `empleado` solo en atenciones de hoy). El `admin` SHALL poder anularla escribiendo un motivo obligatorio y confirmando; una atención anulada SHALL mostrarse como "Anulada" con el motivo y SHALL desaparecer del listado y del resumen.

#### Scenario: Anular un registro duplicado
- **WHEN** el admin anula una atención con motivo "Registrada dos veces"
- **THEN** el detalle muestra "Anulada" con el motivo y el total del día baja en su importe

### Requirement: Historial en la ficha del cliente
La ficha del cliente SHALL mostrar el botón "Registrar servicio" y su historial de atenciones (de la más reciente a la más antigua, con "Ver más"), cada una con enlace a su detalle.

#### Scenario: Cliente con visitas
- **WHEN** el usuario abre la ficha de un cliente con tres atenciones
- **THEN** ve las tres con fecha, servicios y total, la más reciente primero
