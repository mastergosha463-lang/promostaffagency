import Layout from "@/components/Layout";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
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
  CheckCircle2,
  ArrowRight,
  SprayCan,
  Bike
} from "lucide-react";
import heroWave from "@/assets/hero-wave.jpg";

const services = [
  {
    title: "Хелперы",
    description: "Универсальные помощники для любых задач на мероприятии",
    icon: Users,
    to: "/staff/helpers"
  },
  {
    title: "Промо-персонал",
    description: "Промоутеры для раздачи материалов и привлечения внимания",
    icon: Megaphone,
    to: "/staff/promo"
  },
  {
    title: "Кейтеринг",
    description: "Официанты, бармены и персонал для обслуживания",
    icon: UtensilsCrossed,
    to: "/staff/catering"
  },
  {
    title: "Декораторы",
    description: "Оформление площадок и создание атмосферы",
    icon: Palette,
    to: "/staff/decorators"
  },
  {
    title: "Хостес",
    description: "Встреча гостей, регистрация и сопровождение",
    icon: Sparkles,
    to: "/staff/hostess"
  },
  {
    title: "Монтажники",
    description: "Сборка и разборка конструкций, оборудования",
    icon: Wrench,
    to: "/staff/installers"
  },
  {
    title: "Аниматоры",
    description: "Ведущие, аниматоры и развлекательные программы",
    icon: PartyPopper,
    to: "/staff/animators"
  },
  {
    title: "Супервайзеры",
    description: "Координация команды и контроль качества",
    icon: ClipboardCheck,
    to: "/staff/supervisors"
  },
  {
    title: "Фотографы",
    description: "Профессиональная съёмка мероприятий",
    icon: Camera,
    to: "/staff/photographers"
  },
  {
    title: "DJ",
    description: "Музыкальное сопровождение мероприятий",
    icon: Music,
    to: "/staff/dj"
  },
  {
    title: "Клининг",
    description: "Уборка и поддержание чистоты на площадке",
    icon: SprayCan,
    to: "/staff/cleaning"
  },
  {
    title: "Курьеры",
    description: "Оперативная доставка материалов и документов",
    icon: Bike,
    to: "/staff/couriers"
  },
];

const stats = [
  { value: "Более 100", label: "Мероприятий" },
  { value: "Более 30", label: "Клиентов" },
  { value: "5 лет", label: "На рынке" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroWave} 
            alt="EVENTWAVE" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black leading-tight animate-slide-up">
              Надёжный персонал
              <br />
              <span className="text-gradient">на ваши мероприятия</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Работаем со срочными заявками и формируем команду в кратчайшие сроки. Ваше событие не будет ждать — мы тоже.
            </p>

            <div className="flex flex-wrap gap-4 mt-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/contacts">
                <Button variant="hero" size="xl">
                  Оставить заявку
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/why-us">
                <Button variant="outline" size="xl">
                  Узнать больше
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <p className="text-3xl md:text-4xl font-heading font-black text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Наши <span className="text-primary">услуги</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Выберите нужный тип персонала для вашего мероприятия. 
              Мы быстро сформируем команду под ваши требования.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <ServiceCard key={service.to} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Почему выбирают <span className="text-primary">EVENTWAVE</span>
              </h2>
              <ul className="space-y-4">
                {[
                  "Любой формат события",
                  "Быстрая адаптация",
                  "Команды до 40 человек за 24 часа",
                  "Круглосуточная поддержка",
                  "Пунктуальность гарантирована"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/why-us" className="inline-block mt-8">
                <Button variant="outline" size="lg">
                  Подробнее о нас
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-border p-8 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-5xl md:text-7xl font-heading font-black text-primary">Более 100</p>
                  <p className="text-xl text-muted-foreground mt-2">успешных мероприятий</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Готовы начать сотрудничество?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Оставьте заявку, и мы свяжемся с вами в течение часа для обсуждения деталей.
          </p>
          <Link to="/contacts">
            <Button variant="hero" size="xl">
              Связаться с нами
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
