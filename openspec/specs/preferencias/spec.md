# preferencias Specification

## Purpose
Preferencias de cada usuario sobre cómo ve la app: idioma (español o portugués de Portugal) y tema (claro u oscuro).

## Requirements

### Requirement: Elegir idioma y tema en el perfil
La pantalla `/perfil` SHALL ofrecer la sección "Preferencias" con el idioma (Español o Português (Portugal)) y la apariencia (Claro u Oscuro). Al cambiar una opción, la app SHALL aplicarla al momento, guardarla con `PATCH /api/auth/preferencias` y confirmar con el aviso "Preferencias guardadas" en el idioma nuevo. Si la API falla, SHALL volver a la opción anterior y mostrar el error.

#### Scenario: Cambiar a portugués
- **WHEN** el usuario elige "Português (Portugal)"
- **THEN** toda la app (menús, pantallas, formularios, avisos y errores de la API) pasa a portugués de Portugal sin recargar
- **AND** los montos y fechas usan el formato `pt-PT`

#### Scenario: Cambiar a modo oscuro
- **WHEN** el usuario elige "Oscuro"
- **THEN** la app usa colores oscuros en todas las pantallas, con contraste suficiente para leer

### Requirement: Preferencias que siguen al usuario
Al iniciar sesión, la app SHALL aplicar las preferencias guardadas en la cuenta del usuario, en cualquier dispositivo. Sin sesión (login y recuperación de contraseña), SHALL usar las últimas preferencias usadas en ese dispositivo o, la primera vez, portugués si el idioma del navegador empieza por `pt` y español en otro caso, con tema claro.

#### Scenario: Entrar desde otro celular
- **WHEN** un usuario que eligió portugués y modo oscuro inicia sesión en un celular nuevo
- **THEN** ve la app en portugués y en modo oscuro

### Requirement: Mensajes de la API en el idioma elegido
Todas las llamadas a la API SHALL enviar `Accept-Language` con el idioma en uso (`es-ES` o `pt-PT`) para que los errores y validaciones de la API lleguen traducidos.

#### Scenario: Cédula repetida en portugués
- **WHEN** un usuario con portugués guarda un cliente con un documento ya registrado
- **THEN** el campo muestra "O documento de identificação já está registado para <nome>"
