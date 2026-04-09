import Layout from "@/components/Layout";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, 
  Megaphone, 
  Sparkles, 
  Wrench, 
  UtensilsCrossed, 
  Camera,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import heroWave from "@/assets/hero-wave.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { language, t } = useLanguage();

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
      title: language === "RU" ? "Кейтеринг" : "Catering",
      description: language === "RU" ? "Официанты, бармены и персонал для обслуживания" : "Waiters, bartenders and service staff",
      icon: UtensilsCrossed,
      to: "/staff/catering"
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
              {language === "RU" ? "Надёжный персонал" : "Reliable Staff"}
              <br />
              <span className="text-gradient">{language === "RU" ? "на ваши мероприятия" : "for Your Events"}</span>
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
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              {language === "RU" ? "Наши" : "Our"} <span className="text-primary">{language === "RU" ? "услуги" : "Services"}</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              {language === "RU" 
                ? "Выберите нужный тип персонала для вашего мероприятия. Мы быстро сформируем команду под ваши требования."
                : "Choose the type of staff you need for your event. We will quickly form a team according to your requirements."}
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
                {language === "RU" ? "Почему выбирают" : "Why Choose"} <span className="text-primary">EVENTWAVE</span>
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
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-border p-8 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-5xl md:text-7xl font-heading font-black text-primary">
                    {language === "RU" ? "Более 100" : "100+"}
                  </p>
                  <p className="text-xl text-muted-foreground mt-2">
                    {language === "RU" ? "успешных мероприятий" : "successful events"}
                  </p>
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
