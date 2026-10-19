# features

Una carpeta por funcionalidad de negocio (por ejemplo `auth`, `clientes`, `servicios`, `post-venta`).
Cada feature agrupa sus componentes, hooks, store (Zustand) y llamadas a la API:

```
features/clientes/
  components/
  hooks/
  api.ts
  store.ts      # solo si hace falta estado global
  index.ts      # lo que la feature expone al resto de la app
```

Las features no se importan entre sí directamente; lo compartido va en `src/shared`.
