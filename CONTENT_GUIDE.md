# Добавление уроков и записей эфиров

Технические подсказки из этого файла не показываются пользователям сайта.

## Новый урок

Откройте `src/data/program.ts`, найдите нужный модуль и добавьте объект в его массив `lessons`:

```ts
{
  id: 'module-1-lesson-1',
  title: 'Название урока',
  description: 'Короткое описание для списка уроков',
  duration: '18 мин',
  text: 'Основной текст урока.',
  youtubeUrl: 'https://www.youtube.com/watch?v=VIDEO_ID',
},
```

Если у урока есть файл, добавьте поле:

```ts
material: {
  label: 'Рабочая тетрадь',
  url: '/materials/workbook.pdf',
},
```

## Новая запись эфира

Откройте `src/data/liveRecordings.ts` и добавьте объект в массив `liveRecordings`:

```ts
{
  id: 'live-2026-05-10',
  title: 'Ответы на вопросы',
  description: 'Разобрали вопросы участниц по питанию и тренировкам.',
  date: '10 мая 2026',
  duration: '52 мин',
  youtubeUrl: 'https://youtu.be/VIDEO_ID',
},
```

Поддерживаются ссылки `youtube.com/watch`, `youtu.be`, YouTube Shorts и записи трансляций. Плеер использует домен `youtube-nocookie.com`.

## Проверка перед публикацией

```bash
npm run typecheck
npm run lint
npm run build
```

После добавления контента проверьте страницы на широком экране и на телефоне.
