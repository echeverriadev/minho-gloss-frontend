# syntax=docker/dockerfile:1

# ---- base: dependencias ----
FROM node:24-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- dev: servidor de Vite con recarga en caliente ----
FROM base AS dev
COPY . .
EXPOSE 5173 6006
CMD ["npm", "run", "dev"]

# ---- build: compila la app para producción ----
FROM base AS build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
COPY . .
RUN npm run build

# ---- prod: sirve los estáticos con nginx ----
FROM nginx:1.29-alpine AS prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
