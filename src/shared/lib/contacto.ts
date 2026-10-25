/** Enlaces de contacto rápido (los reutiliza post-venta). Teléfonos en E.164: `+351912345678`. */
export function enlaceLlamada(telefono: string): string {
  return `tel:${telefono}`;
}

export function enlaceWhatsapp(telefono: string, mensaje?: string): string {
  const numero = telefono.replace(/\D/g, '');
  return mensaje
    ? `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
    : `https://wa.me/${numero}`;
}

export function enlaceCorreo(email: string, asunto?: string): string {
  return asunto ? `mailto:${email}?subject=${encodeURIComponent(asunto)}` : `mailto:${email}`;
}
