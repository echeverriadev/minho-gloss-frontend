# Changelog

Todos los cambios importantes de la app de Minho Gloss se registran en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y las versiones usan **SemVer Simplificado** (`MAJOR.MINOR.PATCH`): `MAJOR` queda en 0 hasta completar la v1 del producto, `MINOR` sube con cada fase del roadmap y `PATCH` solo con correcciones (ver la spec `git-workflow`).

## [Sin publicar]

### Agregado

- **Inicio con el registro rápido (fase 3):** botón "Registrar servicio", resumen del día (el total cobrado solo lo ve el admin) y los últimos servicios de hoy.
- **Registrar servicio** en una sola pantalla: cliente opcional (buscar o crear uno nuevo sin salir), tipo de vehículo y placa, servicios y extras con su precio según el vehículo, método de pago recordado en el dispositivo, notas y total siempre a la vista.
- **Precios personalizados del admin:** cambiar el precio de un servicio elegido (se muestra el descuento) o agregar un servicio fuera del catálogo, sin tocar el catálogo.
- **Servicios del día** (`/servicios`) con resumen y, para el admin, elección de días.
- **Detalle de la atención imprimible** con número, cliente, vehículo, precios de lista y cobrados, descuentos y total, más corrección de pago y notas y anulación con motivo para el admin.
- **Historial de servicios** y botón "Registrar servicio" en la ficha del cliente.

## [0.2.0] - 2026-10-25

Primera versión publicada. Incluye las fases 0, 1 y 2 del roadmap: entorno, especificaciones y las primeras pantallas de la app (acceso, usuarios, clientes, catálogo de servicios y preferencias).

### Agregado

- **Entorno (fase 0):** React 19 con Vite y TypeScript, Tailwind CSS, React Router, React Hook Form y Zustand, todo en Docker Compose (`web` y Storybook opcional).
- **Especificaciones y calidad (fase 1):** OpenSpec con specs de alcance, dominio, arquitectura, estilo de código, entorno y flujo de Git; oxlint con chequeo de tipos, Prettier, Storybook y CI en GitHub Actions (lint, formato, build, Storybook y validación de specs).
- **Base de la app:** diseño pensado primero para el celular, con barra inferior en el celular y lateral en escritorio, navegación según el rol y un kit de componentes documentados en Storybook (botones, campos, diálogos, avisos, estados de carga, vacío y error).
- **Inicio de sesión** con mostrar/ocultar contraseña, sesión que se mantiene durante la jornada y se cierra sola al vencer, y rutas protegidas por rol.
- **Recuperar la contraseña** desde "¿Olvidaste tu contraseña?" con el enlace que llega por correo.
- **Perfil** con datos propios, cambio de contraseña y cierre de sesión.
- **Usuarios** (Ajustes, solo admin): crear cuentas del equipo, editar, desactivar, reactivar y restablecer contraseñas. No hay registro público.
- **Clientes:** lista con buscador (el texto queda en la URL), alta y edición con las mismas validaciones que la API, aviso de cédula o teléfono repetidos con "Ver cliente", ficha con edad y botones Llamar, WhatsApp y Correo, y baja y borrado de datos personales (RGPD) solo para admin.
- **Servicios y extras** (Ajustes, solo admin): catálogo separado en servicios y extras, con precios para Ligeiro, SUV, Monovolume y Carrinha o precio único.
- **Idioma:** toda la app en español o en portugués de Portugal, con fechas y montos en el formato de cada idioma y errores de la API traducidos.
- **Modo oscuro** a elección de cada usuario. Idioma y tema se guardan en la cuenta y se aplican en cualquier dispositivo.

### Corregido

- Abierta como `127.0.0.1` o desde el celular, la app no pasaba del login: ahora llama a la API en el mismo host desde el que se abre.

[Sin publicar]: https://github.com/echeverriadev/minho-gloss-frontend/compare/v0.2.0...develop
[0.2.0]: https://github.com/echeverriadev/minho-gloss-frontend/releases/tag/v0.2.0
