# frontend-architecture Specification

## Purpose
Estructura y reglas técnicas del frontend de Minho Gloss (React + Vite + TypeScript), pensado para usarse principalmente desde el celular en el autolavado: organización por features, mapa de rutas, manejo de estado, acceso a la API, formularios, estados de carga y error, y documentación de componentes.

## Requirements

### Requirement: Estructura por funcionalidades
El código SHALL organizarse en `src/app/` (arranque, router, layout y guards de rutas), `src/pages/` (una página por ruta, solo composición), `src/features/<funcionalidad>/` (componentes, hooks, API, tipos y estado de cada dominio), `src/shared/` (`ui`, `lib`, `config`, `hooks`) y `src/styles/`. Los imports entre carpetas SHALL usar el alias `@/` para `src/`. Las features previstas para la v1 SHALL ser `auth`, `usuarios`, `clientes`, `tipos-servicio`, `servicios-prestados`, `metricas` y `post-venta`.

#### Scenario: Agregar la gestión de clientes
- **WHEN** se implementa la pantalla de clientes
- **THEN** su lógica vive en `src/features/clientes/` y la ruta en `src/pages/ClientesPage.tsx` la compone

### Requirement: Estructura interna de una feature
Cada feature SHALL seguir esta estructura, creando solo lo que necesite: `components/` (componentes propios de la feature), `hooks/` (hooks de datos y lógica), `api.ts` (funciones que llaman a la API), `types.ts` (tipos alineados con `domain-model`), `store.ts` (solo si hace falta estado global) e `index.ts` (lo que la feature expone).

#### Scenario: Feature de métricas
- **WHEN** se crea la feature de métricas
- **THEN** tiene `api.ts` con `getResumen` y `getSerieDiaria`, `types.ts` con sus respuestas, hooks en `hooks/` y exporta sus componentes desde `index.ts`

### Requirement: Features independientes
Una feature SHALL NOT importar archivos internos de otra feature; SHALL usar solo lo que la otra exporta en su `index.ts`, y lo que necesiten varias SHALL moverse a `src/shared/`.

#### Scenario: Componente usado por dos features
- **WHEN** clientes y servicios prestados necesitan el mismo selector de fecha
- **THEN** el selector se mueve a `src/shared/ui/DatePicker/`

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

### Requirement: Mobile first
La interfaz SHALL diseñarse primero para pantallas de 360 px de ancho y ampliarse con los breakpoints de Tailwind (`sm:`, `md:`, `lg:`). Los elementos táctiles SHALL medir al menos 44 px de alto, los formularios SHALL usar el teclado adecuado (`inputMode="tel"`, `type="email"`, `inputMode="numeric"`) y las acciones principales SHALL quedar al alcance del pulgar (navegación inferior en el celular).

#### Scenario: Revisar una pantalla nueva
- **WHEN** se termina una pantalla
- **THEN** se verifica en 360 px de ancho sin scroll horizontal y con la acción principal visible sin desplazarse

### Requirement: Librerías base
El frontend SHALL usar React Router para la navegación, Tailwind CSS para estilos, Lucide React para íconos y React Hook Form para formularios. Una librería nueva SHALL justificarse según la spec `project-conventions`.

#### Scenario: Formulario de alta de cliente
- **WHEN** se construye un formulario
- **THEN** se usa React Hook Form para registro de campos y validación

### Requirement: Manejo de estado
El estado SHALL vivir lo más cerca posible de donde se usa: estado local de React para la interfaz de un componente, parámetros de la URL (`useSearchParams`) para filtros y búsquedas que deben sobrevivir a recargar o compartirse, hooks de la feature para datos de la API, y Zustand solo para estado compartido entre pantallas que no viene de la URL (por ejemplo la sesión). Los stores de Zustand SHALL ser pequeños, uno por feature, y exponer acciones con nombre en lugar de `setState` crudo.

#### Scenario: Filtro de fecha de los servicios
- **WHEN** el admin filtra los servicios por un día
- **THEN** la fecha queda en la URL (`/servicios?desde=2026-10-18&hasta=2026-10-18`) y no en un store global

### Requirement: Acceso a la API centralizado
Las llamadas HTTP SHALL pasar por `src/shared/lib/apiClient.ts`, que toma la URL base de `VITE_API_URL`, envía JSON, agrega el token de la sesión cuando existe y convierte las respuestas de error de la API en un `ApiError` con `status` y `message`. Cada feature SHALL definir sus funciones de API en su propio `api.ts` usando ese cliente; los componentes SHALL NOT llamar a `fetch` directamente.

#### Scenario: Estado de la API en el inicio
- **WHEN** se abre la página de inicio sin sesión configurada
- **THEN** la app consulta `GET /api/health` a través de `apiClient` y muestra si la API está conectada

### Requirement: Estados de carga, vacío y error
Toda pantalla que lee datos de la API SHALL mostrar un estado de carga, un estado vacío con una acción sugerida cuando no hay datos, y un estado de error con el mensaje de la API y un botón para reintentar. Las acciones que modifican datos SHALL deshabilitar su botón mientras se envían y confirmar el resultado con un aviso breve.

#### Scenario: Lista de clientes vacía
- **WHEN** todavía no hay clientes registrados
- **THEN** la pantalla muestra "Aún no hay clientes" con un botón "Agregar cliente"

#### Scenario: API caída
- **WHEN** falla la carga de los servicios del día
- **THEN** se muestra el mensaje de error y un botón "Reintentar"

### Requirement: Formularios
Los formularios SHALL usar React Hook Form con las reglas de validación de `domain-model` (las mismas longitudes, formatos y obligatoriedad que la API), mostrar el error debajo de cada campo en español, enfocar el primer campo con error al enviar y mostrar los errores 400/409 de la API en el campo correspondiente cuando se puedan asociar, o arriba del formulario si no.

#### Scenario: Teléfono repetido al crear un cliente
- **WHEN** la API responde 409 por teléfono repetido
- **THEN** el formulario muestra el mensaje debajo del campo teléfono con un enlace al cliente existente

### Requirement: Componentes propios con Storybook
Cada componente reutilizable de `src/shared/ui/` SHALL tener su archivo `*.stories.tsx` junto al componente, con al menos una historia por variante y estado (por ejemplo deshabilitado, cargando, con error), y SHALL revisarse con el addon de accesibilidad. Los componentes de una feature MAY tener historias si son visuales y complejos. Los componentes de librerías externas SHALL NOT documentarse en Storybook.

#### Scenario: Nuevo componente compartido
- **WHEN** se crea `src/shared/ui/Input/Input.tsx`
- **THEN** se crea también `Input.stories.tsx` con las historias normal, con error y deshabilitado

### Requirement: Calidad antes de integrar
Antes de abrir un pull request, `npm run check` (lint, formato, build con chequeo de tipos y validación de specs) SHALL pasar sin errores, igual que la integración continua.

#### Scenario: Build con errores de tipos
- **WHEN** `npm run build` falla por TypeScript
- **THEN** el pull request no se abre hasta corregirlo
