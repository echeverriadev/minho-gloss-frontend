# Spec Delta

## Purpose
Pantallas para buscar, ver, crear, editar y dar de baja a los clientes del autolavado y sus vehículos desde el celular.

## ADDED Requirements

### Requirement: Lista y búsqueda de clientes
La pantalla `/clientes` SHALL mostrar un buscador fijo arriba y la lista de clientes en tarjetas con nombre, teléfono, placas y fecha del último servicio. Al escribir, la búsqueda SHALL esperar 300 ms sin cambios antes de llamar a `GET /api/clientes?q=`, y el texto buscado SHALL quedar en la URL (`?q=`). La lista SHALL cargar más resultados al llegar al final o con un botón "Ver más".

#### Scenario: Buscar por placa
- **WHEN** el usuario escribe "aa1" en el buscador
- **THEN** la lista muestra los clientes con placas que empiezan por `AA1`
- **AND** la URL queda como `/clientes?q=aa1`

#### Scenario: Búsqueda sin resultados
- **WHEN** no hay clientes que coincidan
- **THEN** se muestra "No encontramos clientes con «<texto>»" con el botón "Agregar cliente" que precarga el texto como placa, teléfono o nombre según parezca

### Requirement: Alta y edición de clientes
El formulario de cliente SHALL pedir nombre, teléfono (con `inputMode="tel"`), correo opcional, autorización de contacto (casilla con el texto "Acepta recibir recordatorios por WhatsApp, llamada o correo") y notas, y en el alta SHALL permitir agregar uno o más vehículos (placa, tipo, marca, modelo, color). Las validaciones SHALL ser las de `domain-model`, la placa SHALL mostrarse en mayúsculas mientras se escribe y los errores 409 de teléfono o placa SHALL mostrarse en su campo con un enlace al cliente que ya los usa.

#### Scenario: Alta con vehículo
- **WHEN** el usuario completa los datos del cliente y un vehículo y toca "Guardar"
- **THEN** se crea el cliente, aparece el aviso "Cliente guardado" y se abre su ficha

#### Scenario: Placa ya registrada
- **WHEN** la API responde 409 por la placa
- **THEN** el campo placa muestra el mensaje de la API con el enlace "Ver cliente"

### Requirement: Ficha del cliente
La pantalla `/clientes/:id` SHALL mostrar los datos del cliente, si autorizó contacto, sus vehículos activos, la cantidad de servicios y la fecha del último, y su historial de servicios prestados (del más reciente al más antiguo, paginado). SHALL ofrecer los botones "Registrar servicio" (que abre el registro con el cliente preseleccionado), "Editar", "Llamar" (`tel:`), "WhatsApp" (`wa.me`) y "Correo" (`mailto:`, solo si tiene correo).

#### Scenario: Registrar servicio desde la ficha
- **WHEN** el usuario toca "Registrar servicio" en la ficha de un cliente con un solo vehículo
- **THEN** se abre el registro con ese cliente y vehículo ya elegidos

### Requirement: Vehículos desde la ficha
Desde la ficha, el usuario SHALL poder agregar un vehículo, editarlo y darlo de baja (con confirmación), con las mismas validaciones y manejo de errores del alta.

#### Scenario: Agregar una moto
- **WHEN** el usuario agrega una moto desde la ficha
- **THEN** la moto aparece en la lista de vehículos del cliente sin recargar la página

### Requirement: Baja de clientes
La opción "Dar de baja" SHALL mostrarse solo a `admin`, pedir confirmación indicando que el historial se conserva y, al confirmar, volver a la lista con el aviso "Cliente dado de baja".

#### Scenario: Empleado en la ficha
- **WHEN** un empleado abre la ficha de un cliente
- **THEN** no ve la opción "Dar de baja"

### Requirement: Borrar datos personales del cliente
La ficha SHALL ofrecer al `admin` la opción "Borrar datos personales (RGPD)", que explica que es irreversible, pide escribir el nombre del cliente para confirmar y llama a `POST /api/clientes/:id/anonimizar`.

#### Scenario: Confirmación del borrado
- **WHEN** el admin elige borrar los datos y escribe el nombre del cliente
- **THEN** la app anonimiza al cliente, vuelve a la lista y muestra el aviso "Datos personales borrados"

