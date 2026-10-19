# Spec Delta

## Purpose
Pantallas para contactar a los clientes con recordatorios de post-venta pendientes, registrar el resultado y configurar los mensajes.

## ADDED Requirements

### Requirement: Lista de recordatorios pendientes
La pantalla `/post-venta` SHALL listar los recordatorios pendientes con el nombre del cliente, el motivo (inactividad o agradecimiento), los días sin venir y la fecha de su último servicio. La navegación SHALL mostrar la cantidad de pendientes junto a "Post-venta". Si no hay pendientes, SHALL mostrar "No hay clientes para contactar hoy".

#### Scenario: Pendientes del día
- **WHEN** el usuario abre `/post-venta` y hay 5 recordatorios pendientes
- **THEN** ve los 5, del cliente que lleva más tiempo sin venir al que menos

### Requirement: Contactar por WhatsApp o llamada
Cada recordatorio SHALL tener los botones "WhatsApp" (abre `enlaceWhatsapp` en una pestaña nueva) y "Llamar" (abre `enlaceLlamada`). Al volver a la app después de abrir uno de ellos, SHALL preguntarse "¿Pudiste contactar a <nombre>?" con las opciones "Sí, marcar como contactado" (con el canal usado) y "Todavía no".

#### Scenario: Mensaje enviado por WhatsApp
- **WHEN** el usuario toca "WhatsApp", envía el mensaje y vuelve a la app
- **THEN** la app pregunta si pudo contactarlo y, al confirmar, marca el recordatorio como contactado por WhatsApp

### Requirement: Contactar por correo
Si el cliente tiene correo, el recordatorio SHALL ofrecer "Enviar correo". Si la API tiene proveedor configurado, SHALL enviarlo con `POST .../enviar-correo` y marcarlo contactado; si la API responde 503, SHALL ofrecer abrir `enlaceCorreo` (`mailto:`) para enviarlo desde el correo del celular.

#### Scenario: Sin proveedor de correo
- **WHEN** la API responde que el envío de correos no está configurado
- **THEN** la app ofrece "Abrir en tu correo" con el mensaje ya escrito

### Requirement: Descartar
El usuario SHALL poder descartar un recordatorio con una nota opcional (por ejemplo "Ya no tiene el vehículo"), con confirmación.

#### Scenario: Cliente que se mudó
- **WHEN** el usuario descarta un recordatorio con la nota "Se mudó de ciudad"
- **THEN** el recordatorio sale de la lista de pendientes

### Requirement: Historial de contactos
La pantalla SHALL tener una pestaña "Historial" con los recordatorios contactados y descartados, filtrables por estado, mostrando canal, fecha, quién contactó y notas.

#### Scenario: Revisar contactos de la semana
- **WHEN** el admin abre el historial
- **THEN** ve quién contactó a cada cliente, por qué canal y cuándo

### Requirement: Configuración de la post-venta
La pantalla `/ajustes/post-venta`, solo para `admin`, SHALL permitir editar los días de inactividad, los días entre contactos, activar el agradecimiento y editar las plantillas de WhatsApp y de correo, mostrando las variables disponibles y una vista previa del mensaje con datos de ejemplo. SHALL ofrecer también "Generar recordatorios ahora", que muestra cuántos se crearon.

#### Scenario: Vista previa de la plantilla
- **WHEN** el admin escribe "Hola {{nombre}}, te esperamos en {{negocio}}"
- **THEN** la vista previa muestra "Hola Ana, te esperamos en Minho Gloss"
