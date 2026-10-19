# Tasks

## 1. Feature

- [ ] 1.1 Crear `src/features/post-venta/` con `types.ts` y `api.ts` (recordatorios, enviar correo, contactado, descartar, configuración, generar)
- [ ] 1.2 Crear `RecordatorioCard` con historia de Storybook y la pregunta al volver a la app (evento `visibilitychange`)
- [ ] 1.3 Mostrar el contador de pendientes en la navegación de `AppLayout`

## 2. Pantallas

- [ ] 2.1 Crear `PostVentaPage` en `/post-venta` con pestañas Pendientes e Historial
- [ ] 2.2 Implementar contacto por WhatsApp, llamada y correo con alternativa `mailto:` ante 503
- [ ] 2.3 Crear `AjustesPostVentaPage` en `/ajustes/post-venta` con vista previa de plantillas y "Generar recordatorios ahora"

## 3. Verificación

- [ ] 3.1 Probar desde un celular real que el enlace de WhatsApp abre la conversación con el texto
- [ ] 3.2 Probar a mano: contactado, descartado, correo con y sin proveedor
- [ ] 3.3 Ejecutar `npm run check` y dejarlo en verde
