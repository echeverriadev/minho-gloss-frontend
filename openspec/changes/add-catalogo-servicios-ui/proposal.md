# Proposal

## Why

El dueño necesita cargar y actualizar sus servicios y precios sin pedirle a nadie que toque la base de datos, porque los precios cambian y a veces dependen del tipo de vehículo.

## What Changes

- Pantalla `/ajustes/tipos-servicio`, solo para admin, con la lista de tipos de servicio y sus precios.
- Formulario de alta y edición con precio base, precios opcionales por tipo de vehículo, duración estimada y orden.
- Baja de un tipo de servicio con confirmación.
- Pantalla `/ajustes` como índice de los ajustes del negocio (tipos de servicio, usuarios, post-venta).

Fuera de alcance: reordenar arrastrando, promociones y combos.

## Capabilities

### New Capabilities
- `catalogo-servicios`: pantallas del admin para mantener los tipos de servicio y sus precios.

### Modified Capabilities

## Impact

- Código nuevo: `src/features/tipos-servicio/` y páginas `AjustesPage` y `TiposServicioPage`.
- `src/features/tipos-servicio/` exporta `useTiposServicio` y `calcularPrecioLista` para el registro de servicios.
- Depende de `add-app-shell`, `add-auth-ui` y del cambio `add-catalogo-servicios` del backend.
