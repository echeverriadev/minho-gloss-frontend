# Spec Delta

## Purpose
Pantallas para que el administrador del autolavado gestione las cuentas de sus empleados y de otros administradores.

## ADDED Requirements

### Requirement: Lista de usuarios
La pantalla `/ajustes/usuarios`, solo para `admin`, SHALL listar los usuarios con nombre, correo, rol (con `Badge`) y estado, con un interruptor para ver también los inactivos, y un botón "Agregar usuario".

#### Scenario: Ver el equipo
- **WHEN** el admin abre `/ajustes/usuarios`
- **THEN** ve a todos los usuarios activos con su rol

### Requirement: Crear y editar usuarios
El admin SHALL poder crear un usuario con nombre, correo, contraseña inicial y rol, y editar nombre y rol de uno existente, con las validaciones de `domain-model`. Un correo repetido SHALL mostrarse como error en el campo correo.

#### Scenario: Nuevo empleado
- **WHEN** el admin crea un usuario con rol `empleado`
- **THEN** aparece en la lista y se muestra el aviso "Usuario creado"

### Requirement: Desactivar y restablecer contraseña
El admin SHALL poder desactivar un usuario (con confirmación) y restablecer su contraseña escribiendo una nueva. Los errores 409 de la API (por ejemplo, dejar el sistema sin admin) SHALL mostrarse en un aviso de error con el mensaje de la API. El admin SHALL NOT ver la opción de desactivarse a sí mismo.

#### Scenario: Intentar dejar al negocio sin admin
- **WHEN** el admin intenta cambiar a `empleado` al único administrador
- **THEN** se muestra el aviso "Debe quedar al menos un administrador activo"
