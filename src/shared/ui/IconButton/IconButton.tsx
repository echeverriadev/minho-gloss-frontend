import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import {
  buttonBaseClasses,
  buttonVariantClasses,
  type ButtonVariant,
} from '../Button/buttonClasses';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Texto para lectores de pantalla: el botón solo muestra un ícono. */
  'aria-label': string;
  icon: ReactNode;
  variant?: ButtonVariant;
}

export function IconButton({
  icon,
  variant = 'ghost',
  type = 'button',
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      // oxlint-disable-next-line react/button-has-type -- el tipo llega por props y por defecto es 'button'
      type={type}
      className={cn(
        buttonBaseClasses,
        buttonVariantClasses[variant],
        'size-11 shrink-0',
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
