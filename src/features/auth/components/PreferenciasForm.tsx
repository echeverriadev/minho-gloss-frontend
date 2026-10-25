import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { getTextos, useTextos } from '@/shared/i18n/textos';
import { mensajeDeError } from '@/shared/lib/apiClient';
import { cn } from '@/shared/lib/cn';
import {
  IDIOMAS,
  type Preferencias,
  TEMAS,
  usePreferenciasStore,
} from '@/shared/preferencias/store';
import { Select } from '@/shared/ui/Select/Select';
import { toast } from '@/shared/ui/Toast/store';
import { authApi } from '../api';
import { useSessionStore } from '../store';

const ICONO_TEMA = { claro: Sun, oscuro: Moon } as const;

/** Idioma y tema del usuario: se aplican al momento y se guardan en su cuenta (spec preferencias). */
export function PreferenciasForm() {
  const t = useTextos();
  const idioma = usePreferenciasStore((state) => state.idioma);
  const tema = usePreferenciasStore((state) => state.tema);
  const actualizarPreferencias = useSessionStore((state) => state.actualizarPreferencias);
  const [isGuardando, setIsGuardando] = useState(false);

  const guardar = async (cambios: Partial<Preferencias>) => {
    const anteriores = { idioma, tema };
    // Se aplican antes de la respuesta para que el cambio se vea al instante.
    usePreferenciasStore.getState().aplicar(cambios);
    setIsGuardando(true);
    try {
      actualizarPreferencias(await authApi.actualizarPreferencias(cambios));
      // getTextos (y no `t`) para que el aviso salga en el idioma recién elegido.
      toast.success(getTextos().perfil.preferenciasGuardadas);
    } catch (error) {
      usePreferenciasStore.getState().aplicar(anteriores);
      toast.error(mensajeDeError(error));
    } finally {
      setIsGuardando(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Select
        label={t.perfil.idioma}
        value={idioma}
        disabled={isGuardando}
        options={IDIOMAS.map((valor) => ({ value: valor, label: t.idiomas[valor] }))}
        onChange={(event) =>
          void guardar({ idioma: IDIOMAS.find((valor) => valor === event.target.value) ?? 'es' })
        }
      />
      <fieldset className="flex flex-col gap-1">
        <legend className="mb-1 text-sm font-medium text-slate-800">{t.perfil.tema}</legend>
        <div className="grid grid-cols-2 gap-2">
          {TEMAS.map((valor) => {
            const Icono = ICONO_TEMA[valor];
            return (
              <label
                key={valor}
                className={cn(
                  'has-focus-visible:outline-brand-600 flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium ring-1 has-focus-visible:outline-2',
                  tema === valor
                    ? 'bg-brand-50 text-brand-700 ring-brand-600'
                    : 'bg-surface text-slate-700 ring-slate-300',
                )}
              >
                <input
                  type="radio"
                  name="tema"
                  value={valor}
                  checked={tema === valor}
                  disabled={isGuardando}
                  onChange={() => void guardar({ tema: valor })}
                  className="sr-only"
                />
                <Icono className="size-4" aria-hidden />
                {valor === 'claro' ? t.perfil.temaClaro : t.perfil.temaOscuro}
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
