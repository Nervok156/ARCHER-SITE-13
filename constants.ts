import { NavItem, Ability, GalleryImage, StatData, LoreSection } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'ПРОЛОГ' },
  { id: 'dossier', label: 'ДОСЬЕ' },
  { id: 'arsenal', label: 'АРСЕНАЛ' },
  { id: 'skills', label: 'НАВЫКИ' },
  { id: 'gallery', label: 'ГАЛЕРЕЯ' },
  { id: 'contact', label: 'КОНТРАКТ' },
];

export const ABILITIES: Ability[] = [
  {
    id: 1,
    name: 'Unlimited Blade Works',
    type: 'Благородный Фантазм',
    rank: 'E~A++',
    description: 'Зеркало Души. Бескрайняя пустошь, усеянная мириадами мечей. Это не просто кузница, но сама суть его существования. Позволяет мгновенно воспроизводить любое холодное оружие, увиденное хотя бы раз, вместе с мастерством его изначального владельца.',
    icon: 'Sword'
  },
  {
    id: 2,
    name: 'Око Разума (Истинное)',
    type: 'Навык',
    rank: 'B',
    description: 'Врожденная способность, отточенная в тысячах битв. Позволяет спокойно анализировать боевые условия и находить единственный путь к победе, даже если шанс составляет менее одного процента.',
    icon: 'Eye'
  },
  {
    id: 3,
    name: 'Магия Проецирования',
    type: 'Магия',
    rank: 'C (A+)',
    description: 'Искусство воссоздания материи из ничего. В исполнении Арчера оно достигло божественного уровня: он копирует не только форму, но и саму душу оружия, его историю и накопленный опыт.',
    icon: 'Zap'
  },
  {
    id: 4,
    name: 'Ро Айяс',
    type: 'Защита',
    rank: 'A',
    description: 'Семь колец, покрывающих небеса. Легендарный щит, ставший концептуальной защитой от любого метательного оружия. Единственная защита, которой доверяет тот, кто посвятил жизнь мечу.',
    icon: 'Shield'
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, url: 'https://picsum.photos/1200/800?grayscale&blur=1', caption: 'СТРАЖ НА КРЫШЕ' },
  { id: 2, url: 'https://picsum.photos/1200/801?grayscale', caption: 'КАНШО И БАКУЯ' },
  { id: 3, url: 'https://picsum.photos/1200/802?grayscale&blur=1', caption: 'ПОЛЕ БИТВЫ' },
  { id: 4, url: 'https://picsum.photos/1200/803?grayscale', caption: 'ИСПОЛНЕНИЕ ВОЛИ' },
  { id: 5, url: 'https://picsum.photos/1200/804?grayscale', caption: 'СЛОМАННЫЙ ФАНТАЗМ' },
  { id: 6, url: 'https://picsum.photos/1200/805?grayscale&blur=1', caption: 'СЕМЬ КОЛЕЦ' },
  { id: 7, url: 'https://picsum.photos/1200/806?grayscale', caption: 'ВЕЧНЫЙ ЗАКАТ' },
  { id: 8, url: 'https://picsum.photos/1200/807?grayscale&blur=1', caption: 'ОДИНОКИЙ ПУТЬ' },
];

// Stats for Radar Chart
export const SERVANT_STATS: StatData[] = [
  { subject: 'Сила', A: 60, fullMark: 100 },
  { subject: 'Выносл.', A: 60, fullMark: 100 },
  { subject: 'Ловкость', A: 70, fullMark: 100 },
  { subject: 'Мана', A: 80, fullMark: 100 },
  { subject: 'Удача', A: 40, fullMark: 100 },
  { subject: 'Фантазм', A: 50, fullMark: 100 },
];

export const CHANT_LINES = [
  "I am the bone of my sword",
  "Steel is my body and fire is my blood",
  "I have created over a thousand blades",
  "Unknown to Death, Nor known to Life",
  "Have withstood pain to create many weapons",
  "Yet, those hands will never hold anything",
  "So as I pray, Unlimited Blade Works."
];

export const LORE_SECTIONS: LoreSection[] = [
  {
    title: "Начало Пути",
    content: "Эмия Широу — это тот, кем стал юноша, мечтавший стать «Героем Справедливости». Выживший в великом пожаре Фуюки, он посвятил жизнь спасению других, отказавшись от счастья. Его путь был вымощен благими намерениями, которые привели его к контракту с Мировой Волей (Алайей) в обмен на чудо, способное спасти сотни людей ценой его посмертия."
  },
  {
    title: "Страж Противодействия",
    content: "Став Героическим Духом, он не обрел покоя. Эмия стал Стражем — безликим чистильщиком, которого призывают лишь для того, чтобы уничтожать угрозы человечеству. Он раз за разом убивал меньшинство, чтобы спасти большинство, пока его сердце не обратилось в сталь. Он увидел конец своих идеалов: спасти всех невозможно, а плата за геройство — вечное одиночество."
  },
  {
    title: "Пятая Война",
    content: "Парадокс привел его в прошлое, в войну, где он был еще юн. Призванный Тосакой Рин, Арчер преследует цель уничтожить самого себя в молодости, надеясь, что этот парадокс разорвет порочный круг. Он циничен и жесток, но сквозь броню безразличия пробивается свет тех идеалов, которые он когда-то поклялся защищать."
  },
  {
    title: "Ответ",
    content: "В конце своего бесконечного пути он находит ответ. Его идеалы не были ошибкой. Даже если это лицемерие, желание спасти всех — прекрасно. Стоя посреди пустоши клинков, он улыбается, принимая свою вечность не как проклятие, а как долг. Битва закончена, и хотя его руки никогда ничего не удержат, его душа наконец обрела мир."
  }
];