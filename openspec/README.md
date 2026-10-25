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
| [`app-shell`](specs/app-shell/spec.md) | Layout, navegación por rol, componentes compartidos, carga/error/avisos | No |
| [`sesion`](specs/sesion/spec.md) | Login, recuperación de contraseña por correo, sesión persistente, rutas protegidas y perfil | No |
| [`gestion-usuarios`](specs/gestion-usuarios/spec.md) | Pantallas del admin para las cuentas del negocio | No |
| [`gestion-clientes`](specs/gestion-clientes/spec.md) | Buscar, ver, crear, editar, dar de baja y anonimizar clientes | No |

Decisiones técnicas y sugerencias pendientes: [`decisiones-tecnicas.md`](decisiones-tecnicas.md) (compartido con el backend).

## Cambios pendientes (`changes/`)

Orden sugerido de implementación en la fase 3 del roadmap. Cada cambio de pantallas depende del cambio equivalente del backend.

Ya implementados y archivados en `changes/archive/`: `add-app-shell`, `add-auth-ui` y `add-clientes-ui`.

| # | Cambio | Capacidades nuevas | Depende del backend | Resumen |
| --- | --- | --- | --- | --- |
| 3b | [`add-vehiculos-ui`](changes/add-vehiculos-ui/proposal.md) | `vehiculos-cliente` | `add-vehiculos` | Vehículos desde la ficha, alta con vehículos, búsqueda por placa, historial |
| 4 | [`add-catalogo-servicios-ui`](changes/add-catalogo-servicios-ui/proposal.md) | `catalogo-servicios` | `add-catalogo-servicios` | Ajustes del admin: tipos de servicio y precios por vehículo |
| 5 | [`add-registro-servicios-ui`](changes/add-registro-servicios-ui/proposal.md) | `registro-servicios` | `add-servicios-prestados` | Registro en menos de 30 s desde la placa, servicios del día, anulación |
| 6 | [`add-metricas-ui`](changes/add-metricas-ui/proposal.md) | `panel-metricas` | `add-metricas` | Panel por periodo, variación, gráfico diario, desgloses, inactivos |
| 7 | [`add-post-venta-ui`](changes/add-post-venta-ui/proposal.md) | `contacto-post-venta` | `add-post-venta` | Pendientes del día, WhatsApp/llamada/correo, historial y plantillas |

## Flujo de trabajo

```bash
docker compose exec web npx openspec list                    # cambios en curso
docker compose exec web npx openspec show add-vehiculos-ui    # ver un cambio
docker compose exec web npm run specs:validate               # validar specs y cambios
docker compose exec web npx openspec archive add-vehiculos-ui # al integrar el PR
```

Con Claude Code: `/opsx:propose`, `/opsx:apply <cambio>`, `/opsx:archive <cambio>`.
