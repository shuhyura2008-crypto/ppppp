import { useMemo, useState } from 'react';
import { CalendarDays, Clock, Play, Video } from 'lucide-react';
import YouTubePlayer from '@/components/YouTubePlayer';
import { liveRecordings } from '@/data/liveRecordings';

export default function MaterialsPage() {
  const [selectedId, setSelectedId] = useState(liveRecordings[0]?.id ?? '');
  const selected = useMemo(
    () => liveRecordings.find((recording) => recording.id === selectedId) ?? liveRecordings[0],
    [selectedId],
  );

  return (
    <div className="mx-auto w-full max-w-[900px]">
      <div className="mb-6 sm:mb-8">
        <h2 className="font-display text-[24px] font-bold tracking-[-0.025em] text-[#17202f] sm:text-[28px]">
          Записи эфиров
        </h2>
        <p className="mt-1.5 max-w-2xl text-[13px] leading-5 text-slate-500 sm:text-sm">
          Онлайн-встречи, ответы на вопросы и дополнительные разборы программы.
        </p>
      </div>

      {selected && (
        <section className="mb-7">
          <YouTubePlayer url={selected.youtubeUrl} title={selected.title} />
          <div className="-mt-2 mb-1">
            <h3 className="font-display text-lg font-bold text-[#17202f] sm:text-xl">{selected.title}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-500">{selected.description}</p>
          </div>
        </section>
      )}

      {liveRecordings.length === 0 ? (
        <div className="soft-card flex min-h-[280px] flex-col items-center justify-center px-6 py-12 text-center sm:min-h-[340px]">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#E00000]">
            <Video size={25} strokeWidth={1.8} />
          </div>
          <h3 className="font-display text-base font-bold text-[#17202f]">Записей пока нет</h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Новые эфиры и разборы появятся здесь после публикации.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {liveRecordings.map((recording) => {
            const active = recording.id === selected?.id;
            return (
              <button
                key={recording.id}
                type="button"
                onClick={() => setSelectedId(recording.id)}
                className={`group flex w-full flex-col gap-4 rounded-2xl border bg-white p-4 text-left transition sm:flex-row sm:items-center ${
                  active
                    ? 'border-[#E00000]/30 shadow-[0_8px_24px_rgba(224,0,0,0.08)]'
                    : 'border-slate-200/80 hover:border-slate-300 hover:shadow-[0_6px_18px_rgba(15,23,42,0.06)]'
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#17202f] text-white">
                  <Play size={15} className="ml-0.5 fill-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-bold leading-snug text-[#17202f]">{recording.title}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:line-clamp-1">{recording.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5"><CalendarDays size={12} />{recording.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} />{recording.duration}</span>
                  </div>
                </div>
                <span className="w-full rounded-lg border border-slate-200 px-4 py-2 text-center text-xs font-semibold text-slate-600 sm:w-auto">
                  Смотреть
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
