# Tasks

## 1. Componentes compartidos

- [ ] 1.1 Ampliar `Button` (variantes `primary`, `secondary`, `danger`, `ghost`; tamaños; `isLoading`; ancho completo) con sus historias
- [ ] 1.2 Crear `IconButton`, `Input`, `Select`, `Textarea`, `Checkbox`, `MoneyInput` y `SearchInput` con `label`, `error`, `hint` y `ref`, cada uno con historias
- [ ] 1.3 Crear `Card`, `Badge`, `EmptyState`, `ErrorState`, `Spinner` y `Skeleton` con historias
- [ ] 1.4 Crear `ConfirmDialog` con `<dialog>` nativo y su historia
- [ ] 1.5 Crear `Toast` con `useToastStore` y su historia

## 2. Layout y rutas

- [ ] 2.1 Crear `AppLayout` con encabezado, barra inferior en el celular y barra lateral desde `md:`
- [ ] 2.2 Reorganizar `router.tsx` con el layout, rutas hijas cargadas con `lazy` y `NotFoundPage`
- [ ] 2.3 Preparar la navegación por rol (se conecta a la sesión en `add-auth-ui`)

## 3. Datos

- [ ] 3.1 Crear `useAsync` en `src/shared/hooks/` con `data`, `error`, `isLoading` y `reload`
- [ ] 3.2 Usar `useAsync`, `ErrorState` y `Spinner` en la página de inicio actual

## 4. Verificación

- [ ] 4.1 Revisar todas las historias con el addon de accesibilidad
- [ ] 4.2 Verificar el layout en 360 px, 768 px y 1280 px
- [ ] 4.3 Ejecutar `npm run check` y dejarlo en verde
