import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  CheckCircle2, 
  Users, 
  Clock, 
  Shield, 
  Zap, 
  Award,
  ArrowRight
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhyUs = () => {
  const { language, t } = useLanguage();

  const benefits = [
    {
      icon: Users,
      title: language === "RU" ? "Опытная команда" : "Experienced Team",
      description: language === "RU" 
        ? "Наш персонал прошёл более 50 мероприятий разного формата — от небольших корпоративов до крупных городских фестивалей."
        : "Our staff has participated in over 50 events of various formats — from small corporate events to large city festivals."
    },
    {
      icon: Clock,
      title: language === "RU" ? "Пунктуальность" : "Punctuality",
      description: language === "RU"
        ? "99% гарантия доходимости благодаря уникальной системе контроля и резервированию персонала."
        : "99% arrival guarantee thanks to a unique control system and staff reservation."
    },
    {
      icon: Zap,
      title: language === "RU" ? "Быстрая мобилизация" : "Quick Mobilization",
      description: language === "RU"
        ? "Формируем команды до 40 человек в кратчайшие сроки. Умеем работать в режиме «нужно ещё вчера»."
        : "We form teams of up to 40 people in the shortest time. We can work in 'needed yesterday' mode."
    },
    {
      icon: Shield,
      title: language === "RU" ? "Надёжность" : "Reliability",
      description: language === "RU"
        ? "Каждый сотрудник проходит проверку и инструктаж. Мы несём ответственность за качество работы."
        : "Each employee undergoes verification and briefing. We are responsible for the quality of work."
    },
    {
      icon: Award,
      title: language === "RU" ? "Гибкость" : "Flexibility",
      description: language === "RU"
        ? "Быстро адаптируемся под требования заказчика. Меняем состав команды, график, задачи — без проблем."
        : "We quickly adapt to customer requirements. We change team composition, schedule, tasks — no problem."
    },
  ];

  const aboutTexts = language === "RU" ? [
    "EVENTWAVE родилась из практического опыта и глубокого понимания того, как работают события в Москве. Мы знаем, что организатор мероприятия часто сталкивается с вызовом: где найти надёжный, профессиональный персонал, который придёт вовремя, выполнит работу качественно и поддержит атмосферу события? Именно эту проблему мы решаем.",
    "Наша команда состоит из людей, которые сами работали на событиях и понимают все нюансы этой работы. Мы тщательно отбираем специалистов, проверяем их опыт и надёжность, а затем предлагаем вам только лучших.",
    "Мы не просто подбираем людей — мы создаём команды, которые работают как единый организм. Каждый член нашего персонала знает, что от него ожидается, и готов выложиться на полную.",
    "Мы гордимся тем, что за всё время нашей работы не было ни одного случая, когда персонал подвел организатора. Это не случайность — это результат нашего тщательного отбора и постоянного контроля качества."
  ] : [
    "EVENTWAVE was born from practical experience and deep understanding of how events work in Moscow. We know that event organizers often face a challenge: where to find reliable, professional staff who will arrive on time, do quality work and support the atmosphere of the event? This is exactly the problem we solve.",
    "Our team consists of people who have worked at events themselves and understand all the nuances of this work. We carefully select specialists, verify their experience and reliability, and then offer you only the best.",
    "We don't just select people — we create teams that work as a single organism. Each member of our staff knows what is expected of them and is ready to give their all.",
    "We are proud that throughout our work there has not been a single case when staff let down the organizer. This is not a coincidence — it is the result of our careful selection and constant quality control."
  ];

  const additionalPoints = language === "RU" ? [
    "Организация питания для персонала",
    <>При краткосрочном вызове минимальная оплата труда — <span className="text-primary font-semibold">5 часов</span></>
  ] : [
    "Staff catering organization",
    <>For short-term calls, minimum payment is <span className="text-primary font-semibold">5 hours</span></>
  ];

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-bold">
              {language === "RU" ? "Почему именно" : "Why Choose"} <span className="text-primary">{language === "RU" ? "мы" : "Us"}</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              {language === "RU" 
                ? "EVENTWAVE — надёжность в каждой детали события"
                : "EVENTWAVE — reliability in every detail of your event"}
            </p>
          </div>

          {/* About */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="p-8 rounded-2xl bg-card border border-border">
              {aboutTexts.map((text, index) => (
                <p key={index} className={`text-lg text-foreground leading-relaxed ${index > 0 ? "mt-4" : ""}`}>
                  {text}
                </p>
              ))}
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {benefits.map((benefit) => (
              <div 
                key={benefit.title}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-20">
            {[
              { value: language === "RU" ? "Более 100" : "100+", label: language === "RU" ? "Мероприятий" : "Events" },
              { value: language === "RU" ? "Более 30" : "30+", label: language === "RU" ? "Клиентов" : "Clients" },
              { value: language === "RU" ? "5 лет" : "5 Years", label: language === "RU" ? "На рынке" : "In Business" },
            ].map((stat) => (
              <div 
                key={stat.label} 
                className="text-center p-6"
              >
                <p className="text-3xl md:text-4xl font-heading font-black text-primary">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6 text-center">
              {language === "RU" ? "Дополнительно" : "Additionally"}
            </h2>
            <div className="space-y-4">
              {additionalPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link to="/contacts">
              <Button variant="hero" size="xl">
                {language === "RU" ? "Обсудить сотрудничество" : "Discuss Cooperation"}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WhyUs;
