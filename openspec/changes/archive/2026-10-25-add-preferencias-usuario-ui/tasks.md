# Tasks

## 1. Base

- [x] 1.1 Crear `usePreferenciasStore` (idioma y tema, persistido) y aplicarlo a `<html>`
- [x] 1.2 Crear los diccionarios `es` y `pt` con el tipo `Textos` y `useTextos()`/`getTextos()`
- [x] 1.3 Hacer que `format.ts` use el locale del idioma y que `apiClient` envíe `Accept-Language`

## 2. Pantallas

- [x] 2.1 Pasar todos los textos de componentes y páginas a los diccionarios
- [x] 2.2 Crear `PreferenciasForm` en el perfil y aplicar las preferencias del usuario al iniciar sesión
- [x] 2.3 Agregar el modo oscuro redefiniendo los colores del tema

## 3. Verificación

- [x] 3.1 Probar a mano: cambiar idioma y tema, recargar, error de la API en portugués
- [x] 3.2 Ejecutar `npm run check` y el build de Storybook
