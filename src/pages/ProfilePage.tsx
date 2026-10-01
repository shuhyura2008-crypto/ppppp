import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProgress } from '@/context/ProgressContext';
import { supabase } from '@/lib/supabase';
import { User, Mail, Lock, LogOut, CheckCircle } from 'lucide-react';

export default function ProfilePage() {
  const { user, profile, refreshProfile, signOut } = useAuth();
  const { completedIds } = useProgress();

  const [name, setName] = useState(profile?.full_name ?? '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const save = async () => {
    if (!user || !name.trim()) return;
    setSaving(true); setError(''); setSaved(false);
    const { error: err } = await supabase.from('student_profiles').upsert({ id: user.id, full_name: name.trim() });
    if (err) { setError(err.message); } else { await refreshProfile(); setSaved(true); setTimeout(() => setSaved(false), 2500); }
    setSaving(false);
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-[#17202f]" style={{ fontFamily: 'Manrope, sans-serif' }}>Профиль</h2>

      {/* Avatar */}
      <div className="soft-card p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2575e8] to-[#4facfe] flex items-center justify-center shrink-0 shadow-md">
          <User size={28} className="text-white" />
        </div>
        <div>
          <p className="font-semibold text-[#17202f]">{profile?.full_name ?? '—'}</p>
          <p className="text-sm text-slate-400">{user?.email}</p>
          <p className="text-xs text-slate-400 mt-0.5">{completedIds.size} уроков пройдено</p>
        </div>
      </div>

      {/* Edit name */}
      <div className="soft-card p-6 space-y-4">
        <p className="font-semibold text-[#17202f]">Редактировать профиль</p>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
            <User size={14} /> Имя
          </label>
          <input value={name} onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#2575e8] focus:bg-white focus:ring-2 focus:ring-[#2575e8]/20" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
            <Mail size={14} /> Email
          </label>
          <input value={user?.email ?? ''} readOnly
            className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-400 outline-none cursor-not-allowed" />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button onClick={save} disabled={saving}
          className="blue-button w-full py-3 disabled:opacity-60">
          {saved ? <><CheckCircle size={16} /> Сохранено</> : saving ? 'Сохранение...' : 'Сохранить'}
        </button>
      </div>

      {/* Security info */}
      <div className="soft-card p-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
          <Lock size={16} className="text-slate-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-700">Безопасность</p>
          <p className="text-xs text-slate-400">Пароль управляется через email-подтверждение</p>
        </div>
      </div>

      {/* Sign out */}
      <button onClick={signOut}
        className="flex items-center gap-2 w-full rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 hover:border-red-200">
        <LogOut size={16} /> Выйти из аккаунта
      </button>
    </div>
  );
}
