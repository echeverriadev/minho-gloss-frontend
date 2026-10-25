# Spec Delta

## Purpose
URL de la API por defecto según el host desde el que se abre la app.

## MODIFIED Requirements

### Requirement: Configuración por variables de entorno
La URL de la API SHALL configurarse con `VITE_API_URL`, documentada en `.env.example`. Si no está definida, la app SHALL usar el mismo host desde el que se abrió en el puerto 3000 (`http://<host>:3000/api`), para que funcione igual con `localhost`, `127.0.0.1` o la IP de la red local desde un celular. El archivo `.env` SHALL ser opcional y nunca versionarse.

#### Scenario: Apuntar a otra API
- **WHEN** se define `VITE_API_URL` en `.env` y se reinicia `web`
- **THEN** la app usa esa URL para todas las llamadas

#### Scenario: Abrir la app desde 127.0.0.1
- **WHEN** sin `VITE_API_URL` se abre http://127.0.0.1:5173 y se inicia sesión
- **THEN** la app llama a http://127.0.0.1:3000/api y entra al inicio
