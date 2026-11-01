# Spec Delta

## Purpose
La feature de la operación diaria se llama `atenciones` y suma la ruta del detalle imprimible.

## MODIFIED Requirements

### Requirement: Estructura por funcionalidades
El código SHALL organizarse en `src/app/` (arranque, router, layout y guards de rutas), `src/pages/` (una página por ruta, solo composición), `src/features/<funcionalidad>/` (componentes, hooks, API, tipos y estado de cada dominio), `src/shared/` (`ui`, `lib`, `config`, `hooks`) y `src/styles/`. Los imports entre carpetas SHALL usar el alias `@/` para `src/`. Las features previstas para la v1 SHALL ser `auth`, `usuarios`, `clientes`, `tipos-servicio`, `atenciones`, `metricas` y `post-venta`.

#### Scenario: Agregar la gestión de clientes
- **WHEN** se implementa la pantalla de clientes
- **THEN** su lógica vive en `src/features/clientes/` y la ruta en `src/pages/ClientesPage.tsx` la compone

### Requirement: Mapa de rutas
Las rutas SHALL definirse en `src/app/router.tsx` con nombres en español y en `kebab-case`:

| Ruta | Página | Rol |
| --- | --- | --- |
| `/login` | Inicio de sesión | público |
| `/recuperar-password` · `/restablecer-password` | Recuperar la contraseña por correo | público |
| `/` | Inicio: registrar servicio y servicios del día | cualquiera |
| `/servicios` · `/servicios/nuevo` · `/servicios/:id` | Atenciones del día, registro y detalle imprimible | cualquiera |
| `/clientes` · `/clientes/nuevo` · `/clientes/:id` · `/clientes/:id/editar` | Clientes | cualquiera |
| `/post-venta` | Recordatorios a contactar | cualquiera |
| `/metricas` | Métricas | admin |
| `/ajustes` · `/ajustes/tipos-servicio` · `/ajustes/usuarios` · `/ajustes/post-venta` | Ajustes del negocio | admin |
| `/perfil` | Datos propios y cambio de contraseña | cualquiera |

Las páginas SHALL cargarse con `lazy` del router para dividir el código por ruta. Una ruta desconocida SHALL mostrar una página "No encontrada" con enlace al inicio.

#### Scenario: Enlace del correo de recuperación
- **WHEN** alguien sin sesión abre `/restablecer-password?token=abc`
- **THEN** ve el formulario para elegir una contraseña nueva sin que la app lo mande a `/login`

#### Scenario: Ruta inexistente
- **WHEN** se abre `/no-existe`
- **THEN** la app muestra "No encontramos esta página" con un botón para volver al inicio
