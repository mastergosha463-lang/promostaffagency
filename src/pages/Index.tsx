import { useEffect } from "react";
import Layout from "@/components/Layout";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, 
  Megaphone, 
  Sparkles, 
  Wrench, 
   
  Camera,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import heroWave from "@/assets/hero-wave.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  const { language, t } = useLanguage();
  useSEO({
    title:
      language === "RU"
        ? "EVENTWAVE — Надёжный персонал для мероприятий в Москве"
        : "EVENTWAVE — Reliable event staff in Moscow",
    description:
      language === "RU"
        ? "Подбор персонала для мероприятий в Москве: хелперы, хостес, промоутеры, монтажники. Команды до 40 человек за 24 часа."
        : "Event staff in Moscow: helpers, hostesses, promoters, installers. Teams of up to 40 in 24 hours.",
    canonicalPath: "/",
  });

  // Preload hero image as early as possible to improve LCP
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = heroWave;
    link.fetchPriority = "high";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const services = [
    {
      title: language === "RU" ? "Хелперы" : "Helpers",
      description: language === "RU" ? "Универсальные помощники для любых задач на мероприятии" : "Versatile assistants for any event tasks",
      icon: Users,
      to: "/staff/helpers"
    },
    {
      title: language === "RU" ? "Монтажники" : "Installers",
      description: language === "RU" ? "Сборка и разборка конструкций, оборудования" : "Assembly and disassembly of structures and equipment",
      icon: Wrench,
      to: "/staff/installers"
    },
    {
      title: language === "RU" ? "Хостес" : "Hostesses",
      description: language === "RU" ? "Встреча гостей, регистрация и сопровождение" : "Guest reception, registration and escort",
      icon: Sparkles,
      to: "/staff/hostess"
    },
    {
      title: language === "RU" ? "Промо-персонал" : "Promo Staff",
      description: language === "RU" ? "Промоутеры для раздачи материалов и привлечения внимания" : "Promoters for distributing materials and attracting attention",
      icon: Megaphone,
      to: "/staff/promo"
    },
    {
      title: language === "RU" ? "Промо-модель" : "Promo Model",
      description: language === "RU" ? "Модель на подиум, стенд, съемку" : "Model for podium, booth, photo shoots",
      icon: Camera,
      to: "/staff/promo-model"
    },
    {
      title: language === "RU" ? "Курьеры" : "Couriers",
      description: language === "RU" ? "Оперативная доставка материалов и реквизита на мероприятия" : "Prompt delivery of materials and props for events",
      icon: Users,
      to: "/staff/couriers"
    },
  ];

  const whyUsPoints = language === "RU" 
    ? [
        "Любой формат события",
        "Быстрая адаптация",
        "Команды до 40 человек за 24 часа",
        "Круглосуточная поддержка",
        "Пунктуальность гарантирована"
      ]
    : [
        "Any event format",
        "Quick adaptation",
        "Teams of up to 40 people in 24 hours",
        "24/7 support",
        "Punctuality guaranteed"
      ];

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative min-h-[92vh] flex items-center overflow-hidden bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${heroWave})`,
          backgroundPosition: "center right",
        }}
      >
        {/* Dark left-side gradient for text readability */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.1) 75%, transparent 100%)",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] animate-slide-up text-white">
              {language === "RU" ? "Надёжный персонал" : "Reliable Staff"}
              <br />
              <span className="text-primary">{language === "RU" ? "на ваши " : "for Your "}</span>
              <span className="text-white">{language === "RU" ? "мероприятия" : "Events"}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
              {language === "RU" 
                ? "Работаем со срочными заявками и формируем команду в кратчайшие сроки. Ваше событие не будет ждать — мы тоже."
                : "We handle urgent requests and form teams in the shortest time. Your event won't wait — neither will we."}
            </p>

            <div className="flex flex-wrap gap-4 mt-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/contacts">
                <Button variant="hero" size="xl">
                  {t("nav.cta")}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/why-us">
                <Button variant="outline" size="xl">
                  {language === "RU" ? "Узнать больше" : "Learn More"}
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 bg-card/50 overflow-hidden border-t border-primary/20">
        {/* Top neon glow continuing from hero */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[80%] h-80 bg-primary/20 blur-[120px] rounded-full" />
        {/* Ambient radial glow behind cards */}
        <div className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 20% 30%, hsl(322 100% 56% / 0.12), transparent 70%), radial-gradient(ellipse 50% 40% at 85% 70%, hsl(280 85% 60% / 0.12), transparent 70%)",
          }}
        />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 relative">
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-40 bg-primary/15 blur-[90px] rounded-full" />
            <h2 className="relative font-heading text-3xl md:text-4xl font-bold">
              {language === "RU" ? "Наши" : "Our"} <span className="text-primary">{language === "RU" ? "услуги" : "Services"}</span>
            </h2>
            <p className="relative text-muted-foreground mt-4 max-w-2xl mx-auto">
              {language === "RU" 
                ? "Выберите нужный тип персонала для вашего мероприятия. Мы быстро сформируем команду под ваши требования."
                : "Choose the type of staff you need for your event. We will quickly form a team according to your requirements."}
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <ServiceCard key={service.to} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Preview */}
      <section className="relative py-20 overflow-hidden border-t border-accent/20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
        <div className="pointer-events-none absolute -top-32 right-1/4 w-[500px] h-64 bg-accent/15 blur-[120px] rounded-full" />
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                {language === "RU" ? "Почему выбирают" : "Why Choose"} <span className="text-primary">EVENTWAVE</span>
                <span className="block text-lg font-normal text-muted-foreground mt-1">
                  {language === "RU" ? "Агентство по подбору персонала для мероприятий" : "Event staffing agency"}
                </span>
              </h2>
              <ul className="space-y-4">
                {whyUsPoints.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/why-us" className="inline-block mt-8">
                <Button variant="outline" size="lg">
                  {language === "RU" ? "Подробнее о нас" : "More About Us"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-[80px]" />
              <div className="relative aspect-square rounded-2xl card-gradient border border-primary/40 p-8 flex items-center justify-center glow-neon">
                <div className="text-center">
                  <p className="text-6xl md:text-8xl font-heading font-black text-gradient text-glow">
                    {language === "RU" ? "100+" : "100+"}
                  </p>
                  <p className="text-xl text-muted-foreground mt-2 tracking-wider uppercase">
                    {language === "RU" ? "успешных мероприятий" : "successful events"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-t border-primary/20 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-64 bg-primary/15 blur-[120px] rounded-full" />
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            {language === "RU" ? "Готовы начать сотрудничество?" : "Ready to Start Cooperating?"}
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            {language === "RU" 
              ? "Оставьте заявку, и мы свяжемся с вами в течение часа для обсуждения деталей."
              : "Leave a request and we will contact you within an hour to discuss the details."}
          </p>
          <Link to="/contacts">
            <Button variant="hero" size="xl">
              {language === "RU" ? "Связаться с нами" : "Contact Us"}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
