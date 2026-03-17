import Layout from "@/components/Layout";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, Megaphone, Sparkles, Wrench, Palette, UtensilsCrossed, 
  PartyPopper, ClipboardCheck, Camera, Music, CheckCircle2, 
  ArrowRight, SprayCan, Star, Shield, Clock
} from "lucide-react";
import heroPremium from "@/assets/hero-premium.jpg";
import teamPremium from "@/assets/team-premium.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { language, t } = useLanguage();

  const services = [
    { title: language === "RU" ? "Хелперы" : "Helpers", description: language === "RU" ? "Универсальные помощники для любых задач на мероприятии" : "Versatile assistants for any event tasks", icon: Users, to: "/staff/helpers" },
    { title: language === "RU" ? "Промо-персонал" : "Promo Staff", description: language === "RU" ? "Промоутеры для раздачи материалов и привлечения внимания" : "Promoters for distributing materials and attracting attention", icon: Megaphone, to: "/staff/promo" },
    { title: language === "RU" ? "Кейтеринг" : "Catering", description: language === "RU" ? "Официанты, бармены и персонал для обслуживания" : "Waiters, bartenders and service staff", icon: UtensilsCrossed, to: "/staff/catering" },
    { title: language === "RU" ? "Декораторы" : "Decorators", description: language === "RU" ? "Оформление площадок и создание атмосферы" : "Venue decoration and atmosphere creation", icon: Palette, to: "/staff/decorators" },
    { title: language === "RU" ? "Хостес" : "Hostesses", description: language === "RU" ? "Встреча гостей, регистрация и сопровождение" : "Guest reception, registration and escort", icon: Sparkles, to: "/staff/hostess" },
    { title: language === "RU" ? "Монтажники" : "Installers", description: language === "RU" ? "Сборка и разборка конструкций, оборудования" : "Assembly and disassembly of structures and equipment", icon: Wrench, to: "/staff/installers" },
    { title: language === "RU" ? "Аниматоры" : "Animators", description: language === "RU" ? "Ведущие, аниматоры и развлекательные программы" : "Hosts, animators and entertainment programs", icon: PartyPopper, to: "/staff/animators" },
    { title: language === "RU" ? "Супервайзеры" : "Supervisors", description: language === "RU" ? "Координация команды и контроль качества" : "Team coordination and quality control", icon: ClipboardCheck, to: "/staff/supervisors" },
    { title: language === "RU" ? "Фотографы" : "Photographers", description: language === "RU" ? "Профессиональная съёмка мероприятий" : "Professional event photography", icon: Camera, to: "/staff/photographers" },
    { title: "DJ", description: language === "RU" ? "Музыкальное сопровождение мероприятий" : "Musical accompaniment for events", icon: Music, to: "/staff/dj" },
    { title: language === "RU" ? "Клининг" : "Cleaning", description: language === "RU" ? "Уборка и поддержание чистоты на площадке" : "Cleaning and maintaining venue cleanliness", icon: SprayCan, to: "/staff/cleaning" },
    { title: language === "RU" ? "Промо-модель" : "Promo Model", description: language === "RU" ? "Модель на подиум, стенд, съемку" : "Model for podium, booth, photo shoots", icon: Camera, to: "/staff/promo-model" },
  ];

  const stats = [
    { value: "100+", label: language === "RU" ? "Мероприятий" : "Events" },
    { value: "30+", label: language === "RU" ? "Клиентов" : "Clients" },
    { value: "24/7", label: language === "RU" ? "Поддержка" : "Support" },
    { value: "24ч", label: language === "RU" ? "Формирование команды" : "Team Assembly" },
  ];

  const trustPoints = [
    { icon: Shield, title: language === "RU" ? "Гарантия качества" : "Quality Guarantee", desc: language === "RU" ? "Строгий отбор и обучение каждого сотрудника" : "Strict selection and training of every employee" },
    { icon: Clock, title: language === "RU" ? "Пунктуальность" : "Punctuality", desc: language === "RU" ? "Команда на месте вовремя — всегда" : "Team on-site on time — always" },
    { icon: Star, title: language === "RU" ? "Премиум сервис" : "Premium Service", desc: language === "RU" ? "Профессиональный подход к каждому проекту" : "Professional approach to every project" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroPremium} alt="EVENTWAVE Premium Event Staffing" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-in">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {language === "RU" ? "Премиум персонал для мероприятий" : "Premium Event Staffing Agency"}
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] animate-slide-up tracking-tight">
              {language === "RU" ? "Надёжный персонал" : "Reliable Staff"}
              <br />
              <span className="text-gradient">{language === "RU" ? "для ваших событий" : "for Your Events"}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mt-8 max-w-xl leading-relaxed animate-slide-up" style={{ animationDelay: "0.15s" }}>
              {language === "RU" 
                ? "Формируем профессиональные команды для корпоративных мероприятий, конференций и частных событий любого масштаба."
                : "We build professional teams for corporate events, conferences, and private events of any scale."}
            </p>

            <div className="flex flex-wrap gap-4 mt-10 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/contacts">
                <Button variant="hero" size="xl">
                  {language === "RU" ? "Забронировать персонал" : "Book Staff"}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contacts">
                <Button variant="outline" size="xl" className="border-primary/30 hover:border-primary hover:bg-primary/5">
                  {language === "RU" ? "Получить расчёт" : "Get a Quote"}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/50 rounded-t-2xl overflow-hidden">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-card/90 backdrop-blur-sm px-6 py-6 text-center">
                  <p className="text-2xl md:text-3xl font-heading font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {trustPoints.map((point) => (
              <div key={point.title} className="text-center p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 group">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <point.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">{point.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
              {language === "RU" ? "Наши услуги" : "Our Services"}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold">
              {language === "RU" ? "Персонал для любого " : "Staff for Any "}
              <span className="text-gradient">{language === "RU" ? "формата" : "Format"}</span>
            </h2>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
              {language === "RU" 
                ? "Выберите нужный тип персонала. Мы быстро сформируем команду профессионалов под ваши требования."
                : "Choose the type of staff you need. We will quickly form a team of professionals according to your requirements."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <ServiceCard key={service.to} {...service} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/contacts">
              <Button variant="hero" size="xl">
                {language === "RU" ? "Нанять персонал" : "Hire Event Staff"}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About / Why Us Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-premium)]">
                <img src={teamPremium} alt="EVENTWAVE Team" className="w-full h-auto object-cover aspect-[4/5]" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl p-6 shadow-lg hidden md:block">
                <p className="text-3xl font-heading font-bold text-primary">5+</p>
                <p className="text-sm text-muted-foreground">{language === "RU" ? "лет опыта" : "years experience"}</p>
              </div>
            </div>
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
                {language === "RU" ? "Почему мы" : "Why Us"}
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 leading-tight">
                {language === "RU" ? "Почему выбирают " : "Why Choose "}
                <span className="text-gradient">EVENTWAVE</span>
              </h2>
              <ul className="space-y-5">
                {[
                  language === "RU" ? "Любой формат события — от камерных до масштабных" : "Any event format — from intimate to large-scale",
                  language === "RU" ? "Быстрая адаптация под ваши требования" : "Quick adaptation to your requirements",
                  language === "RU" ? "Команды до 40 человек за 24 часа" : "Teams of up to 40 people in 24 hours",
                  language === "RU" ? "Круглосуточная поддержка координатора" : "24/7 coordinator support",
                  language === "RU" ? "Гарантированная пунктуальность" : "Guaranteed punctuality",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/why-us" className="inline-block mt-10">
                <Button variant="outline" size="lg" className="border-primary/30 hover:border-primary hover:bg-primary/5">
                  {language === "RU" ? "Подробнее о нас" : "More About Us"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
            {language === "RU" ? "Начнём сотрудничество" : "Let's Work Together"}
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 max-w-2xl mx-auto leading-tight">
            {language === "RU" ? "Готовы обеспечить ваше мероприятие лучшим персоналом?" : "Ready to Staff Your Event with the Best?"}
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            {language === "RU" 
              ? "Оставьте заявку, и мы свяжемся с вами в течение часа для обсуждения деталей."
              : "Leave a request and we will contact you within an hour to discuss the details."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contacts">
              <Button variant="hero" size="xl">
                {language === "RU" ? "Получить расчёт" : "Get a Quote"}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contacts">
              <Button variant="outline" size="xl" className="border-primary/30 hover:border-primary hover:bg-primary/5">
                {language === "RU" ? "Забронировать персонал" : "Book Staff"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
