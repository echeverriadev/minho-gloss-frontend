# OpenSpec · Minho Gloss Frontend

Mapa de las especificaciones del frontend. Las reglas de cómo se usan están en [`specs/project-conventions`](specs/project-conventions/spec.md).

## Specs vigentes (`specs/`)

| Spec | Qué define | Compartida con el backend |
| --- | --- | --- |
| [`product-scope`](specs/product-scope/spec.md) | Visión, roles, alcance de la v1, fuera de alcance, contexto regional y glosario | Sí |
| [`domain-model`](specs/domain-model/spec.md) | Entidades (Usuario, Cliente, Vehiculo, TipoServicio, ServicioPrestado, Recordatorio), campos y reglas | Sí |
| [`git-workflow`](specs/git-workflow/spec.md) | Git Flow, nombres de ramas, Conventional Commits, pull requests y versiones | Sí |
| [`project-conventions`](specs/project-conventions/spec.md) | SDD con OpenSpec, organización de specs, idioma, costo mínimo, decisiones técnicas, definición de terminado | Sí |
| [`code-style`](specs/code-style/spec.md) | Prettier, oxlint, TypeScript, nombres, exports, React, Tailwind, accesibilidad, textos, `npm run check` y CI | No |
| [`frontend-architecture`](specs/frontend-architecture/spec.md) | Estructura por features, mapa de rutas, mobile first, estado, API, carga/error, formularios y Storybook | No |
| [`dev-environment`](specs/dev-environment/spec.md) | Docker Compose, recarga en caliente, Storybook, variables de entorno, imagen de producción | No |

Decisiones técnicas y sugerencias pendientes: [`decisiones-tecnicas.md`](decisiones-tecnicas.md) (compartido con el backend).

## Cambios pendientes (`changes/`)

Orden sugerido de implementación en la fase 3 del roadmap. Cada cambio de pantallas depende del cambio equivalente del backend.

| # | Cambio | Capacidades nuevas | Depende del backend | Resumen |
| --- | --- | --- | --- | --- |
| 1 | [`add-app-shell`](changes/add-app-shell/proposal.md) | `app-shell` | — | Layout mobile first, navegación por rol, kit de componentes con Storybook, carga/error/avisos |
| 2 | [`add-auth-ui`](changes/add-auth-ui/proposal.md) | `sesion`, `gestion-usuarios` | `add-auth` | Login, sesión persistente, rutas protegidas, perfil y usuarios |
| 3 | [`add-clientes-ui`](changes/add-clientes-ui/proposal.md) | `gestion-clientes` | `add-clientes` | Búsqueda por nombre/teléfono/placa, ficha, alta con vehículos, contacto rápido |
| 4 | [`add-catalogo-servicios-ui`](changes/add-catalogo-servicios-ui/proposal.md) | `catalogo-servicios` | `add-catalogo-servicios` | Ajustes del admin: tipos de servicio y precios por vehículo |
| 5 | [`add-registro-servicios-ui`](changes/add-registro-servicios-ui/proposal.md) | `registro-servicios` | `add-servicios-prestados` | Registro en menos de 30 s desde la placa, servicios del día, anulación |
| 6 | [`add-metricas-ui`](changes/add-metricas-ui/proposal.md) | `panel-metricas` | `add-metricas` | Panel por periodo, variación, gráfico diario, desgloses, inactivos |
| 7 | [`add-post-venta-ui`](changes/add-post-venta-ui/proposal.md) | `contacto-post-venta` | `add-post-venta` | Pendientes del día, WhatsApp/llamada/correo, historial y plantillas |

## Flujo de trabajo

```bash
docker compose exec web npx openspec list                    # cambios en curso
docker compose exec web npx openspec show add-clientes-ui    # ver un cambio
docker compose exec web npm run specs:validate               # validar specs y cambios
docker compose exec web npx openspec archive add-clientes-ui # al integrar el PR
```

Con Claude Code: `/opsx:propose`, `/opsx:apply <cambio>`, `/opsx:archive <cambio>`.
