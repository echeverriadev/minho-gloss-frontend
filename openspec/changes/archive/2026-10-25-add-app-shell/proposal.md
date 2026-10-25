# Proposal

## Why

Antes de construir las pantallas de cada módulo hace falta el marco común: la navegación pensada para el celular, los componentes base reutilizables y la forma uniforme de mostrar carga, errores y avisos. Hacerlo primero evita que cada pantalla invente su propio botón, campo o mensaje de error.

## What Changes

- Layout principal con encabezado y navegación inferior en el celular (barra lateral desde `md:`), con las opciones según el rol.
- Kit de componentes compartidos en `src/shared/ui/`, cada uno con su historia de Storybook: `Button` (variantes, tamaño, cargando), `IconButton`, `Input`, `Select`, `Textarea`, `Checkbox`, `MoneyInput`, `SearchInput`, `Card`, `Badge`, `EmptyState`, `ErrorState`, `Spinner`, `Skeleton`, `Dialog` de confirmación y `Toast`.
- Página "No encontrada" y carga diferida de páginas por ruta.
- Hook compartido para cargar datos con estados de carga, error y reintento.
- Utilidades de formato de moneda y fecha (ya creadas en `src/shared/lib/format.ts`).

Fuera de alcance: modo oscuro, temas configurables por el usuario, animaciones avanzadas e instalación como PWA (sugerencia S10).

## Capabilities

### New Capabilities
- `app-shell`: estructura visual común de la app, navegación por rol y patrones compartidos de carga, error y avisos.

### Modified Capabilities

## Impact

- Código nuevo: `src/app/layout/`, `src/shared/ui/*`, `src/shared/hooks/useAsync.ts`, `src/pages/NotFoundPage.tsx`.
- `router.tsx` pasa a usar un layout con rutas hijas y `lazy`.
- Sin dependencias nuevas (íconos con Lucide, ya instalado).
