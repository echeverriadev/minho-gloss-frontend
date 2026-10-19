# Spec Delta

## Purpose
Pantallas para que el administrador mantenga el catálogo de tipos de servicio del autolavado y sus precios por tipo de vehículo.

## ADDED Requirements

### Requirement: Índice de ajustes
La pantalla `/ajustes`, solo para `admin`, SHALL mostrar accesos a "Tipos de servicio", "Usuarios" y "Post-venta", cada uno con una breve descripción.

#### Scenario: Abrir ajustes
- **WHEN** el admin toca "Ajustes"
- **THEN** ve los tres accesos con su descripción

### Requirement: Lista de tipos de servicio
La pantalla `/ajustes/tipos-servicio` SHALL listar los tipos de servicio en el orden definido, con nombre, precio base formateado en COP, los precios por vehículo que tenga y la duración estimada, y un botón "Agregar servicio". Un interruptor SHALL permitir ver también los inactivos, marcados con un `Badge` "Inactivo".

#### Scenario: Catálogo vacío
- **WHEN** el negocio aún no tiene tipos de servicio
- **THEN** se muestra "Agrega tu primer servicio para poder registrar trabajos" con el botón "Agregar servicio"

### Requirement: Alta y edición de tipos de servicio
El formulario SHALL pedir nombre, descripción opcional, precio base con `MoneyInput`, una sección opcional "Precio según vehículo" con un `MoneyInput` por tipo (`auto`, `camioneta`, `moto`, `otro`) que queda vacío si usa el precio base, duración estimada en minutos y orden. Un nombre repetido SHALL mostrarse como error en el campo nombre.

#### Scenario: Precio distinto para camioneta
- **WHEN** el admin crea "Lavado completo" con precio base $ 35.000 y precio de camioneta $ 45.000
- **THEN** la lista muestra el precio base y "Camioneta: $ 45.000"

### Requirement: Baja de tipos de servicio
El admin SHALL poder dar de baja un tipo de servicio con una confirmación que aclara que el historial y las métricas pasadas no cambian.

#### Scenario: Retirar un servicio
- **WHEN** el admin confirma la baja de "Encerado premium"
- **THEN** desaparece de la lista de activos y del registro de servicios
