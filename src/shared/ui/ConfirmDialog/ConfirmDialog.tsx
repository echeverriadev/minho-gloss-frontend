import { type ReactNode, useEffect, useId, useRef, useState } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description?: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  /** Si se indica, el usuario debe escribir este texto exacto para poder confirmar. */
  confirmText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/** Confirmación de acciones destructivas con `<dialog>` nativo (foco y Escape incluidos). */
export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel = 'Cancelar',
  confirmText,
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [escrito, setEscrito] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (isOpen && !dialog.open) {
      setEscrito('');
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const puedeConfirmar = !confirmText || escrito.trim() === confirmText.trim();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-xl bg-white p-0 shadow-xl"
    >
      <div className="flex flex-col gap-4 p-5">
        <h2 id={titleId} className="text-lg font-semibold text-slate-900">
          {title}
        </h2>
        {description && <div className="text-slate-700">{description}</div>}
        {confirmText && (
          <Input
            label={`Escribe «${confirmText}» para confirmar`}
            value={escrito}
            onChange={(event) => setEscrito(event.target.value)}
            autoComplete="off"
          />
        )}
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            isLoading={isLoading}
            disabled={!puedeConfirmar}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
