# Design

## Context

La app se usará casi siempre desde un celular, de pie y con una mano. Hoy solo existe `Button` con dos variantes y una página de inicio de prueba.

## Goals / Non-Goals

**Goals:**
- Navegación de un toque a las 4 o 5 secciones principales.
- Un conjunto pequeño de componentes que cubra todos los formularios y listas de la v1.

**Non-Goals:**
- Un sistema de diseño completo ni una librería publicada.

## Decisions

1. **Navegación inferior fija en el celular** con hasta 5 ítems (Inicio, Clientes, Post-venta, Métricas para admin, Más) y barra lateral desde `md:`. Alternativa: menú hamburguesa; descartada porque esconde las acciones frecuentes.
2. **Componentes propios con Tailwind**, sin librería de componentes (Headless UI, Radix, shadcn). El `Dialog` usa el elemento nativo `<dialog>` con `showModal()`, que ya maneja foco y tecla Escape. Alternativa: Radix; se reconsidera si aparecen necesidades de accesibilidad que lo nativo no cubra.
3. **Toasts con un store pequeño de Zustand** (`useToastStore`) en `src/shared/ui/Toast/`, porque los avisos se disparan desde cualquier pantalla.
4. **`useAsync` propio** en `src/shared/hooks/` que recibe una función que devuelve una promesa y expone `data`, `error`, `isLoading` y `reload`, ignorando respuestas que llegan después de desmontar. Alternativa: TanStack Query (caché, reintentos, invalidación); se deja como sugerencia si la app crece, para no agregar una dependencia en la v1.
5. **`MoneyInput`** muestra el valor formateado en euros mientras se escribe (acepta coma decimal) y entrega un entero en céntimos a React Hook Form.

## Risks / Trade-offs

- [Componentes propios requieren cuidado de accesibilidad] → cada historia se revisa con el addon a11y y los criterios de la spec `code-style`.
- [Sin caché de datos entre pantallas] → se aceptan recargas al volver a una pantalla; las listas son pequeñas.
