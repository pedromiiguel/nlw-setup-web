import { Plus } from 'phosphor-react';
import logoImage from '../assets/logo.svg';

export const Header = () => {
  return (
    <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={logoImage} alt="habits" />

      <button
        type="button"
        className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 hover:border-violet-300"
      >
        <Plus size={22} className="text-violet-500" />
        Novo hábito
      </button>
    </header>
  );
};
