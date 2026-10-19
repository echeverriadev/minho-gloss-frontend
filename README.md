# Minho Gloss · Frontend

App web (mobile first) para gestionar el autolavado Minho Gloss: clientes, servicios, métricas y post-venta.

**Stack:** React 19 · Vite · TypeScript · React Router · Tailwind CSS 4 · Lucide React · React Hook Form · Zustand (si hace falta) · Storybook · oxlint · Prettier · OpenSpec

## Requisitos

Solo **Docker** y **Docker Compose** (Docker Desktop en Windows/macOS). No hace falta instalar Node.js.

Para ver datos reales, levanta también el [backend](../minho-gloss-backend) (`docker compose up` en ese repo).

## Levantar el entorno

```bash
cp .env.example .env        # opcional, los valores por defecto ya funcionan
docker compose up --build
```

| Qué                                                           | URL                   |
| ------------------------------------------------------------- | --------------------- |
| App                                                           | http://localhost:5173 |
| Storybook (`docker compose --profile storybook up storybook`) | http://localhost:6006 |

## Comandos habituales

Todos se ejecutan **dentro del contenedor**:

```bash
docker compose exec web npm run lint          # oxlint
docker compose exec web npm run format        # Prettier
docker compose exec web npm run build         # chequeo de tipos + build
docker compose exec web npm install <paquete> # nueva dependencia
docker compose exec web npx openspec list     # cambios de OpenSpec en curso
```

Si cambia `package.json` en otra rama (por ejemplo tras un `git pull`), actualiza las dependencias del volumen con `docker compose exec web npm install`.

## Estructura

```
src/
  main.tsx           # punto de entrada
  app/               # App y router
  pages/             # una página por ruta (solo composición)
  features/          # un dominio por carpeta: auth, clientes, servicios...
  shared/
    ui/              # componentes reutilizables (cada uno con su .stories.tsx)
    lib/             # utilidades, cliente HTTP
    config/          # variables de entorno
  styles/            # Tailwind y tema
openspec/            # especificaciones (SDD)
  specs/             # comportamiento vigente
  changes/           # propuestas de cambio en curso y archivadas
```

## Cómo trabajamos (SDD con OpenSpec)

1. Crea una rama `feature/<nombre>` desde `develop`.
2. Escribe la propuesta del cambio en `openspec/changes/` (con Claude Code: `/opsx:propose "idea"`).
3. Valídala: `docker compose exec web npx openspec validate <cambio>`.
4. Implementa siguiendo su `tasks.md` (`/opsx:apply`).
5. Pasa lint, formato y build, abre el pull request hacia `develop`.
6. Al integrar, archiva el cambio (`/opsx:archive`) para actualizar `openspec/specs/`.

Las reglas completas (Git Flow, commits, nombres, lint) están en [`openspec/specs/project-conventions/spec.md`](openspec/specs/project-conventions/spec.md).

## Producción

```bash
docker build --target prod --build-arg VITE_API_URL=https://tu-api/api -t minho-gloss-web .
```
