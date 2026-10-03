import { Youtube } from 'lucide-react';

type Props = {
  url?: string;
  title: string;
};

function getYouTubeVideoId(value?: string) {
  if (!value) return null;

  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      return url.pathname.split('/').filter(Boolean)[0] ?? null;
    }

    if (host === 'youtube.com' || host.endsWith('.youtube.com')) {
      if (url.pathname === '/watch') return url.searchParams.get('v');

      const [kind, id] = url.pathname.split('/').filter(Boolean);
      if (['embed', 'shorts', 'live'].includes(kind)) return id ?? null;
    }
  } catch {
    return null;
  }

  return null;
}

export default function YouTubePlayer({ url, title }: Props) {
  const videoId = getYouTubeVideoId(url);

  if (!videoId) return null;

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div className="mb-6 overflow-hidden rounded-xl bg-[#101722] shadow-[0_14px_34px_rgba(15,23,42,0.2)] sm:rounded-2xl">
      <div className="aspect-video">
        <iframe
          className="h-full w-full"
          src={embedUrl}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-[11px] text-white/65 sm:text-xs">
        <span className="flex items-center gap-2">
          <Youtube size={16} className="text-[#ff0033]" /> Видео урока
        </span>
        <a className="font-medium text-white/85 hover:text-white" href={watchUrl} target="_blank" rel="noreferrer">
          Открыть на YouTube
        </a>
      </div>
    </div>
  );
}
