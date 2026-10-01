import { programModules } from '@/data/program';
import { useProgress } from '@/context/ProgressContext';
import { ChevronLeft, ChevronRight, Download, CheckCircle, Circle, Clock } from 'lucide-react';

type Props = {
  moduleId: string;
  lessonId: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

export default function LessonPage({ moduleId, lessonId, onNavigate }: Props) {
  const { completedIds, markComplete, unmark } = useProgress();
  const mod = programModules.find((m) => m.id === moduleId);
  const lesson = mod?.lessons.find((l) => l.id === lessonId);

  if (!mod || !lesson) return <div className="p-8 text-center text-slate-400">Урок не найден.</div>;

  const lessonIdx = mod.lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = mod.lessons[lessonIdx - 1];
  const nextLesson = mod.lessons[lessonIdx + 1];
  const completed = completedIds.has(lesson.id);

  return (
    <div className="max-w-[760px] mx-auto">
      <button onClick={() => onNavigate('module', { moduleId: mod.id })}
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#E00000] font-medium mb-6 transition">
        <ChevronLeft size={16} /> Назад к модулю
      </button>

      <div className="flex items-center gap-2 flex-wrap mb-3">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Модуль {mod.number}</span>
        <span className="text-slate-200">·</span>
        <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={11} />{lesson.duration}</span>
      </div>

      <h2 className="text-2xl font-bold text-[#17202f] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>{lesson.title}</h2>

      {/* Lesson text */}
      <div className="soft-card p-5 mb-4">
        <p className="text-sm font-semibold text-slate-700 mb-2">Описание урока</p>
        <p className="text-slate-600 text-sm leading-relaxed">{lesson.text}</p>
      </div>

      {/* Material */}
      <div className="soft-card p-4 mb-7 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
          <Download size={16} className="text-[#E00000]" />
        </div>
        <span className="text-sm text-slate-700 font-medium flex-1">{lesson.material}</span>
        <button className="quiet-button text-xs px-3 py-1.5 text-[#E00000]">Скачать</button>
      </div>

      {/* Complete button */}
      <div className="flex items-center justify-between gap-4 mb-8">
        {!completed ? (
          <button onClick={() => markComplete(lesson.id)}
            className="blue-button px-8 py-3.5 flex-1 sm:flex-none sm:w-auto">
            <CheckCircle size={18} />
            Отметить урок пройденным
          </button>
        ) : (
          <button onClick={() => unmark(lesson.id)}
            className="flex items-center gap-2 rounded-xl border-2 border-emerald-400 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 flex-1 sm:flex-none sm:w-auto">
            <Circle size={18} />
            Урок пройден — отменить
          </button>
        )}
      </div>

      {/* Prev / Next navigation */}
      <div className="flex items-center gap-3">
        <button
          disabled={!prevLesson}
          onClick={() => prevLesson && onNavigate('lesson', { moduleId: mod.id, lessonId: prevLesson.id })}
          className="quiet-button disabled:opacity-30 disabled:cursor-not-allowed flex-1 justify-start">
          <ChevronLeft size={16} />
          {prevLesson ? prevLesson.title : 'Предыдущий урок'}
        </button>
        <button
          disabled={!nextLesson}
          onClick={() => nextLesson && onNavigate('lesson', { moduleId: mod.id, lessonId: nextLesson.id })}
          className="quiet-button disabled:opacity-30 disabled:cursor-not-allowed flex-1 justify-end">
          {nextLesson ? nextLesson.title : 'Следующий урок'}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
