# code-style Specification

## Purpose
Convenciones de código del frontend de Minho Gloss (React + Vite + TypeScript + Tailwind): nombres, estructura de archivos, estilo de React y TypeScript, estilos, lint, formato e integración continua. Su objetivo es que todo el código se lea como si lo hubiera escrito una sola persona.

## Requirements

### Requirement: Formato automático con Prettier
Todo el código, la configuración JSON/YAML y la documentación fuera de `openspec/` SHALL formatearse con Prettier usando `.prettierrc.json`: comillas simples, punto y coma, coma final en todo y ancho de línea 100, con `prettier-plugin-tailwindcss` para ordenar las clases de Tailwind. La indentación SHALL ser de 2 espacios, UTF-8, LF y salto de línea final, según `.editorconfig`. `npm run format:check` SHALL pasar antes de abrir un pull request.

#### Scenario: Clases de Tailwind desordenadas
- **WHEN** un componente tiene `className="p-4 flex"`
- **THEN** `npm run format` lo deja como `className="flex p-4"`

### Requirement: Lint con oxlint y chequeo de tipos
El código SHALL pasar `npm run lint`, que ejecuta oxlint con reglas que usan información de tipos (`--type-aware`), sin errores ni warnings (`--deny-warnings`) y sin comentarios de desactivación sin uso. La configuración vive en `.oxlintrc.json` y SHALL activar:
- Las categorías `correctness` como error, y `suspicious` y `perf` como warning.
- Los plugins `react`, `typescript`, `oxc`, `unicorn`, `import`, `jsx-a11y` y `promise`.
- Como error, entre otras: `react/rules-of-hooks`, `react/exhaustive-deps`, `react/jsx-key`, `react/button-has-type`, `typescript/no-explicit-any`, `typescript/consistent-type-imports`, `typescript/no-floating-promises`, `typescript/no-misused-promises`, `typescript/switch-exhaustiveness-check`, `import/no-cycle`, `import/no-default-export` (salvo historias y archivos de configuración), `unicorn/filename-case` (`PascalCase` o `camelCase`) y las reglas de accesibilidad `jsx-a11y/alt-text`, `jsx-a11y/anchor-is-valid` y `jsx-a11y/label-has-associated-control`.

Desactivar una regla en una línea SHALL hacerse con `// oxlint-disable-next-line <regla> -- <motivo>`, siempre con el motivo. Cambiar la configuración de lint SHALL hacerse mediante un pull request que actualice esta spec.

#### Scenario: Promesa ignorada en un efecto
- **WHEN** un `useEffect` llama a una función asíncrona sin `void` ni manejo del resultado
- **THEN** `npm run lint` falla con `typescript(no-floating-promises)`

#### Scenario: Botón sin tipo
- **WHEN** se escribe `<button onClick={...}>` sin `type`
- **THEN** `npm run lint` falla con `react(button-has-type)`

### Requirement: TypeScript estricto
El proyecto SHALL compilar sin errores con `npm run build` (que ejecuta `tsc -b`), con `verbatimModuleSyntax` activo: los imports que son solo de tipos SHALL usar `import type`. El código SHALL NOT usar `any`; para datos desconocidos SHALL usarse `unknown` y validarse. Las respuestas de la API SHALL tiparse con interfaces en el `types.ts` de cada feature, alineadas con `domain-model`.

#### Scenario: Tipo de un cliente
- **WHEN** una feature necesita el tipo del cliente
- **THEN** se declara `export interface Cliente { ... }` en `src/features/clientes/types.ts` con los campos de `domain-model`

### Requirement: Nombres de archivos y carpetas
Los componentes de React SHALL vivir en archivos `PascalCase.tsx` con el mismo nombre que el componente que exportan (`ClienteCard.tsx` → `ClienteCard`). Los componentes compartidos de `src/shared/ui/` SHALL tener su propia carpeta (`Button/Button.tsx`, `Button/Button.stories.tsx`). Los hooks SHALL llamarse `useAlgo.ts`; los stores de Zustand `useAlgoStore` en `store.ts`; las funciones de API `api.ts`; los tipos `types.ts`; las utilidades `camelCase.ts`. Las páginas SHALL terminar en `Page` (`ClientesPage.tsx`). Las carpetas de features SHALL usar `kebab-case` en plural (`clientes`, `tipos-servicio`, `servicios-prestados`, `post-venta`).

#### Scenario: Nuevo hook de búsqueda
- **WHEN** se crea el hook para buscar clientes
- **THEN** el archivo es `src/features/clientes/hooks/useBuscarClientes.ts` y exporta `useBuscarClientes`

### Requirement: Nombres en el código
Componentes, interfaces y tipos SHALL usar `PascalCase`; variables, funciones y props `camelCase`; constantes inmutables de módulo `UPPER_SNAKE_CASE`. Los conceptos del negocio SHALL nombrarse en español sin tildes ni `ñ` (`cliente`, `tipoServicio`, `precioCobrado`), igual que en la API, y los técnicos en inglés (`isLoading`, `onSubmit`, `handleClick`). Los manejadores de eventos SHALL llamarse `handleX` dentro del componente y `onX` como props. Los booleanos SHALL leerse como pregunta (`isOpen`, `activo`, `aceptaContacto`).

#### Scenario: Prop de selección
- **WHEN** un componente avisa que se eligió un tipo de servicio
- **THEN** la prop se llama `onSelectTipoServicio` y el padre la implementa con `handleSelectTipoServicio`

### Requirement: Exports e imports
Los módulos SHALL usar solo exports con nombre (sin `export default`), salvo historias de Storybook y archivos de configuración. Los imports entre carpetas SHALL usar el alias `@/` y los imports dentro de la misma feature MAY ser relativos. Una feature SHALL exponer al resto de la app solo lo que exporta su `index.ts`; las páginas y otras partes SHALL importar desde `@/features/<feature>`, nunca desde sus archivos internos. No SHALL haber dependencias circulares.

#### Scenario: Página que usa la lista de clientes
- **WHEN** `ClientesPage` necesita `ClientesList`
- **THEN** la importa con `import { ClientesList } from '@/features/clientes'`

### Requirement: Componentes de React
Los componentes SHALL ser funciones con props tipadas por una interfaz `<Componente>Props` y SHALL desestructurar sus props. Un componente SHOULD tener menos de 150 líneas; si crece, se divide. La lógica con estado o efectos reutilizable SHALL extraerse a hooks. Los efectos (`useEffect`) SHALL usarse solo para sincronizar con sistemas externos; los valores derivados SHALL calcularse durante el render. Las listas SHALL usar claves estables (el `id` del dato), nunca el índice.

#### Scenario: Total de una lista
- **WHEN** un componente muestra el total cobrado de los servicios que recibe por props
- **THEN** lo calcula durante el render en lugar de guardarlo en estado con un efecto

### Requirement: Estilos con Tailwind
Los estilos SHALL escribirse con clases de Tailwind en el JSX; SHALL NOT usarse estilos en línea (`style={...}`) salvo para valores calculados en tiempo de ejecución, ni archivos CSS por componente. Los colores de marca y tokens del tema SHALL definirse una sola vez en `src/styles/index.css` (`@theme`) y usarse por nombre (`bg-brand-600`). Las variantes de un componente SHALL mapearse con un objeto `Record<Variante, string>`. Las clases SHALL escribirse mobile first: sin prefijo para el celular y con `sm:`, `md:`, `lg:` para pantallas más grandes.

#### Scenario: Color nuevo de alerta
- **WHEN** se necesita un color para estados de error
- **THEN** se usa la paleta de Tailwind (`red-600`) o se agrega un token en `@theme`, nunca un hexadecimal suelto en un componente

### Requirement: Accesibilidad básica
Todo control de formulario SHALL tener una etiqueta asociada, los íconos decorativos de Lucide SHALL llevar `aria-hidden`, los botones que solo muestran un ícono SHALL tener `aria-label` y las imágenes `alt`. Los elementos táctiles SHALL medir al menos 44 px de alto y el contraste SHALL cumplir WCAG AA. Las historias de Storybook SHALL revisarse con el addon de accesibilidad.

#### Scenario: Botón de llamar con solo ícono
- **WHEN** se muestra un botón con el ícono de teléfono sin texto
- **THEN** el botón tiene `aria-label="Llamar a <nombre>"`

### Requirement: Textos de la interfaz
Los textos visibles SHALL escribirse en los diccionarios de `src/shared/i18n/textos/` (`es.ts` y `pt.ts`, con el mismo tipo `Textos` para que no falte ninguna traducción) y usarse con `useTextos()`; los componentes SHALL NOT tener textos visibles escritos en el código. Los textos SHALL tener tono cercano y de tú, en sentence case ("Registrar servicio", no "Registrar Servicio"). Los montos SHALL mostrarse en euros a partir de céntimos y las fechas en la zona `Europe/Lisbon`, con el formato regional del idioma del usuario (`es-ES` o `pt-PT`), mediante utilidades únicas en `src/shared/lib/format.ts`. Los nombres propios del negocio (títulos de servicios, tipos de vehículo) no se traducen.

#### Scenario: Mostrar un precio
- **WHEN** se muestra un precio de 2000 céntimos
- **THEN** la interfaz muestra "20,00 €"

#### Scenario: Texto nuevo en una pantalla
- **WHEN** se agrega un botón con el texto "Registrar servicio"
- **THEN** el texto se agrega en `es.ts` y en `pt.ts`, y el build falla si falta en alguno

### Requirement: Comentarios
Los comentarios SHALL estar en español y explicar el porqué de una decisión no evidente; SHALL NOT repetir lo que el código ya dice. Un `TODO` SHALL referenciar un cambio de OpenSpec o una sugerencia de `decisiones-tecnicas.md`.

#### Scenario: Excepción a una regla de lint
- **WHEN** se desactiva una regla en una línea
- **THEN** el comentario de desactivación explica el motivo después de `--`

### Requirement: Comando de verificación completa
`npm run check` SHALL ejecutar lint, formato, build (con chequeo de tipos) y validación de las specs de OpenSpec, y SHALL pasar antes de abrir un pull request. `npm run lint:fix` y `npm run format` SHALL usarse para corregir automáticamente lo que se pueda.

#### Scenario: Antes de pedir revisión
- **WHEN** se termina una tarea
- **THEN** se ejecuta `docker compose exec web npm run check` y termina sin errores

### Requirement: Integración continua
Cada pull request hacia `develop` o `main`, y cada push a esas ramas, SHALL ejecutar en GitHub Actions con Node.js 24: `npm ci`, lint, formato, build, build de Storybook y `openspec validate --all`. Un pull request con algún paso en rojo SHALL NOT integrarse.

#### Scenario: Historia de Storybook rota
- **WHEN** una historia importa un componente que ya no existe
- **THEN** el paso "Build de Storybook" de la integración continua falla

### Requirement: Editor recomendado
El repo SHALL incluir `.vscode/extensions.json` con las extensiones de oxc, Prettier, EditorConfig y Tailwind CSS, y `.vscode/settings.json` con formato al guardar y correcciones de oxlint.

#### Scenario: Abrir el repo en VS Code
- **WHEN** se abre el repo por primera vez en VS Code
- **THEN** el editor sugiere instalar las extensiones recomendadas y formatea al guardar
