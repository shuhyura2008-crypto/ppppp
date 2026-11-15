export type ModuleIcon = 'flag' | 'run' | 'plate' | 'bolt' | 'drop' | 'figure' | 'summit';

export type Lesson = {
  id: string;
  title: string;
  description: string;
  duration?: string;
  text: string;
  youtubeUrl: string;
  imageUrl?: string;
  material?: {
    label: string;
    url: string;
  };
};

export type ProgramModule = {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: ModuleIcon;
  tone: 'sky' | 'mint' | 'peach' | 'rose' | 'aqua' | 'blue' | 'forest';
  lessons: Lesson[];
};

export const programModules: ProgramModule[] = [
  {
    id: 'module-1', number: 1, icon: 'flag', tone: 'sky', title: 'Введение в программу и постановка целей',
    description: 'Избавишься от страхов и выстроишь чёткий трек к телу мечты',
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'Как будет проходить обучение: подробнее о каждом формате',
        description: 'Знакомство с форматами и тем, как устроено обучение.',
        duration: '',
        text: 'Разбираем, как будет проходить обучение и какие форматы материалов тебя ждут.',
        youtubeUrl: 'https://youtu.be/bxZvhi1bGyI',
      },
      {
        id: 'lesson-1-2',
        title: 'Делаем фото «ДО» и замеры: чтобы отслеживать свой результат',
        description: 'Фиксируем исходную точку, чтобы замечать изменения и прогресс.',
        duration: '',
        text: 'Сделай стартовые фотографии и замеры до начала программы — так будет проще объективно оценивать результат.',
        youtubeUrl: 'https://youtube.com/shorts/EwAxKQZcj3Q',
      },
      {
        id: 'lesson-1-3',
        title: 'Какую цель поставить: поддержание, похудение, набор',
        description: 'Выбираем цель, которая подходит именно тебе.',
        duration: '',
        text: 'Разбираемся, чем отличаются цели поддержания, похудения и набора, и как выбрать подходящую.',
        youtubeUrl: 'https://youtu.be/OJBIUqCXG_s',
        imageUrl: '/lessons/kcal-formula.png',
      },
      {
        id: 'lesson-1-4',
        title: 'Точно ли нужно наращивать мышцы?',
        description: 'Отдельный материал о том, зачем организму нужны мышцы.',
        duration: '',
        text: 'Прочитай материал и узнай, какую роль мышцы играют в здоровье и изменении состава тела.',
        youtubeUrl: '',
        material: { label: 'Зачем нам мышцы — PDF', url: '/lessons/zachem-nam-myshcy.pdf' },
      },
    ],
  },
  {
    id: 'module-2', number: 2, icon: 'run', tone: 'mint', title: 'Фундамент похудения и техника упражнений',
    description: 'Поставишь идеальную технику движений, защитишь суставы от травм и начнёшь тренироваться осознанно',
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'Основы похудения',
        description: 'Разберём важные моменты, узнаем, как жир уходит из организма, и изучим правила дефицита калорий.',
        duration: '',
        text: 'В этом уроке разберём основы похудения: важные моменты, как жир уходит из организма и как соблюдать дефицит калорий.',
        youtubeUrl: 'https://youtu.be/PBKKcT09DH0',
        material: { label: 'Основы похудения — PDF', url: '/lessons/osnovy-pohudeniya.pdf' },
      },
      {
        id: 'lesson-2-2',
        title: 'Основы массонабора',
        description: 'Как увеличить калораж и не набрать жир вместо мышц.',
        duration: '',
        text: 'Разберём, как постепенно увеличить калораж, чтобы поддержать рост мышц и не набирать лишний жир.',
        youtubeUrl: 'https://youtu.be/HGbbS8afVpU',
        material: { label: 'Основы массонабора — PDF', url: '/lessons/osnovy-massonabora.pdf' },
      },
      {
        id: 'lesson-2-3',
        title: 'Тренировочный план и техника упражнений',
        description: 'План тренировок и техника выполнения каждого упражнения.',
        duration: '',
        text: 'Посмотри видео с разбором тренировочного плана и техники каждого упражнения. PDF с планом можно скачать ниже.',
        youtubeUrl: 'https://youtu.be/qbD23banqN0',
        material: { label: 'План тренировок — PDF', url: '/lessons/plan-trenirovok.pdf' },
      },
    ],
  },
  {
    id: 'module-3', number: 3, icon: 'plate', tone: 'peach', title: 'Управление питанием без стресса и срывов',
    description: 'Забудешь про жёсткие диеты, начнёшь есть досыта и при этом худеть',
    lessons: [
      {
        id: 'lesson-3-1',
        title: 'Продуктовая корзина',
        description: 'Разберём категории продуктов, как их выбирать и в каком соотношении.',
        duration: '',
        text: 'Посмотри урок о категориях продуктов: как выбирать продукты и сочетать их в рационе. PDF с материалом можно скачать ниже.',
        youtubeUrl: 'https://youtu.be/i1HMDsjxHcw',
        material: { label: 'Продуктовая корзина — PDF', url: '/lessons/produktovaya-korzina.pdf' },
      },
      {
        id: 'lesson-3-2',
        title: 'Калории или баланс БЖУ?',
        description: 'Как связаны калории и баланс БЖУ, что считать и зачем.',
        duration: '',
        text: 'Разберёмся, как взаимосвязаны калории и баланс белков, жиров и углеводов, что из этого считать и зачем. PDF с материалом можно скачать ниже.',
        youtubeUrl: 'https://youtu.be/A7XmH0mp3zg',
        material: { label: 'Калории или баланс БЖУ? — PDF', url: '/lessons/kalorii-ili-balans-bzhu.pdf' },
      },
      {
        id: 'lesson-3-3',
        title: 'Норма белка в рационе',
        description: 'Сколько белка есть, как корректировать норму и как сказываются недобор и перебор.',
        duration: '',
        text: 'Разберём, сколько белка нужно в рационе, как корректировать его количество и на что обратить внимание при недоборе или переборе.',
        youtubeUrl: 'https://youtu.be/Z3jIY81IigA',
      },
      {
        id: 'lesson-3-4',
        title: 'Норма жиров в рационе',
        description: 'Как рассчитать жиры, можно ли их перебирать и насколько допустимо сократить их количество.',
        duration: '',
        text: 'Посмотри разбор нормы жиров: как её рассчитать, что учитывать при переборе и насколько можно сократить жиры в рационе.',
        youtubeUrl: 'https://youtu.be/u4pyZEL0OR8',
      },
      {
        id: 'lesson-3-5',
        title: 'Углеводы в рационе',
        description: 'Сколько углеводов нужно и зачем они нужны.',
        duration: '',
        text: 'Разберём, сколько углеводов нужно включать в рацион и какую роль они выполняют.',
        youtubeUrl: 'https://youtu.be/-hFGfx4tGHM',
      },
      {
        id: 'lesson-3-6',
        title: 'Можно ли питаться только вкусняшками и худеть?',
        description: 'Можно ли жить на простых углеводах: разберём плюсы и минусы такого рациона.',
        duration: '',
        text: 'Обсудим, можно ли худеть, питаясь только вкусняшками, и какие плюсы и минусы есть у рациона из простых углеводов. PDF с материалом можно скачать ниже.',
        youtubeUrl: 'https://youtu.be/gTB46eCb_gI',
        material: { label: 'Продукты — PDF', url: '/lessons/produkty.pdf' },
      },
    ],
  },
  {
    id: 'module-4', number: 4, icon: 'bolt', tone: 'rose', title: 'Тонкости тренировочного процесса',
    description: 'Поймёшь, как тратить на спорт минимум времени и получать максимум результата',
    lessons: [
      {
        id: 'lesson-4-1',
        title: 'Ягодицы: конструктор тренировки',
        description: 'Из каких упражнений должна состоять тренировка на ягодицы и как составить её самостоятельно.',
        duration: '',
        text: 'Разберём упражнения для ягодиц и научимся самостоятельно собирать из них тренировку.',
        youtubeUrl: 'https://youtu.be/UDYMRgcZZkU',
      },
      {
        id: 'lesson-4-2',
        title: 'Спина: конструктор тренировки',
        description: 'Какие виды упражнений есть на спину и что стоит включить в тренировку.',
        duration: '',
        text: 'Посмотрим, какие бывают упражнения на спину и какие из них включить в тренировку.',
        youtubeUrl: 'https://youtu.be/OIJKbNfK5gg',
      },
    ],
  },
  {
    id: 'module-5', number: 5, icon: 'drop', tone: 'aqua', title: 'Преодоление плато и особенности организма',
    description: 'Научишься понимать изменения веса, убирать отёки и управлять самочувствием',
    lessons: [],
  },
  {
    id: 'module-6', number: 6, icon: 'figure', tone: 'blue', title: 'Дисциплина, прогресс и качество тела',
    description: 'Сделаешь фитнес частью своей жизни и улучшишь качество тела',
    lessons: [],
  },
  {
    id: 'module-7', number: 7, icon: 'summit', tone: 'forest', title: 'Фиксация результата и жизнь после курса',
    description: 'Закрепишь результат и соберёшь систему, которая останется с тобой надолго',
    lessons: [],
  },
];

export const allLessons = programModules.flatMap((module) => module.lessons);
