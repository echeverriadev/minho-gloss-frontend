import { X } from 'lucide-react';
import { type ReactNode, useEffect, useId, useRef } from 'react';
import { useTextos } from '@/shared/i18n/textos';

export interface DialogProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

/** Ventana modal con `<dialog>` nativo, que ya maneja el foco y la tecla Escape. */
export function Dialog({ isOpen, title, onClose, children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const t = useTextos();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="bg-surface m-auto w-[calc(100%-2rem)] max-w-md rounded-xl p-0 shadow-xl"
    >
      <div className="flex items-center justify-between border-b border-slate-200 py-2 pr-2 pl-5">
        <h2 id={titleId} className="text-lg font-semibold text-slate-900">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.comun.cerrar}
          className="flex size-11 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>
      {/* Solo se monta el contenido abierto, para que los formularios empiecen limpios */}
      <div className="p-5">{isOpen && children}</div>
    </dialog>
  );
}
