import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

type Mode = 'login' | 'signup';

export default function AuthPage() {
  const { refreshProfile } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (mode === 'signup') {
      const { data, error: signUpErr } = await supabase.auth.signUp({ email, password });
      if (signUpErr) { setError(signUpErr.message); setLoading(false); return; }
      if (data.user) {
        await supabase.from('student_profiles').insert({ id: data.user.id, full_name: fullName.trim() });
        await refreshProfile();
      }
    } else {
      const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
      if (signInErr) { setError(signInErr.message); setLoading(false); return; }
      await refreshProfile();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f0f3f8] flex items-center justify-center p-4">
      <div className="w-full max-w-[360px]">
        {/* Brand */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#E00000] flex items-center justify-center mb-3 shadow-[0_8px_22px_rgba(224,0,0,0.22)]">
            <svg width="26" height="26" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C7.24 2 5 4.24 5 7c0 1.9 1.07 3.56 2.63 4.42L10 18l2.37-6.58C13.93 10.56 15 8.9 15 7c0-2.76-2.24-5-5-5z" fill="white" fillOpacity=".95" />
            </svg>
          </div>
          <h1 className="text-lg font-bold tracking-tight text-[#17202f]" style={{ fontFamily: 'Manrope, sans-serif' }}>Фитнес-трансформация</h1>
          <p className="mt-0.5 text-slate-400 text-xs uppercase tracking-widest font-medium">ANASTASIA MINDAL</p>
        </div>

        <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(15,23,42,0.06)] p-6">
          <h2 className="text-[15px] font-bold text-[#17202f] mb-0.5">{mode === 'login' ? 'Вход' : 'Регистрация'}</h2>
          <p className="text-[11px] text-slate-400 mb-5">{mode === 'login' ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт'}</p>

          <form onSubmit={submit} className="flex flex-col gap-3">
            {mode === 'signup' && (
              <input required value={fullName} onChange={(e) => setFullName(e.target.value)}
                placeholder="Имя"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-[13px] text-slate-800 outline-none placeholder-slate-400 transition focus:border-[#E00000] focus:bg-white focus:ring-2 focus:ring-[#E00000]/15" />
            )}
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-[13px] text-slate-800 outline-none placeholder-slate-400 transition focus:border-[#E00000] focus:bg-white focus:ring-2 focus:ring-[#E00000]/15" />
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-[13px] text-slate-800 outline-none placeholder-slate-400 transition focus:border-[#E00000] focus:bg-white focus:ring-2 focus:ring-[#E00000]/15" />
            {error && <p className="rounded-lg bg-red-50 border border-red-100 px-3 py-2 text-xs text-red-600">{error}</p>}
            <button type="submit" disabled={loading}
              className="blue-button w-full py-2.5 text-[13px] mt-1 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Создать аккаунт'}
            </button>
          </form>

          <p className="mt-4 text-center text-[11px] text-slate-400">
            {mode === 'login' ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
            <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
              className="text-[#E00000] font-semibold hover:underline">
              {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
