import { BookOpen, Video, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

type Props = {
  activePage: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

const NAV = [
  { id: 'learning', label: 'Модули', icon: BookOpen },
  { id: 'materials', label: 'Записи эфиров', icon: Video },
];

export default function Sidebar({ activePage, onNavigate }: Props) {
  const { user, profile, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const email = user?.email ?? '';
  const name = profile?.full_name ?? email.split('@')[0] ?? 'Студент';

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 pt-5 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E00000] flex items-center justify-center shrink-0 shadow-sm">
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C7.24 2 5 4.24 5 7c0 1.9 1.07 3.56 2.63 4.42L10 18l2.37-6.58C13.93 10.56 15 8.9 15 7c0-2.76-2.24-5-5-5z" fill="white" fillOpacity=".9" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-extrabold text-[#17202f] leading-tight">Фитнес-трансформация</p>
            <p className="text-[9px] text-slate-400 truncate">ANASTASIA MINDAL</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="px-3 flex-1">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">ОБУЧЕНИЕ</p>
        {NAV.map(({ id, label, icon: Icon }) => {
          const active = activePage === id || (['module', 'lesson'].includes(activePage) && id === 'learning');
          return (
            <button key={id} onClick={() => { onNavigate(id); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg text-[12px] font-medium mb-0.5 transition
              ${active ? 'bg-[#fff0f0] text-[#E00000]' : 'text-slate-600 hover:bg-slate-50 hover:text-[#17202f]'}`}>
              <Icon size={14} strokeWidth={2} />
              {label}
            </button>
          );
        })}
      </div>

      {/* User */}
      <div className="border-t border-slate-100 px-4 py-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0 text-[10px] font-bold text-slate-500">
            {name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-[#17202f] truncate">{email}</p>
            <p className="text-[10px] text-slate-400">Студент</p>
          </div>
        </div>
        <button onClick={signOut} className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-red-500 transition">
          <LogOut size={13} /> Выйти
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#E00000] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2C7.24 2 5 4.24 5 7c0 1.9 1.07 3.56 2.63 4.42L10 18l2.37-6.58C13.93 10.56 15 8.9 15 7c0-2.76-2.24-5-5-5z" fill="white" fillOpacity=".9" /></svg>
          </div>
          <span className="text-[12px] font-bold text-[#17202f]">Фитнес-трансформация</span>
        </div>
        <button onClick={() => setOpen(!open)} className="p-1.5 rounded-lg hover:bg-slate-100 transition">
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-30" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-slate-900/10" />
          <div className="absolute top-14 left-0 bottom-0 w-60 bg-white shadow-xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <NavContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[185px] shrink-0 h-screen sticky top-0 bg-white border-r border-slate-200 overflow-y-auto">
        <NavContent />
      </aside>
    </>
  );
}
