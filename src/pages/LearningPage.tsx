import { programModules, ModuleIcon } from '@/data/program';
import { useProgress } from '@/context/ProgressContext';
import { ArrowRight, Check, Lock } from 'lucide-react';

type Props = { onNavigate: (page: string, params?: Record<string, string>) => void };

/* Inline SVG icons for each module theme */
function ModuleIconSvg({ icon, className }: { icon: ModuleIcon; className?: string }) {
  const cls = className ?? 'w-5 h-5';
  switch (icon) {
    case 'flag': return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    );
    case 'run': return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13" cy="4" r="1" /><path d="m7 21 5-5-1-3 4-4 3 3" /><path d="m14 7-3 3-3 4 3 2" /><path d="m17 7 3 2-3 3" />
      </svg>
    );
    case 'plate': return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    );
    case 'bolt': return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    );
    case 'drop': return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    );
    case 'figure': return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="3.5" r="1.5" /><path d="M9.5 7.5c.8.8 1.6 1.2 2.5 1.2s1.7-.4 2.5-1.2" /><path d="M10 9c-1.2 1-1.8 2.2-1.4 3.5.3 1.1 1.2 1.7 2.1 2.1" /><path d="M14 9c1.2 1 1.8 2.2 1.4 3.5-.3 1.1-1.2 1.7-2.1 2.1" /><path d="M10.7 14.5 9 21" /><path d="M13.3 14.5 15 21" /><path d="M8.6 12.5h6.8" />
      </svg>
    );
    case 'summit': return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 20 7-9 3 4 2-3 6 8H3Z" /><path d="m10 11 2-3 2 3" /><path d="M12 8V3" /><path d="M12 3h6l-3 3h-3" />
      </svg>
    );
  }
}

const moduleColors: Record<string, { bar: string; icon: string; badge: string; action: string }> = {
  sky: { bar: 'bg-[#E00000]', icon: 'bg-[#E00000]', badge: 'bg-red-50 text-[#B80000]', action: 'text-[#E00000]' },
  mint: { bar: 'bg-[#13A77E]', icon: 'bg-[#13A77E]', badge: 'bg-emerald-50 text-[#087A5B]', action: 'text-[#087A5B]' },
  peach: { bar: 'bg-[#F27A1A]', icon: 'bg-[#F27A1A]', badge: 'bg-orange-50 text-[#C45A08]', action: 'text-[#C45A08]' },
  rose: { bar: 'bg-[#E83E70]', icon: 'bg-[#E83E70]', badge: 'bg-rose-50 text-[#C52856]', action: 'text-[#C52856]' },
  aqua: { bar: 'bg-[#2FAFA4]', icon: 'bg-[#2FAFA4]', badge: 'bg-teal-50 text-[#168078]', action: 'text-[#168078]' },
  blue: { bar: 'bg-[#3974D9]', icon: 'bg-[#3974D9]', badge: 'bg-blue-50 text-[#285BB0]', action: 'text-[#285BB0]' },
  forest: { bar: 'bg-[#1A7A4A]', icon: 'bg-[#1A7A4A]', badge: 'bg-emerald-50 text-[#145C36]', action: 'text-[#145C36]' },
};

export default function LearningPage({ onNavigate }: Props) {
  const { completedIds } = useProgress();

  return (
    <div className="max-w-[760px] mx-auto">
      <div className="mb-7">
        <h2 className="text-[22px] font-bold tracking-[-0.02em] text-[#17202f]" style={{ fontFamily: 'Manrope, sans-serif' }}>Твой путь обучения</h2>
        <p className="text-[13px] leading-5 text-slate-500 mt-1">Последовательно проходи модули и осваивай навыки работы с питанием, тренировками и созданием тела твоей мечты</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {programModules.map((mod) => {
          const lessonsDone = mod.lessons.filter((lesson) => completedIds.has(lesson.id)).length;
          const isComplete = mod.lessons.length > 0 && lessonsDone === mod.lessons.length;
          const colors = moduleColors[mod.tone];
          return (
            <div key={mod.id}
              className="group cursor-pointer text-left bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(15,23,42,0.025)] transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)]"
              onClick={() => onNavigate('module', { moduleId: mod.id })}>
              <div className={`h-1.5 ${colors.bar}`} />
              <div className="p-4">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`w-9 h-9 rounded-lg ${colors.icon} flex items-center justify-center text-white shrink-0`}>
                    {isComplete
                      ? <Check size={17} />
                      : <ModuleIconSvg icon={mod.icon} className="w-[17px] h-[17px]" />}
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold shrink-0 ${colors.badge}`}>Модуль {mod.number}</span>
                </div>
                <p className="text-[13px] font-bold text-[#17202f] leading-snug mb-1.5">{mod.title}</p>
                <p className="text-[11px] leading-[1.5] text-slate-500">{mod.description}</p>
                <div className="flex items-center justify-between mt-4 text-[11px] text-slate-400">
                  <span>{mod.lessons.length} уроков</span>
                  <span className={`flex items-center gap-1 font-semibold opacity-70 group-hover:opacity-100 transition ${colors.action}`}>Открыть <ArrowRight size={12} /></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
