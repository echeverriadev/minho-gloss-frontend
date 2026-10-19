# Spec Delta

## Purpose
Panel de métricas del autolavado para el administrador: indicadores, evolución diaria, desgloses y clientes inactivos, legibles desde el celular.

## ADDED Requirements

### Requirement: Selector de periodo
La pantalla `/metricas`, solo para `admin`, SHALL ofrecer los periodos Hoy (por defecto), Ayer, Esta semana (lunes a hoy), Este mes, Mes anterior y Personalizado (desde y hasta). El periodo elegido SHALL quedar en la URL y calcularse con las fechas de la zona horaria del negocio.

#### Scenario: Ver la semana
- **WHEN** el admin elige "Esta semana" un jueves
- **THEN** las métricas van del lunes al jueves y la URL refleja el periodo

### Requirement: Indicadores principales
El panel SHALL mostrar tarjetas con ingresos, cantidad de servicios, ticket promedio y clientes atendidos (con nuevos y recurrentes), formateados en `es-CO`. Ingresos y cantidad SHALL mostrar la variación porcentual frente al periodo anterior con flecha y color (verde si sube, rojo si baja), o "Sin datos previos" si la variación es nula.

#### Scenario: Día mejor que el anterior
- **WHEN** hoy se facturó un 20 % más que ayer
- **THEN** la tarjeta de ingresos muestra "▲ 20 %" en verde

### Requirement: Evolución diaria
Para periodos de más de un día, el panel SHALL mostrar un gráfico de barras de ingresos por día (con opción de ver cantidad), con todos los días del periodo, incluidos los días sin servicios, y una tabla equivalente para lectores de pantalla.

#### Scenario: Mes con días sin servicios
- **WHEN** el admin ve el mes y el negocio cerró dos domingos
- **THEN** esos domingos aparecen con barra vacía

### Requirement: Desgloses
El panel SHALL mostrar el desglose por tipo de servicio (cantidad, ingresos y porcentaje del total, ordenado por ingresos), por método de pago y por tipo de vehículo, y el total de descuentos del periodo.

#### Scenario: Servicio más vendido
- **WHEN** "Lavado sencillo" es el que más factura en el periodo
- **THEN** aparece primero en el desglose con su porcentaje

### Requirement: Clientes inactivos
El panel SHALL mostrar los clientes que no vuelven hace más de 30 días (con opción de 60 y 90), con nombre, días sin venir y si aceptan contacto, enlazando a su ficha. Un acceso "Ir a post-venta" SHALL llevar a `/post-venta`.

#### Scenario: Cliente sin autorización de contacto
- **WHEN** un cliente inactivo no aceptó contacto
- **THEN** aparece con la etiqueta "Sin autorización de contacto"

### Requirement: Periodo sin datos
Si el periodo no tiene servicios, el panel SHALL mostrar los indicadores en cero y el mensaje "No hay servicios registrados en este periodo", sin gráficos vacíos.

#### Scenario: Domingo cerrado
- **WHEN** el admin consulta un día sin servicios
- **THEN** ve los indicadores en $ 0 y el mensaje de periodo sin datos
