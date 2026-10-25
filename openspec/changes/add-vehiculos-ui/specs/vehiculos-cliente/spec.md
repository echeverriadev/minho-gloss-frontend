# Spec Delta

## Purpose
Gestión de los vehículos de cada cliente desde el celular.

## ADDED Requirements

### Requirement: Vehículos desde la ficha
Desde la ficha, el usuario SHALL poder agregar un vehículo (placa, tipo, marca, modelo, color), editarlo y darlo de baja (con confirmación). La placa SHALL mostrarse en mayúsculas mientras se escribe y un 409 por placa repetida SHALL mostrarse en el campo con el enlace "Ver cliente".

#### Scenario: Agregar una moto
- **WHEN** el usuario agrega una moto desde la ficha
- **THEN** la moto aparece en la lista de vehículos del cliente sin recargar la página

#### Scenario: Placa ya registrada
- **WHEN** la API responde 409 por la placa
- **THEN** el campo placa muestra el mensaje de la API con el enlace "Ver cliente"

### Requirement: Vehículos en el alta del cliente
El formulario de alta de cliente SHALL permitir agregar uno o más vehículos antes de guardar.

#### Scenario: Alta con vehículo
- **WHEN** el usuario completa los datos del cliente y un vehículo y toca "Guardar"
- **THEN** se crean el cliente y su vehículo y se abre la ficha

### Requirement: Búsqueda por placa
La búsqueda de `/clientes` SHALL encontrar también por el inicio de la placa y cada tarjeta SHALL mostrar las placas del cliente.

#### Scenario: Buscar por placa
- **WHEN** el usuario escribe "aa1" en el buscador
- **THEN** la lista muestra los clientes con placas que empiezan por `AA1`

### Requirement: Historial en la ficha
La ficha SHALL mostrar el historial de servicios prestados del cliente (del más reciente al más antiguo, paginado) y el botón "Registrar servicio", que abre el registro con el cliente preseleccionado.

#### Scenario: Registrar servicio desde la ficha
- **WHEN** el usuario toca "Registrar servicio" en la ficha de un cliente con un solo vehículo
- **THEN** se abre el registro con ese cliente y vehículo ya elegidos
