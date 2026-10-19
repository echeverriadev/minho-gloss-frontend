# Tasks

## 1. Feature

- [ ] 1.1 Crear `src/features/metricas/` con `types.ts` y `api.ts` (resumen, serie diaria, clientes inactivos)
- [ ] 1.2 Crear utilidades de periodos (hoy, ayer, semana, mes, mes anterior) en `America/Bogota` con pruebas de cambio de mes
- [ ] 1.3 Crear `SelectorPeriodo`, `IndicadorCard`, `GraficoBarras` (con tabla accesible) y `DesgloseLista`, con historias de Storybook
- [ ] 1.4 Crear `ClientesInactivosList`

## 2. Pantalla

- [ ] 2.1 Crear `MetricasPage` en `/metricas` con periodo en la URL y llamadas en paralelo
- [ ] 2.2 Manejar periodo sin datos, carga y error

## 3. Verificación

- [ ] 3.1 Comparar los números del panel con los de Swagger para un periodo de prueba
- [ ] 3.2 Verificar el panel en 360 px
- [ ] 3.3 Ejecutar `npm run check` y dejarlo en verde
