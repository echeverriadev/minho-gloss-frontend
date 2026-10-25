# Proposal

## Why

Al abrir la app como http://127.0.0.1:5173 (o desde el celular con la IP de la computadora), el login respondía bien en la API pero la app no entraba al inicio: la app llamaba a `localhost:3000` y el navegador bloqueaba la respuesta por CORS o no llegaba al servidor.

## What Changes

- Sin `VITE_API_URL`, la URL de la API se arma con el host desde el que se abrió la app y el puerto 3000.
- `.env.example` deja `VITE_API_URL` vacía por defecto en desarrollo.
- El backend acepta en desarrollo los orígenes locales (cambio `fix-cors-desarrollo` del backend).

Fuera de alcance: servir la API y la app desde el mismo origen con un proxy.

## Capabilities

### New Capabilities

### Modified Capabilities
- `dev-environment`: URL de la API por defecto.

## Impact

- `src/shared/config/env.ts` y `.env.example`.
