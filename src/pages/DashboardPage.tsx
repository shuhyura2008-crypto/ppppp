import { useAuth } from '@/context/AuthContext';
import { useProgress } from '@/context/ProgressContext';
import { programModules, allLessons, ModuleIcon } from '@/data/program';
import { PlayCircle, TrendingUp, BookOpen, Zap, ChevronRight } from 'lucide-react';

type Props = { onNavigate: (page: string, params?: Record<string, string>) => void };

function ModuleIconSvg({ icon }: { icon: ModuleIcon }) {
  switch (icon) {
    case 'flag': return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>;
    case 'run': return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13" cy="4" r="1" /><path d="m7 21 5-5-1-3 4-4 3 3" /><path d="m14 7-3 3-3 4 3 2" /><path d="m17 7 3 2-3 3" /></svg>;
    case 'plate': return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z" /></svg>;
    case 'bolt': return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
    case 'drop': return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>;
    case 'figure': return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="3.5" r="1.5" /><path d="M9.5 7.5c.8.8 1.6 1.2 2.5 1.2s1.7-.4 2.5-1.2" /><path d="M10 9c-1.2 1-1.8 2.2-1.4 3.5.3 1.1 1.2 1.7 2.1 2.1" /><path d="M14 9c1.2 1 1.8 2.2 1.4 3.5-.3 1.1-1.2 1.7-2.1 2.1" /><path d="M10.7 14.5 9 21" /><path d="M13.3 14.5 15 21" /><path d="M8.6 12.5h6.8" /></svg>;
    case 'summit': return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 20 7-9 3 4 2-3 6 8H3Z" /><path d="m10 11 2-3 2 3" /><path d="M12 8V3" /><path d="M12 3h6l-3 3h-3" /></svg>;
  }
}

export default function DashboardPage({ onNavigate }: Props) {
  const { profile, user } = useAuth();
  const { completedIds } = useProgress();

  const totalLessons = allLessons.length;
  const completedCount = completedIds.size;
  const pct = totalLessons ? Math.round((completedCount / totalLessons) * 100) : 0;

  const activeModule = programModules.find((m) => m.lessons.some((l) => !completedIds.has(l.id)))
    ?? programModules[programModules.length - 1];

  const name = profile?.full_name ?? user?.email?.split('@')[0] ?? 'Участница';
  const firstName = name.split(' ')[0];
  const nextLesson = activeModule.lessons.find((l) => !completedIds.has(l.id));

  return (
    <div className="space-y-6 max-w-[760px] mx-auto">
      {/* Hero card */}
      <div className="rounded-xl p-6 bg-[#E00000] text-white overflow-hidden relative shadow-[0_8px_24px_rgba(224,0,0,0.15)]">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-white/8 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-white/70 text-[11px] font-medium uppercase tracking-widest mb-1">Фитнес-трансформация</p>
          <h2 className="text-[22px] font-bold mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Привет, {firstName}! 👋
          </h2>
          <p className="text-white/75 text-[13px] mb-6">Продолжай программу — ты делаешь всё правильно</p>

          <div className="grid grid-cols-3 gap-2.5 mb-6">
            {[
              { icon: <BookOpen size={16} />, value: `${completedCount}/${totalLessons}`, label: 'уроков пройдено' },
              { icon: <TrendingUp size={16} />, value: `${pct}%`, label: 'прогресс' },
              { icon: <Zap size={16} />, value: `${activeModule.number}/${programModules.length}`, label: 'модуль' },
            ].map((stat, i) => (
              <div key={i} className="rounded-xl bg-white/15 backdrop-blur-sm px-3 py-3 text-center">
                <div className="flex justify-center text-white/70 mb-1">{stat.icon}</div>
                <p className="text-[17px] font-bold leading-none">{stat.value}</p>
                <p className="text-[10px] text-white/65 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {nextLesson && (
            <button onClick={() => onNavigate('lesson', { moduleId: activeModule.id, lessonId: nextLesson.id })}
              className="w-full flex items-center gap-3 rounded-xl bg-white text-[#B80000] px-4 py-3 font-semibold text-[13px] transition hover:bg-red-50 active:scale-[.98]">
              <PlayCircle size={20} className="shrink-0" />
              <span className="truncate flex-1 text-left">Продолжить: {nextLesson.title}</span>
              <ChevronRight size={16} className="shrink-0" />
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-xl border border-slate-200/80 px-5 py-4 shadow-[0_2px_8px_rgba(15,23,42,0.025)]">
        <div className="flex justify-between items-center mb-2.5">
          <p className="text-[13px] font-semibold text-slate-700">Прогресс программы</p>
          <p className="text-[13px] font-bold text-[#E00000]">{pct}%</p>
        </div>
        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
          <div style={{ width: `${pct}%` }} className="h-full rounded-full bg-[#E00000] transition-all duration-700" />
        </div>
        <p className="mt-1.5 text-[11px] text-slate-400">{completedCount} из {totalLessons} уроков завершены</p>
      </div>

      {/* Modules grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-bold text-[#17202f]">Модули программы</h3>
          <button onClick={() => onNavigate('learning')} className="text-[#E00000] text-[12px] font-semibold hover:underline">Все модули</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {programModules.map((mod) => {
            const done = mod.lessons.filter((l) => completedIds.has(l.id)).length;
            const mpct = mod.lessons.length ? Math.round((done / mod.lessons.length) * 100) : 0;
            const isActive = mod.id === activeModule.id;
            return (
              <button key={mod.id} onClick={() => onNavigate('module', { moduleId: mod.id })}
                className={`bg-white border rounded-xl p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md hover:border-[#f2b3b3] ${isActive ? 'border-[#E00000]/25 ring-1 ring-[#E00000]/20' : 'border-slate-200/80'}`}>
                <div className="w-8 h-8 rounded-lg bg-red-50 text-[#E00000] flex items-center justify-center mb-3">
                  <ModuleIconSvg icon={mod.icon} />
                </div>
                <p className="text-[11px] font-bold text-slate-700 line-clamp-2 leading-snug mb-2">{mod.title}</p>
                {isActive && <span className="text-[9px] font-bold text-[#E00000] bg-red-50 rounded-full px-1.5 py-0.5 mb-2 inline-block">Текущий</span>}
                <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
                  <div style={{ width: `${mpct}%` }} className="h-full rounded-full bg-[#E00000] transition-all duration-500" />
                </div>
                <p className="mt-1.5 text-[10px] text-slate-400">{done}/{mod.lessons.length}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
