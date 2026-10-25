# Spec Delta

## Purpose
Textos de la interfaz en dos idiomas.

## MODIFIED Requirements

### Requirement: Textos de la interfaz
Los textos visibles SHALL escribirse en los diccionarios de `src/shared/i18n/textos/` (`es.ts` y `pt.ts`, con el mismo tipo `Textos` para que no falte ninguna traducción) y usarse con `useTextos()`; los componentes SHALL NOT tener textos visibles escritos en el código. Los textos SHALL tener tono cercano y de tú, en sentence case ("Registrar servicio", no "Registrar Servicio"). Los montos SHALL mostrarse en euros a partir de céntimos y las fechas en la zona `Europe/Lisbon`, con el formato regional del idioma del usuario (`es-ES` o `pt-PT`), mediante utilidades únicas en `src/shared/lib/format.ts`. Los nombres propios del negocio (títulos de servicios, tipos de vehículo) no se traducen.

#### Scenario: Mostrar un precio
- **WHEN** se muestra un precio de 2000 céntimos
- **THEN** la interfaz muestra "20,00 €"

#### Scenario: Texto nuevo en una pantalla
- **WHEN** se agrega un botón con el texto "Registrar servicio"
- **THEN** el texto se agrega en `es.ts` y en `pt.ts`, y el build falla si falta en alguno
