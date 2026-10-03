import { useState, FormEvent } from 'react';
import { isSupabaseConfigured, supabase, supabaseConfigError } from '@/lib/supabase';

type Mode = 'login' | 'signup';

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const readableError = (value: string) => {
    const message = value.toLowerCase();
    if (message.includes('invalid login credentials')) return 'Неверный email или пароль.';
    if (message.includes('email not confirmed')) return 'Сначала подтвердите email по ссылке из письма.';
    if (message.includes('user already registered')) return 'Аккаунт с таким email уже существует.';
    if (message.includes('password should be')) return 'Пароль должен содержать не менее 6 символов.';
    if (message.includes('rate limit')) return 'Слишком много попыток. Подождите немного и попробуйте снова.';
    return value;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!isSupabaseConfigured) {
      setError(supabaseConfigError ?? 'Сервис аккаунтов не настроен.');
      return;
    }

    setLoading(true);
    if (mode === 'signup') {
      const { data, error: signUpErr } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: fullName.trim() },
          emailRedirectTo: window.location.origin,
        },
      });
      if (signUpErr) {
        setError(readableError(signUpErr.message));
        setLoading(false);
        return;
      }
      if (!data.session) {
        setMessage('Аккаунт создан. Подтвердите email по ссылке из письма, затем войдите.');
      }
    } else {
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInErr) {
        setError(readableError(signInErr.message));
        setLoading(false);
        return;
      }
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

          {!isSupabaseConfigured && (
            <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-800">
              {supabaseConfigError}
            </p>
          )}

          <form onSubmit={submit} className="flex flex-col gap-3">
            {mode === 'signup' && (
              <input required value={fullName} onChange={(e) => setFullName(e.target.value)}
                placeholder="Имя"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-[13px] text-slate-800 outline-none placeholder-slate-400 transition focus:border-[#E00000] focus:bg-white focus:ring-2 focus:ring-[#E00000]/15" />
            )}
            <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-[13px] text-slate-800 outline-none placeholder-slate-400 transition focus:border-[#E00000] focus:bg-white focus:ring-2 focus:ring-[#E00000]/15" />
            <input type="password" required minLength={6} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-[13px] text-slate-800 outline-none placeholder-slate-400 transition focus:border-[#E00000] focus:bg-white focus:ring-2 focus:ring-[#E00000]/15" />
            {message && <p className="rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2 text-xs text-emerald-700">{message}</p>}
            {error && <p className="rounded-lg bg-red-50 border border-red-100 px-3 py-2 text-xs text-red-600">{error}</p>}
            <button type="submit" disabled={loading || !isSupabaseConfigured}
              className="blue-button w-full py-2.5 text-[13px] mt-1 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Создать аккаунт'}
            </button>
          </form>

          <p className="mt-4 text-center text-[11px] text-slate-400">
            {mode === 'login' ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
            <button type="button" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setMessage(''); }}
              className="text-[#E00000] font-semibold hover:underline">
              {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
