# Spec Delta

## Purpose
Inicio y cierre de sesión en la app de Minho Gloss, recuperación de contraseña por correo, persistencia de la sesión en el dispositivo y protección de las pantallas según el rol del usuario.

## ADDED Requirements

### Requirement: Inicio de sesión
La pantalla `/login` SHALL pedir correo y contraseña (con opción de mostrarla), validar que ambos estén completos y el correo tenga formato válido, y llamar a `POST /api/auth/login`. Con éxito SHALL guardar la sesión y llevar al usuario a la página que intentaba abrir o al inicio. Con 401 SHALL mostrar "Correo o contraseña incorrectos" sin borrar el correo; con 429, el mensaje de la API.

#### Scenario: Ingreso correcto
- **WHEN** un usuario ingresa credenciales válidas
- **THEN** entra al inicio y ve su nombre en el encabezado

#### Scenario: Contraseña incorrecta
- **WHEN** la API responde 401
- **THEN** el formulario muestra "Correo o contraseña incorrectos" y conserva el correo escrito

### Requirement: Recuperar la contraseña
La pantalla `/login` SHALL ofrecer el enlace "¿Olvidaste tu contraseña?" a `/recuperar-password`, que pide el correo y llama a `POST /api/auth/recuperar-password`. Con 204 SHALL mostrar siempre "Si el correo está registrado, te enviamos un enlace para elegir una contraseña nueva. Revisa tu bandeja de entrada.", exista o no la cuenta. Con 429 SHALL mostrar el mensaje de la API.

#### Scenario: Pedir el enlace
- **WHEN** el usuario escribe su correo y toca "Enviar enlace"
- **THEN** la app muestra el mensaje de confirmación y un enlace para volver al inicio de sesión

### Requirement: Elegir una contraseña nueva con el enlace
La pantalla `/restablecer-password?token=<token>` SHALL pedir la contraseña nueva y su confirmación (al menos 8 caracteres y coincidentes) y llamar a `POST /api/auth/restablecer-password`. Con éxito SHALL llevar a `/login` con el aviso "Contraseña actualizada, ya puedes iniciar sesión". Con 400 SHALL mostrar el mensaje de la API y un enlace para pedir uno nuevo. Sin `token` en la URL SHALL mostrar directamente "El enlace no es válido o ya venció, pide uno nuevo".

#### Scenario: Enlace vencido
- **WHEN** el usuario abre un enlace vencido y envía la contraseña nueva
- **THEN** la app muestra "El enlace no es válido o ya venció, pide uno nuevo" con el enlace "Pedir otro enlace"

### Requirement: Sin registro público
La app SHALL NOT ofrecer ninguna pantalla para crear una cuenta propia. Los usuarios SHALL crearse solo desde `/ajustes/usuarios`, por un `admin`.

#### Scenario: Persona sin cuenta
- **WHEN** alguien sin cuenta abre `/login`
- **THEN** no ve ninguna opción para registrarse

### Requirement: Sesión persistente
La sesión (token, vencimiento y datos del usuario) SHALL guardarse en `localStorage` para sobrevivir a recargas y cerrar la app del celular. Al abrir la app con una sesión guardada vencida, SHALL descartarse y mostrarse `/login`. La app SHALL enviar `Authorization: Bearer <token>` en todas las llamadas a la API mientras haya sesión.

#### Scenario: Reabrir la app durante la jornada
- **WHEN** el usuario cierra el navegador y lo abre dos horas después
- **THEN** sigue con la sesión iniciada

#### Scenario: Sesión vencida al abrir
- **WHEN** se abre la app con un token cuyo vencimiento ya pasó
- **THEN** se muestra `/login` con el aviso "Tu sesión venció, inicia sesión de nuevo"

### Requirement: Cierre de sesión
El usuario SHALL poder cerrar sesión desde su perfil. Cerrar sesión, o recibir un 401 de la API en cualquier llamada, SHALL borrar la sesión guardada y llevar a `/login`.

#### Scenario: Token rechazado por la API
- **WHEN** la API responde 401 porque el usuario fue desactivado
- **THEN** la app borra la sesión y muestra `/login`

### Requirement: Protección de rutas
Todas las rutas salvo `/login`, `/recuperar-password` y `/restablecer-password` SHALL requerir sesión; sin sesión, la app SHALL redirigir a `/login` recordando la ruta pedida. Las rutas de admin (`/metricas`, `/ajustes/*`) SHALL redirigir al inicio a un `empleado`. Con sesión iniciada, abrir `/login` SHALL redirigir al inicio.

#### Scenario: Enlace directo sin sesión
- **WHEN** alguien sin sesión abre `/clientes/123`
- **THEN** ve `/login` y, al iniciar sesión, llega a `/clientes/123`

### Requirement: Perfil y cambio de contraseña
La pantalla `/perfil` SHALL mostrar nombre, correo y rol del usuario, un formulario para cambiar la contraseña (actual, nueva y confirmación, la nueva de al menos 8 caracteres y coincidente) y el botón "Cerrar sesión".

#### Scenario: Confirmación distinta
- **WHEN** la nueva contraseña y su confirmación no coinciden
- **THEN** el formulario muestra "Las contraseñas no coinciden" sin llamar a la API
