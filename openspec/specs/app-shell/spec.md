# app-shell Specification

## Purpose
Estructura visual común de la app de Minho Gloss: layout, navegación por rol, componentes compartidos y patrones uniformes de carga, error y avisos.

## Requirements

### Requirement: Layout y navegación
Las páginas con sesión SHALL mostrarse dentro de un layout con encabezado (nombre de la sección y acceso al perfil) y navegación. En pantallas menores a `md` la navegación SHALL ser una barra inferior fija con ícono y texto; desde `md` SHALL ser una barra lateral. La opción de la sección actual SHALL resaltarse e indicarse con `aria-current="page"`. La navegación SHALL mostrar solo las secciones que ya existen en la app; cada cambio que agrega una sección (servicios, post-venta, métricas) suma su opción.

#### Scenario: Navegar desde el celular
- **WHEN** un usuario abre la app en un celular de 360 px
- **THEN** ve la barra inferior con las secciones disponibles (por ejemplo Inicio, Clientes y Perfil, y Ajustes si es admin)
- **AND** la sección actual aparece resaltada

### Requirement: Navegación según el rol
La navegación SHALL mostrar Métricas y Ajustes solo a usuarios `admin`. Si un `empleado` abre una ruta exclusiva de `admin`, la app SHALL redirigirlo al inicio con el aviso "No tienes permiso para ver esa sección".

#### Scenario: Empleado abre métricas por URL
- **WHEN** un empleado escribe `/metricas` en el navegador
- **THEN** la app lo lleva a `/` y muestra el aviso de permiso

### Requirement: Componentes compartidos
`src/shared/ui/` SHALL ofrecer los componentes `Button`, `IconButton`, `Input`, `Select`, `Textarea`, `Checkbox`, `MoneyInput`, `SearchInput`, `Card`, `Badge`, `EmptyState`, `ErrorState`, `Spinner`, `Skeleton`, `ConfirmDialog` y `Toast`, cada uno con su historia de Storybook por variante y estado. Los campos de formulario SHALL aceptar `label`, `error` y `hint`, y conectarse con React Hook Form mediante `ref`.

#### Scenario: Campo con error
- **WHEN** un `Input` recibe `error="El teléfono no es válido"`
- **THEN** muestra el mensaje en rojo debajo del campo y lo asocia con `aria-describedby` y `aria-invalid`

#### Scenario: Botón cargando
- **WHEN** un `Button` recibe `isLoading`
- **THEN** muestra un spinner, queda deshabilitado y conserva su ancho

### Requirement: Estados de carga, vacío y error
Las pantallas SHALL usar `Skeleton` o `Spinner` mientras cargan, `EmptyState` (ícono, mensaje y acción opcional) cuando no hay datos y `ErrorState` (mensaje de la API y botón "Reintentar") cuando falla la carga. Un error sin conexión SHALL mostrarse como "No hay conexión con el servidor".

#### Scenario: Reintentar después de un error
- **WHEN** falla la carga de una lista y el usuario toca "Reintentar"
- **THEN** la app vuelve a pedir los datos y muestra el estado de carga

### Requirement: Avisos breves
Las acciones que crean, editan o eliminan datos SHALL confirmar el resultado con un `Toast` que desaparece solo a los 4 segundos, de tipo éxito o error, anunciado a lectores de pantalla con `role="status"`.

#### Scenario: Guardar un cliente
- **WHEN** se guarda un cliente correctamente
- **THEN** aparece el aviso "Cliente guardado" y desaparece solo

### Requirement: Confirmación de acciones destructivas
Dar de baja, anular o descartar SHALL pedir confirmación con un `ConfirmDialog` que nombra el objeto afectado y usa un botón de peligro.

#### Scenario: Anular un servicio
- **WHEN** el admin toca "Anular" en un servicio
- **THEN** la app pregunta "¿Anular el servicio de AA12BB?" antes de enviarlo

### Requirement: Página no encontrada
Una ruta desconocida SHALL mostrar "No encontramos esta página" con un botón para volver al inicio.

#### Scenario: Enlace roto
- **WHEN** se abre `/clientes/abc/xyz`
- **THEN** se muestra la página no encontrada
