import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { 
  ArrowRight, 
  ArrowLeft,
  Users, 
  Megaphone, 
  Sparkles, 
  Wrench, 
  Palette, 
  UtensilsCrossed, 
  PartyPopper, 
  ClipboardCheck,
  Camera,
  Music,
  CheckCircle2
} from "lucide-react";

const staffData: Record<string, {
  title: string;
  description: string;
  icon: typeof Users;
  duties: string[];
  events: string[];
}> = {
  helpers: {
    title: "Хелперы",
    description: "Универсальные помощники, которые возьмут на себя любые задачи на вашем мероприятии. Надёжные, исполнительные, готовые к любой работе.",
    icon: Users,
    duties: [
      "Погрузка и разгрузка оборудования",
      "Расстановка мебели и декораций",
      "Помощь в организации пространства",
      "Уборка территории",
      "Любые поручения организаторов"
    ],
    events: ["Корпоративы", "Выставки", "Фестивали", "Конференции", "Частные мероприятия"]
  },
  promo: {
    title: "Промо-персонал",
    description: "Активные промоутеры для привлечения внимания к вашему бренду. Раздача материалов, проведение опросов, работа на стендах.",
    icon: Megaphone,
    duties: [
      "Раздача листовок и буклетов",
      "Работа на промо-стендах",
      "Проведение опросов и анкетирование",
      "Привлечение посетителей",
      "Презентация продукции"
    ],
    events: ["Выставки", "Торговые центры", "Городские события", "Презентации", "Промо-акции"]
  },
  hostess: {
    title: "Хостес",
    description: "Элегантные и внимательные сотрудницы для встречи гостей. Регистрация, сопровождение, информационная поддержка.",
    icon: Sparkles,
    duties: [
      "Встреча и регистрация гостей",
      "Сопровождение VIP-персон",
      "Работа в гардеробе",
      "Информационная поддержка",
      "Координация потока гостей"
    ],
    events: ["Корпоративы", "Конференции", "Презентации", "Свадьбы", "VIP-мероприятия"]
  },
  installers: {
    title: "Монтажники",
    description: "Профессиональная сборка и разборка конструкций любой сложности. Сцены, стенды, декорации — всё сделаем качественно и в срок.",
    icon: Wrench,
    duties: [
      "Сборка сценических конструкций",
      "Монтаж выставочных стендов",
      "Установка декораций",
      "Работа со звуковым оборудованием",
      "Демонтаж после мероприятия"
    ],
    events: ["Концерты", "Выставки", "Фестивали", "Корпоративы", "Презентации"]
  },
  decorators: {
    title: "Декораторы",
    description: "Создаём атмосферу вашего мероприятия. Оформление пространства, работа с цветами, тканями и декоративными элементами.",
    icon: Palette,
    duties: [
      "Оформление площадки",
      "Работа с цветочными композициями",
      "Драпировка тканями",
      "Установка декоративных элементов",
      "Создание тематических зон"
    ],
    events: ["Свадьбы", "Корпоративы", "Презентации", "Фотозоны", "Тематические вечеринки"]
  },
  couriers: {
    title: "Курьеры",
    description: "Оперативная доставка материалов, реквизита и оборудования на мероприятия. Быстрые и ответственные курьеры, которые доставят всё точно в срок.",
    icon: Users,
    duties: [
      "Доставка материалов и реквизита на площадку",
      "Перевозка документов и полиграфии",
      "Срочная курьерская доставка по городу",
      "Транспортировка оборудования между локациями",
      "Доставка подарков и сувенирной продукции"
    ],
    events: ["Выставки", "Конференции", "Корпоративы", "Презентации", "Фестивали"]
  },
  animators: {
    title: "Аниматоры",
    description: "Профессиональные ведущие и аниматоры для создания незабываемой атмосферы. Развлекательные программы для любой аудитории.",
    icon: PartyPopper,
    duties: [
      "Проведение игр и конкурсов",
      "Работа с детской аудиторией",
      "Ростовые куклы и костюмы",
      "Интерактивные программы",
      "Ведение мероприятий"
    ],
    events: ["Детские праздники", "Корпоративы", "Фестивали", "Городские события", "Тематические вечеринки"]
  },
  supervisors: {
    title: "Супервайзеры",
    description: "Координация команды и контроль качества работы персонала. Опытные менеджеры, которые возьмут на себя организационные вопросы.",
    icon: ClipboardCheck,
    duties: [
      "Координация работы команды",
      "Контроль качества обслуживания",
      "Решение оперативных вопросов",
      "Связь с заказчиком",
      "Отчётность по мероприятию"
    ],
    events: ["Крупные мероприятия", "Фестивали", "Выставки", "Масштабные корпоративы"]
  },
  photographers: {
    title: "Фотографы",
    description: "Профессиональная съёмка вашего мероприятия. Качественные фотографии, которые сохранят память о событии на долгие годы.",
    icon: Camera,
    duties: [
      "Репортажная съёмка мероприятия",
      "Постановочные фотографии",
      "Съёмка гостей и VIP-персон",
      "Обработка и ретушь фотографий",
      "Создание фотоальбомов"
    ],
    events: ["Корпоративы", "Свадьбы", "Конференции", "Презентации", "Фестивали"]
  },
  dj: {
    title: "DJ",
    description: "Профессиональное музыкальное сопровождение вашего мероприятия. Создадим правильную атмосферу и подберём музыку под любой формат.",
    icon: Music,
    duties: [
      "Музыкальное сопровождение мероприятия",
      "Подбор плейлиста под формат события",
      "Работа с собственным оборудованием",
      "Объявления и интерактив с гостями",
      "Сведение и микширование треков"
    ],
    events: ["Корпоративы", "Свадьбы", "Вечеринки", "Фестивали", "Презентации"]
  }
};

const StaffPage = () => {
  const { type } = useParams<{ type: string }>();
  const staff = type ? staffData[type] : null;

  if (!staff) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold">Страница не найдена</h1>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">
            Вернуться на главную
          </Link>
        </div>
      </Layout>
    );
  }

  const Icon = staff.icon;

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Все услуги
          </Link>

          {/* Header */}
          <div className="flex items-start gap-6 mb-12">
            <div className="p-4 rounded-xl bg-primary/10 text-primary">
              <Icon className="w-10 h-10" />
            </div>
            <div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold">
                {staff.title}
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <p className="text-lg text-foreground leading-relaxed">
                  {staff.description}
                </p>
              </div>

              {/* Duties */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <h2 className="font-heading font-bold text-xl mb-4">Обязанности</h2>
                <ul className="space-y-3">
                  {staff.duties.map((duty) => (
                    <li key={duty} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{duty}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Events */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <h2 className="font-heading font-bold text-xl mb-4">Подходит для</h2>
                <div className="flex flex-wrap gap-2">
                  {staff.events.map((event) => (
                    <span 
                      key={event}
                      className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                    >
                      {event}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                <h3 className="font-heading font-bold text-xl mb-4">Заказать {staff.title.toLowerCase()}</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Оставьте заявку, и мы подберём персонал под ваши требования
                </p>
                <Link to="/contacts">
                  <Button variant="hero" size="lg" className="w-full">
                    Оставить заявку
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-heading font-bold text-lg mb-3">Условия работы</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Минимальный заказ — 5 часов</li>
                  <li>• Организация питания персонала</li>
                  <li>• Форма одежды по согласованию</li>
                  <li>• Бесплатная замена при необходимости</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StaffPage;
