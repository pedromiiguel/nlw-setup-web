import * as Dialog from '@radix-ui/react-dialog';

import { Plus, X } from 'phosphor-react';

import logoImage from '../assets/logo.svg';
import { NewHabitModal } from './NewHabitForm';

export const Header = () => {
  return (
    <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={logoImage} alt="habits" />

      <Dialog.Root>
        <Dialog.Trigger>
          <button
            type="button"
            className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background"
          >
            <Plus size={22} className="text-violet-500" />
            Novo hábito
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />

          <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dialog.Close className="absolute right-4 top-6 rounded-lg text-zinc-400 hover:text-zinc-200 focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900">
              <X size={24} aria-label="Fechar modal" />
            </Dialog.Close>
            <Dialog.Title className="text-3xl leading-tight font-extrabold">
              Criar hábito
            </Dialog.Title>
            <NewHabitModal />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
};
