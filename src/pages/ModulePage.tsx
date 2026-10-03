import { programModules } from '@/data/program';
import { useProgress } from '@/context/ProgressContext';
import { ChevronLeft, ChevronRight, Clock, BookOpen, Check } from 'lucide-react';

type Props = { moduleId: string; onNavigate: (page: string, params?: Record<string, string>) => void };

const moduleColors: Record<string, { header: string; number: string; hover: string }> = {
  sky: { header: 'bg-[#E00000]', number: 'bg-[#E00000]', hover: 'group-hover:text-[#E00000]' },
  mint: { header: 'bg-[#13A77E]', number: 'bg-[#13A77E]', hover: 'group-hover:text-[#087A5B]' },
  peach: { header: 'bg-[#F27A1A]', number: 'bg-[#F27A1A]', hover: 'group-hover:text-[#C45A08]' },
  rose: { header: 'bg-[#E83E70]', number: 'bg-[#E83E70]', hover: 'group-hover:text-[#C52856]' },
  aqua: { header: 'bg-[#2FAFA4]', number: 'bg-[#2FAFA4]', hover: 'group-hover:text-[#168078]' },
  blue: { header: 'bg-[#3974D9]', number: 'bg-[#3974D9]', hover: 'group-hover:text-[#285BB0]' },
  forest: { header: 'bg-[#1A7A4A]', number: 'bg-[#1A7A4A]', hover: 'group-hover:text-[#145C36]' },
};

export default function ModulePage({ moduleId, onNavigate }: Props) {
  const mod = programModules.find((item) => item.id === moduleId);
  const { completedIds } = useProgress();

  if (!mod) return <div className="p-8 text-center text-slate-400">Модуль не найден.</div>;

  const done = mod.lessons.filter((lesson) => completedIds.has(lesson.id)).length;
  const totalMinutes = mod.lessons.reduce((sum, lesson) => sum + parseInt(lesson.duration), 0);
  const colors = moduleColors[mod.tone];

  return (
    <div className="mx-auto w-full max-w-[900px]">
      <button onClick={() => onNavigate('learning')} className="flex items-center gap-1.5 text-[12px] text-slate-500 hover:text-[#E00000] mb-5 transition">
        <ChevronLeft size={14} /> Все модули
      </button>

      <div className={`${colors.header} mb-5 rounded-xl p-5 text-white shadow-[0_8px_20px_rgba(15,23,42,0.12)] sm:p-7`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Модуль {mod.number}</span>
            <h2 className="font-display mt-1 text-[20px] font-bold leading-tight sm:text-[24px]">{mod.title}</h2>
            <p className="mt-2 max-w-2xl text-[13px] leading-5 text-white/80 sm:text-sm sm:leading-6">{mod.description}</p>
          </div>
          <span className="w-fit shrink-0 whitespace-nowrap rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold">
            {mod.lessons.length ? `${done}/${mod.lessons.length}` : 'Скоро'}
          </span>
        </div>
        {mod.lessons.length > 0 && (
          <div className="flex items-center gap-4 mt-5 text-[11px] text-white/75">
            <span className="flex items-center gap-1"><BookOpen size={13} /> {mod.lessons.length} уроков</span>
            <span className="flex items-center gap-1"><Clock size={13} /> {totalMinutes} мин</span>
          </div>
        )}
      </div>

      {mod.lessons.length === 0 ? (
        <div className="soft-card flex min-h-[260px] flex-col items-center justify-center px-6 py-12 text-center sm:min-h-[320px]">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
            <BookOpen size={25} strokeWidth={1.8} />
          </div>
          <h3 className="font-display text-base font-bold text-[#17202f]">Уроки скоро появятся</h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Материалы этого модуля готовятся к публикации.
          </p>
        </div>
      ) : <div className="space-y-2">
        {mod.lessons.map((lesson, index) => {
          const completed = completedIds.has(lesson.id);
          return (
            <button key={lesson.id} onClick={() => onNavigate('lesson', { moduleId: mod.id, lessonId: lesson.id })}
              className="group w-full flex items-center gap-3 bg-white border border-slate-200/80 rounded-xl px-3.5 py-3 text-left hover:border-[#f0aaaa] hover:shadow-[0_4px_14px_rgba(224,0,0,0.05)] transition">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-bold shrink-0 ${completed ? 'bg-emerald-50 text-emerald-600' : `${colors.number} text-white`}`}>
                {completed ? <Check size={15} /> : index + 1}
              </div>
              <div className="min-w-0 flex-1">
                <p className={`text-[12px] font-semibold truncate ${completed ? 'text-slate-400 line-through' : `text-[#17202f] ${colors.hover}`}`}>{lesson.title}</p>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{lesson.description}</p>
              </div>
              <span className="text-[11px] text-slate-400 shrink-0 flex items-center gap-1"><Clock size={12} /> {lesson.duration}</span>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-[#E00000] shrink-0" />
            </button>
          );
        })}
      </div>}
    </div>
  );
}
