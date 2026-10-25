# Spec Delta

## Purpose
Rutas públicas para recuperar la contraseña.

## MODIFIED Requirements

### Requirement: Mapa de rutas
Las rutas SHALL definirse en `src/app/router.tsx` con nombres en español y en `kebab-case`:

| Ruta | Página | Rol |
| --- | --- | --- |
| `/login` | Inicio de sesión | público |
| `/recuperar-password` · `/restablecer-password` | Recuperar la contraseña por correo | público |
| `/` | Inicio: registrar servicio y servicios del día | cualquiera |
| `/servicios` · `/servicios/nuevo` | Servicios prestados y registro | cualquiera |
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
