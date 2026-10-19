# dev-environment Specification

## Purpose
Entorno de desarrollo del frontend que corre completamente en Docker, para que nadie tenga que instalar Node.js ni otras herramientas en su máquina.

## Requirements

### Requirement: Arranque con un solo comando
El entorno SHALL levantarse con `docker compose up` usando únicamente Docker y Docker Compose. El servicio `web` SHALL usar la imagen `node:24-alpine` (Node.js LTS) y servir la app con Vite en `http://localhost:5173`.

#### Scenario: Primer arranque
- **WHEN** se clona el repo y se ejecuta `docker compose up --build`
- **THEN** la app abre en `http://localhost:5173`

### Requirement: Recarga en caliente
El código fuente SHALL montarse en el contenedor y Vite SHALL detectar cambios por sondeo (`usePolling`) para que funcione igual en Linux, macOS y Windows. `node_modules` SHALL vivir en un volumen de Docker, no en la máquina local.

#### Scenario: Editar un componente
- **WHEN** se guarda un cambio en `src/`
- **THEN** el navegador se actualiza sin reiniciar el contenedor

### Requirement: Storybook en Docker
Storybook SHALL levantarse bajo demanda con `docker compose --profile storybook up storybook` en `http://localhost:6006`, compartiendo el volumen de dependencias con `web`.

#### Scenario: Revisar componentes
- **WHEN** se ejecuta `docker compose --profile storybook up storybook`
- **THEN** Storybook muestra las historias de `src/**/*.stories.tsx`

### Requirement: Comandos de Node dentro del contenedor
Todos los comandos de npm (instalar paquetes, lint, build, OpenSpec) SHALL ejecutarse dentro del contenedor con `docker compose exec web <comando>` o `docker compose run --rm web <comando>`.

#### Scenario: Instalar una dependencia
- **WHEN** se necesita un paquete nuevo
- **THEN** se ejecuta `docker compose exec web npm install <paquete>`

### Requirement: Configuración por variables de entorno
La URL de la API SHALL configurarse con `VITE_API_URL` (por defecto `http://localhost:3000/api`), documentada en `.env.example`. El archivo `.env` SHALL ser opcional y nunca versionarse.

#### Scenario: Apuntar a otra API
- **WHEN** se define `VITE_API_URL` en `.env` y se reinicia `web`
- **THEN** la app usa esa URL para todas las llamadas

### Requirement: Imagen de producción
El `Dockerfile` SHALL tener una etapa `prod` que compile la app y sirva los archivos estáticos con nginx, redirigiendo rutas desconocidas a `index.html` para React Router.

#### Scenario: Construir para producción
- **WHEN** se ejecuta `docker build --target prod --build-arg VITE_API_URL=<url> -t minho-gloss-web .`
- **THEN** se obtiene una imagen nginx que sirve la app en el puerto 80
