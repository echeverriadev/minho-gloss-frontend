# catalogo-servicios Specification

## Purpose
Pantallas para que el administrador mantenga el catálogo de servicios y extras del autolavado y sus precios por tipo de vehículo.

## Requirements

### Requirement: Acceso desde ajustes
La pantalla `/ajustes`, solo para `admin`, SHALL mostrar el acceso "Servicios y extras" con una breve descripción, junto a los demás ajustes.

#### Scenario: Abrir ajustes
- **WHEN** el admin toca "Ajustes"
- **THEN** ve el acceso "Servicios y extras"

### Requirement: Lista del catálogo
La pantalla `/ajustes/tipos-servicio` SHALL mostrar dos secciones, "Servicios" y "Extras", con las entradas en el orden definido. Cada entrada SHALL mostrar título, descripción y precios formateados en euros: los cuatro precios con su tipo de vehículo (Ligeiro, SUV, Monovolume, Carrinha) o el precio único. SHALL ofrecer el botón "Agregar servicio" y un interruptor para ver también los dados de baja, marcados con el `Badge` "Inactivo".

#### Scenario: Ver el catálogo
- **WHEN** el admin abre `/ajustes/tipos-servicio`
- **THEN** ve FULL GLOSS con "Ligeiro 25,00 €, SUV 30,00 €, Monovolume 35,00 €, Carrinha 40,00 €" en Servicios
- **AND** ve "Lavagem do motor 40,00 €" en Extras

#### Scenario: Catálogo vacío
- **WHEN** el negocio aún no tiene servicios
- **THEN** se muestra "Agrega tu primer servicio para poder registrar trabajos" con el botón "Agregar servicio"

### Requirement: Alta y edición
El formulario SHALL pedir título, descripción opcional, categoría (Servicio o Extra), modo de precio ("Según el vehículo" o "Precio único") y, según el modo, un `MoneyInput` por tipo de vehículo o uno solo, y el orden. Todos los precios del modo elegido SHALL ser obligatorios. Un título repetido SHALL mostrarse como error en el campo título.

#### Scenario: Nuevo extra de precio único
- **WHEN** el admin crea el extra "Higienização com ozono" con precio único 10,00 €
- **THEN** aparece en la sección Extras y se muestra el aviso "Servicio guardado"

#### Scenario: Falta un precio
- **WHEN** el admin deja vacío el precio de Carrinha en un servicio según el vehículo
- **THEN** el formulario muestra "El precio es obligatorio" en ese campo sin llamar a la API

### Requirement: Baja de entradas del catálogo
El admin SHALL poder dar de baja una entrada con una confirmación que aclara que el historial y las métricas pasadas no cambian.

#### Scenario: Retirar un servicio
- **WHEN** el admin confirma la baja de "PREMIUM GLOSS"
- **THEN** desaparece de la lista de activos y del registro de servicios
