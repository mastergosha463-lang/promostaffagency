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

const benefits = [
  {
    icon: Users,
    title: "Опытная команда",
    description: "Наш персонал прошёл более 50 мероприятий разного формата — от небольших корпоративов до крупных городских фестивалей."
  },
  {
    icon: Clock,
    title: "Пунктуальность",
    description: "99% гарантия доходимости благодаря уникальной системе контроля и резервированию персонала."
  },
  {
    icon: Zap,
    title: "Быстрая мобилизация",
    description: "Формируем команды до 40 человек в кратчайшие сроки. Умеем работать в режиме «нужно ещё вчера»."
  },
  {
    icon: Shield,
    title: "Надёжность",
    description: "Каждый сотрудник проходит проверку и инструктаж. Мы несём ответственность за качество работы."
  },
  {
    icon: Award,
    title: "Гибкость",
    description: "Быстро адаптируемся под требования заказчика. Меняем состав команды, график, задачи — без проблем."
  },
];

const WhyUs = () => {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-bold">
              Почему именно <span className="text-primary">мы</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              EVENTWAVE — надёжность в каждой детали события
            </p>
          </div>

          {/* About */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="p-8 rounded-2xl bg-card border border-border">
              <p className="text-lg text-foreground leading-relaxed">
                EVENTWAVE родилась из практического опыта и глубокого понимания того, как работают события в Москве. Мы знаем, что организатор мероприятия часто сталкивается с вызовом: где найти надёжный, профессиональный персонал, который придёт вовремя, выполнит работу качественно и поддержит атмосферу события? Именно эту проблему мы решаем.
              </p>
              <p className="text-lg text-foreground leading-relaxed mt-4">
                Наша команда состоит из людей, которые сами работали на событиях и понимают все нюансы этой работы. Мы тщательно отбираем специалистов, проверяем их опыт и надёжность, а затем предлагаем вам только лучших.
              </p>
              <p className="text-lg text-foreground leading-relaxed mt-4">
                Мы не просто подбираем людей — мы создаём команды, которые работают как единый организм. Каждый член нашего персонала знает, что от него ожидается, и готов выложиться на полную.
              </p>
              <p className="text-lg text-foreground leading-relaxed mt-4">
                Мы гордимся тем, что за всё время нашей работы не было ни одного случая, когда персонал подвел организатора. Это не случайность — это результат нашего тщательного отбора и постоянного контроля качества.
              </p>
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
              { value: "Более 100", label: "Мероприятий" },
              { value: "Более 30", label: "Клиентов" },
              { value: "5 лет", label: "На рынке" },
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
              Дополнительно
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">
                  Организация питания для персонала
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">
                  При краткосрочном вызове минимальная оплата труда — <span className="text-primary font-semibold">5 часов</span>
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link to="/contacts">
              <Button variant="hero" size="xl">
                Обсудить сотрудничество
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
