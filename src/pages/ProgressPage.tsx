import { programModules, allLessons } from '@/data/program';
import { useProgress } from '@/context/ProgressContext';
import { useAuth } from '@/context/AuthContext';
import { TrendingUp, Award, CheckCircle, BookOpen } from 'lucide-react';

const toneGradient: Record<string, string> = {
  sky: 'from-[#E00000] to-[#ff4a4a]',
  mint: 'from-[#11998e] to-[#38ef7d]',
  peach: 'from-[#f7971e] to-[#ffd200]',
  rose: 'from-[#f43f5e] to-[#fb7185]',
  sand: 'from-[#d97706] to-[#fbbf24]',
  blue: 'from-[#1d4ed8] to-[#3b82f6]',
  coral: 'from-[#ea580c] to-[#f97316]',
  teal: 'from-[#0d9488] to-[#2dd4bf]',
};

export default function ProgressPage() {
  const { completedIds } = useProgress();
  const { profile } = useAuth();

  const total = allLessons.length;
  const done = completedIds.size;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const completedModules = programModules.filter((m) => m.lessons.every((l) => completedIds.has(l.id)));

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-[#17202f]" style={{ fontFamily: 'Manrope, sans-serif' }}>Мой прогресс</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: <TrendingUp size={22} className="text-[#E00000]" />, value: `${pct}%`, label: 'Общий прогресс', bg: 'bg-red-50' },
          { icon: <CheckCircle size={22} className="text-emerald-500" />, value: done, label: 'Уроков пройдено', bg: 'bg-emerald-50' },
          { icon: <BookOpen size={22} className="text-orange-400" />, value: total - done, label: 'Осталось уроков', bg: 'bg-orange-50' },
          { icon: <Award size={22} className="text-amber-500" />, value: completedModules.length, label: 'Модулей завершено', bg: 'bg-amber-50' },
        ].map((s, i) => (
          <div key={i} className="soft-card p-5 flex flex-col items-center text-center gap-2">
            <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center`}>{s.icon}</div>
            <p className="text-2xl font-bold text-[#17202f]">{s.value}</p>
            <p className="text-xs text-slate-400 leading-tight">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Overall progress bar */}
      <div className="soft-card p-6">
        <div className="flex justify-between items-center mb-3">
          <p className="font-semibold text-[#17202f]">Прогресс программы</p>
          <span className="text-sm font-bold text-[#E00000]">{pct}%</span>
        </div>
        <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
          <div style={{ width: `${pct}%` }}
            className="h-full rounded-full bg-gradient-to-r from-[#E00000] to-[#ff4a4a] transition-all duration-700" />
        </div>
        <p className="mt-2 text-xs text-slate-400">{done} из {total} уроков</p>
      </div>

      {/* Per-module breakdown */}
      <div className="soft-card overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <p className="font-semibold text-[#17202f]">По модулям</p>
        </div>
        {programModules.map((mod) => {
          const modDone = mod.lessons.filter((l) => completedIds.has(l.id)).length;
          const modPct = Math.round((modDone / mod.lessons.length) * 100);
          return (
            <div key={mod.id} className="px-6 py-4 border-b last:border-0 border-slate-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${toneGradient[mod.tone]} flex items-center justify-center`}>
                    <span className="text-white text-[10px] font-bold">{mod.number}</span>
                  </div>
                  <span className="text-sm font-medium text-[#17202f]">{mod.title}</span>
                </div>
                <span className="text-xs font-semibold text-slate-500">{modDone}/{mod.lessons.length}</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div style={{ width: `${modPct}%` }} className={`h-full rounded-full bg-gradient-to-r ${toneGradient[mod.tone]} transition-all duration-500`} />
              </div>
            </div>
          );
        })}
      </div>

      {profile && (
        <p className="text-center text-xs text-slate-400">Прогресс {profile.full_name} — сохраняется автоматически</p>
      )}
    </div>
  );
}
