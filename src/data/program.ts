export type ModuleIcon = 'flag' | 'run' | 'plate' | 'bolt' | 'drop' | 'figure' | 'summit';

export type Lesson = {
  id: string;
  title: string;
  description: string;
  duration: string;
  text: string;
  youtubeUrl: string;
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
    lessons: [],
  },
  {
    id: 'module-2', number: 2, icon: 'run', tone: 'mint', title: 'Фундамент похудения и техника упражнений',
    description: 'Поставишь идеальную технику движений, защитишь суставы от травм и начнёшь тренироваться осознанно',
    lessons: [],
  },
  {
    id: 'module-3', number: 3, icon: 'plate', tone: 'peach', title: 'Управление питанием без стресса и срывов',
    description: 'Забудешь про жёсткие диеты, начнёшь есть досыта и при этом худеть',
    lessons: [],
  },
  {
    id: 'module-4', number: 4, icon: 'bolt', tone: 'rose', title: 'Тонкости тренировочного процесса',
    description: 'Поймёшь, как тратить на спорт минимум времени и получать максимум результата',
    lessons: [],
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
