# frontend-architecture Specification

## Purpose
Estructura y reglas técnicas del frontend de Minho Gloss (React + Vite + TypeScript), pensado para usarse principalmente desde el celular en el autolavado.

## Requirements

### Requirement: Estructura por funcionalidades
El código SHALL organizarse en `src/app/` (arranque y router), `src/pages/` (una página por ruta, solo composición), `src/features/<funcionalidad>/` (componentes, hooks, API y estado de cada dominio), `src/shared/` (`ui`, `lib`, `config`) y `src/styles/`. Los imports SHALL usar el alias `@/` para `src/`.

#### Scenario: Agregar la gestión de clientes
- **WHEN** se implementa la pantalla de clientes
- **THEN** su lógica vive en `src/features/clientes/` y la ruta en `src/pages/` la compone

### Requirement: Features independientes
Una feature SHALL NOT importar archivos internos de otra feature; lo que necesiten ambas SHALL moverse a `src/shared/`.

#### Scenario: Componente usado por dos features
- **WHEN** clientes y servicios necesitan el mismo selector de fecha
- **THEN** el selector se mueve a `src/shared/ui/`

### Requirement: Mobile first
La interfaz SHALL diseñarse primero para pantallas de 360 px de ancho y ampliarse con los breakpoints de Tailwind (`sm:`, `md:`, `lg:`). Los elementos táctiles SHALL medir al menos 44 px de alto.

#### Scenario: Revisar una pantalla nueva
- **WHEN** se termina una pantalla
- **THEN** se verifica en 360 px de ancho sin scroll horizontal

### Requirement: Librerías base
El frontend SHALL usar React Router para la navegación, Tailwind CSS para estilos, Lucide React para íconos y React Hook Form para formularios. El estado global SHALL manejarse con Zustand solo cuando un estado se comparta entre varias pantallas; en otro caso SHALL usarse estado local de React.

#### Scenario: Formulario de alta de cliente
- **WHEN** se construye un formulario
- **THEN** se usa React Hook Form para registro de campos y validación

### Requirement: Componentes propios con Storybook
Cada componente reutilizable de `src/shared/ui/` SHALL tener su archivo `*.stories.tsx` junto al componente, con al menos una historia por variante.

#### Scenario: Nuevo componente compartido
- **WHEN** se crea `src/shared/ui/Input/Input.tsx`
- **THEN** se crea también `Input.stories.tsx` en la misma carpeta

### Requirement: Acceso a la API centralizado
Las llamadas HTTP SHALL pasar por `src/shared/lib/apiClient.ts`, que toma la URL base de `VITE_API_URL`. Cada feature SHALL definir sus funciones de API en su propio `api.ts` usando ese cliente.

#### Scenario: Estado de la API en el inicio
- **WHEN** se abre la página de inicio
- **THEN** la app consulta `GET /api/health` y muestra si la API está conectada

### Requirement: Calidad antes de integrar
Antes de abrir un pull request, `npm run lint`, `npm run format:check` y `npm run build` (que incluye el chequeo de tipos) SHALL pasar sin errores.

#### Scenario: Build con errores de tipos
- **WHEN** `npm run build` falla por TypeScript
- **THEN** el pull request no se abre hasta corregirlo
