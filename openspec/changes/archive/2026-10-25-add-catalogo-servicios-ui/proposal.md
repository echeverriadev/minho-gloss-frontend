# Proposal

## Why

El dueño necesita cargar y actualizar sus servicios, extras y precios sin pedirle a nadie que toque la base de datos. Cada servicio tiene un precio distinto para Ligeiro, SUV, Monovolume y Carrinha, y algunos extras tienen un precio único.

## What Changes

- Pantalla `/ajustes/tipos-servicio` ("Servicios y extras"), solo para admin, con el catálogo separado en servicios y extras y sus precios.
- Formulario de alta y edición con título, descripción, categoría (servicio o extra), modo de precio (según vehículo o único) con `MoneyInput` y orden.
- Baja de una entrada del catálogo con confirmación.
- Acceso desde `/ajustes`.
- Se modifican `domain-model` (tipos de vehículo y `TipoServicio`) y `product-scope` (glosario), igual que en el backend.

Fuera de alcance: reordenar arrastrando, promociones y combos.

## Capabilities

### New Capabilities
- `catalogo-servicios`: pantallas del admin para mantener los servicios, los extras y sus precios.

### Modified Capabilities
- `domain-model`: nuevos tipos de vehículo y nueva forma de `TipoServicio`.
- `product-scope`: glosario con los tipos de vehículo y los extras.

## Impact

- Código nuevo: `src/features/tipos-servicio/` y página `TiposServicioPage`; `TIPOS_VEHICULO` en `src/shared/lib/`.
- `src/features/tipos-servicio/` exporta `useTiposServicio` y `calcularPrecioLista` para el registro de servicios.
- Depende de `add-app-shell`, `add-auth-ui` y del cambio `add-catalogo-servicios` del backend.
