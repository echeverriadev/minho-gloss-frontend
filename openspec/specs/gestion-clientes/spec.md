# gestion-clientes Specification

## Purpose
Pantallas para buscar, ver, crear, editar y dar de baja a los clientes del autolavado desde el celular.

## Requirements

### Requirement: Lista y búsqueda de clientes
La pantalla `/clientes` SHALL mostrar un buscador arriba, un botón "Agregar cliente" y la lista de clientes en tarjetas con nombre y apellido, teléfono y cédula. Al escribir, la búsqueda SHALL esperar 300 ms sin cambios antes de llamar a `GET /api/clientes?q=`, y el texto buscado SHALL quedar en la URL (`?q=`). La lista SHALL cargar más resultados con un botón "Ver más".

#### Scenario: Buscar por nombre
- **WHEN** el usuario escribe "jose" en el buscador
- **THEN** la lista muestra a "José Pérez"
- **AND** la URL queda como `/clientes?q=jose`

#### Scenario: Búsqueda sin resultados
- **WHEN** no hay clientes que coincidan
- **THEN** se muestra "No encontramos clientes con «<texto>»" con el botón "Agregar cliente"

#### Scenario: Lista vacía
- **WHEN** todavía no hay clientes registrados
- **THEN** la pantalla muestra "Aún no hay clientes" con un botón "Agregar cliente"

### Requirement: Alta y edición de clientes
El formulario de cliente SHALL pedir nombre, apellido, cédula, teléfono celular (con `inputMode="tel"` y `+351` por defecto), correo (`type="email"`), dirección, fecha de nacimiento (selector de fecha), autorización de contacto (casilla con el texto "Acepta recibir recordatorios por WhatsApp, llamada o correo") y notas opcionales. Las validaciones SHALL ser las de `domain-model` y los errores 409 de teléfono o cédula SHALL mostrarse en su campo con un enlace "Ver cliente" al cliente que ya los usa.

#### Scenario: Alta de un cliente
- **WHEN** el usuario completa los datos del cliente y toca "Guardar"
- **THEN** se crea el cliente, aparece el aviso "Cliente guardado" y se abre su ficha

#### Scenario: Cédula ya registrada
- **WHEN** la API responde 409 por la cédula
- **THEN** el campo cédula muestra el mensaje de la API con el enlace "Ver cliente"

#### Scenario: Fecha de nacimiento futura
- **WHEN** el usuario elige una fecha de nacimiento posterior a hoy
- **THEN** el formulario muestra "La fecha de nacimiento no puede ser futura" sin llamar a la API

### Requirement: Ficha del cliente
La pantalla `/clientes/:id` SHALL mostrar nombre y apellido, cédula, teléfono, correo, dirección, fecha de nacimiento con la edad, si autorizó contacto, notas, la cantidad de servicios y la fecha del último. SHALL ofrecer los botones "Editar", "Llamar" (`tel:`), "WhatsApp" (`wa.me`) y "Correo" (`mailto:`).

#### Scenario: Llamar desde la ficha
- **WHEN** el usuario toca "Llamar" en la ficha
- **THEN** el celular abre el marcador con el teléfono del cliente

### Requirement: Baja de clientes
La opción "Dar de baja" SHALL mostrarse solo a `admin`, pedir confirmación indicando que el historial se conserva y, al confirmar, volver a la lista con el aviso "Cliente dado de baja".

#### Scenario: Empleado en la ficha
- **WHEN** un empleado abre la ficha de un cliente
- **THEN** no ve las opciones "Dar de baja" ni "Borrar datos personales (RGPD)"

### Requirement: Borrar datos personales del cliente
La ficha SHALL ofrecer al `admin` la opción "Borrar datos personales (RGPD)", que explica que es irreversible, pide escribir el nombre y apellido del cliente para confirmar y llama a `POST /api/clientes/:id/anonimizar`.

#### Scenario: Confirmación del borrado
- **WHEN** el admin elige borrar los datos y escribe el nombre del cliente
- **THEN** la app anonimiza al cliente, vuelve a la lista y muestra el aviso "Datos personales borrados"
