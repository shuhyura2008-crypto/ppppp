import { Play, CalendarDays, Clock } from 'lucide-react';

type Recording = { title: string; description: string; date: string; duration: string };

const recordings: Recording[] = [
  { title: 'Вводный эфир: знакомство и разбор точек роста', description: 'Познакомились, разобрали как будет проходить обучение и определили точки роста каждой участницы', date: '18 апреля 2026', duration: '1 ч 10 мин' },
  { title: 'Общий созвон: ответы на вопросы и инсайты', description: 'Поделились важными инсайтами и ответили на все ключевые вопросы', date: '29 апреля 2026', duration: '1 ч' },
  { title: 'Общий созвон: ответы на вопросы и инсайты', description: 'Разобрали результаты первых двух недель и обсудили практику', date: '3 мая 2026', duration: '51 мин' },
  { title: 'Общий созвон: ответы на вопросы и инсайты', description: 'Ответили на вопросы по питанию и тренировкам', date: '10 мая 2026', duration: '52 мин' },
  { title: 'Общий созвон: ответы на вопросы и инсайты', description: 'Разобрали плато и способы скорректировать план', date: '17 мая 2026', duration: '57 мин' },
  { title: 'Общий созвон: ответы на вопросы и инсайты', description: 'Финальный разбор и подведение итогов программы', date: '23 июня 2026', duration: '57 мин' },
];

export default function MaterialsPage() {
  return (
    <div className="max-w-[760px] mx-auto">
      <div className="mb-6">
        <h2 className="text-[22px] font-bold tracking-[-0.02em] text-[#17202f]" style={{ fontFamily: 'Manrope, sans-serif' }}>Записи эфиров</h2>
        <p className="text-[13px] text-slate-500 mt-1">Доступные записи онлайн-встреч и разборов</p>
      </div>
      <div className="space-y-2.5">
        {recordings.map((rec, i) => (
          <div key={i}
            className="group flex items-center gap-3.5 bg-white border border-slate-200/80 rounded-xl p-3.5 hover:border-[#f0aaaa] hover:shadow-[0_4px_14px_rgba(224,0,0,0.05)] transition cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shrink-0">
              <Play size={14} className="text-white fill-white ml-0.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-[#17202f] truncate">{rec.title}</p>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">{rec.description}</p>
              <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1">
                <span className="flex items-center gap-1"><CalendarDays size={11} />{rec.date}</span>
                <span className="flex items-center gap-1"><Clock size={11} />{rec.duration}</span>
              </div>
            </div>
            <button className="quiet-button text-[11px] px-3 py-1.5 shrink-0">
              Смотреть
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
