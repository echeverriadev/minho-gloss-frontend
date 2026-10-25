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

La app necesita el backend levantado (`minho-gloss-backend`, `docker compose up`). Para entrar usa el admin inicial que crea el backend desde su `.env` (en desarrollo `admin@minhogloss.local` / `MinhoGloss2026`). No hay registro público: el admin crea las cuentas en **Ajustes → Usuarios**. Los correos de recuperación de contraseña se ven en Mailpit, http://localhost:8025.

## Comandos habituales

Todos se ejecutan **dentro del contenedor**:

```bash
docker compose exec web npm run check         # lint + formato + build + specs
docker compose exec web npm run lint          # oxlint (con chequeo de tipos)
docker compose exec web npm run lint:fix      # corrige lo que oxlint puede
docker compose exec web npm run format        # Prettier
docker compose exec web npm run build         # chequeo de tipos + build
docker compose exec web npm install <paquete> # nueva dependencia
docker compose exec web npx openspec list     # cambios de OpenSpec en curso
docker compose exec web npm run specs:validate # valida specs y cambios
```

Si cambia `package.json` en otra rama (por ejemplo tras un `git pull`), actualiza las dependencias del volumen con `docker compose exec web npm install`.

## Estructura

```
src/
  main.tsx           # punto de entrada
  app/               # App, router y layout (navegación por rol)
  pages/             # una página por ruta (solo composición)
  features/          # un dominio por carpeta: auth, usuarios, clientes...
  shared/
    ui/              # componentes reutilizables (cada uno con su .stories.tsx)
    lib/             # utilidades, cliente HTTP, formatos
    hooks/           # useAsync, useDebouncedValue
    config/          # variables de entorno
  styles/            # Tailwind y tema
openspec/            # especificaciones (SDD)
  specs/             # comportamiento vigente
  changes/           # propuestas de cambio en curso y archivadas
```

## Cómo trabajamos (SDD con OpenSpec)

1. Crea una rama `feature/<cambio>` desde `develop`.
2. Escribe o elige la propuesta del cambio en `openspec/changes/` (con Claude Code: `/opsx:propose "idea"`). Las pantallas de la v1 ya tienen su cambio listo: ver [`openspec/README.md`](openspec/README.md).
3. Valídala: `docker compose exec web npx openspec validate <cambio>`.
4. Implementa siguiendo su `tasks.md` (`/opsx:apply`).
5. Pasa `npm run check`, abre el pull request hacia `develop` y espera la CI en verde.
6. Al integrar, archiva el cambio (`/opsx:archive`) para actualizar `openspec/specs/`.

Reglas completas:

- [`openspec/README.md`](openspec/README.md): mapa de specs y cambios pendientes.
- [`git-workflow`](openspec/specs/git-workflow/spec.md): ramas, commits y pull requests.
- [`code-style`](openspec/specs/code-style/spec.md): nombres, React, Tailwind, lint, formato y accesibilidad.
- [`frontend-architecture`](openspec/specs/frontend-architecture/spec.md): estructura, rutas, estado y API.
- [`decisiones-tecnicas.md`](openspec/decisiones-tecnicas.md): decisiones adoptadas y sugerencias pendientes.

## Calidad de código

- **Prettier** formatea todo y ordena las clases de Tailwind (`.prettierrc.json`); **oxlint** revisa el código con reglas de React, TypeScript, imports, promesas y accesibilidad, usando información de tipos (`.oxlintrc.json`). Los warnings también hacen fallar.
- La **CI de GitHub Actions** (`.github/workflows/ci.yml`) corre lint, formato, build, build de Storybook y validación de specs en cada pull request.
- En VS Code, instala las extensiones recomendadas (`.vscode/extensions.json`) para formatear al guardar.

## Producción

```bash
docker build --target prod --build-arg VITE_API_URL=https://tu-api/api -t minho-gloss-web .
```
