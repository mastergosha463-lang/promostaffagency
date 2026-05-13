import { createContext, useContext, useState, ReactNode } from "react";

type Language = "RU" | "ENG";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  RU: {
    // Header
    "nav.home": "Главная",
    "nav.whyUs": "Почему мы",
    "nav.clients": "Клиенты",
    "nav.contacts": "Контакты",
    "nav.cta": "Оставить заявку",

    // Hero
    "hero.title": "Профессиональный персонал",
    "hero.titleHighlight": "для мероприятий",
    "hero.subtitle": "Организуем команду промоутеров, хостес, официантов и другого персонала для событий любого масштаба в Москве",
    "hero.cta": "Оставить заявку",
    "hero.services": "Наши услуги",

    // Services
    "services.title": "Наши услуги",
    "services.subtitle": "Предоставляем полный спектр персонала для мероприятий любого формата и масштаба",
    "services.promoters.title": "Промоутеры",
    "services.promoters.desc": "Яркие и коммуникабельные промоутеры для BTL-акций, раздачи листовок и привлечения внимания к вашему бренду",
    "services.hostess.title": "Хостес",
    "services.hostess.desc": "Элегантные хостес для встречи гостей, регистрации участников и сопровождения VIP-персон",
    "services.waiters.title": "Официанты",
    "services.waiters.desc": "Профессиональные официанты для банкетов, фуршетов и кейтеринга любого уровня сложности",
    "services.models.title": "Модели",
    "services.models.desc": "Профессиональные модели для показов, фотосессий и представительских мероприятий",
    "services.cleaning.title": "Клининг",
    "services.cleaning.desc": "Профессиональная уборка до, во время и после мероприятий для поддержания чистоты и порядка",
    "services.promoModel.title": "Промо-модель",
    "services.promoModel.desc": "Модель на подиум, стенд, съемку",
    "services.learnMore": "Подробнее",

    // Why Us page
    "whyUs.title": "Почему выбирают",
    "whyUs.titleHighlight": "EVENTWAVE",
    "whyUs.subtitle": "Мы не просто предоставляем персонал — мы создаём команды, которые делают ваше мероприятие незабываемым",
    "whyUs.stats.events": "Более 100",
    "whyUs.stats.eventsLabel": "Мероприятий",
    "whyUs.stats.clients": "Более 30",
    "whyUs.stats.clientsLabel": "Клиентов",
    "whyUs.stats.years": "5 лет",
    "whyUs.stats.yearsLabel": "На рынке",
    "whyUs.advantages.title": "Наши преимущества",
    "whyUs.advantages.experience.title": "Опыт и экспертиза",
    "whyUs.advantages.experience.desc": "5 лет успешной работы в event-индустрии. Знаем все нюансы организации мероприятий любого масштаба.",
    "whyUs.advantages.selection.title": "Тщательный отбор",
    "whyUs.advantages.selection.desc": "Каждый сотрудник проходит многоэтапное собеседование и обучение. Только лучшие попадают в нашу команду.",
    "whyUs.advantages.approach.title": "Индивидуальный подход",
    "whyUs.advantages.approach.desc": "Подбираем персонал под специфику вашего мероприятия. Учитываем все пожелания и требования.",
    "whyUs.advantages.support.title": "Поддержка 24/7",
    "whyUs.advantages.support.desc": "Координатор на связи в любое время. Оперативно решаем все вопросы до, во время и после мероприятия.",
    "whyUs.cta.title": "Готовы обсудить ваш проект?",
    "whyUs.cta.subtitle": "Свяжитесь с нами, и мы подберём идеальную команду для вашего мероприятия",
    "whyUs.cta.button": "Связаться с нами",

    // Clients page
    "clients.title": "Наши",
    "clients.titleHighlight": "клиенты",
    "clients.subtitle": "Доверие ведущих компаний — лучшее подтверждение нашего профессионализма",
    "clients.about": "О компании",

    // Contacts page
    "contacts.title": "Свяжитесь",
    "contacts.titleHighlight": "с нами",
    "contacts.subtitle": "Готовы обсудить ваш проект и подобрать идеальную команду",
    "contacts.form.title": "Оставить заявку",
    "contacts.form.name": "Ваше имя",
    "contacts.form.namePlaceholder": "Введите ваше имя",
    "contacts.form.email": "Email",
    "contacts.form.emailPlaceholder": "Введите ваш email",
    "contacts.form.phone": "Телефон",
    "contacts.form.phonePlaceholder": "+7 (999) 999-99-99",
    "contacts.form.message": "Сообщение",
    "contacts.form.messagePlaceholder": "Расскажите о вашем мероприятии...",
    "contacts.form.submit": "Отправить заявку",
    "contacts.form.success": "Заявка отправлена!",
    "contacts.form.successDesc": "Мы свяжемся с вами в ближайшее время",
    "contacts.info.title": "Контактная информация",
    "contacts.info.phone": "Телефон",
    "contacts.info.email": "Email",
    "contacts.info.address": "Адрес",
    "contacts.info.addressValue": "Москва, Россия",
    "contacts.info.hours": "Часы работы",
    "contacts.info.hoursValue": "Пн-Вс: 9:00 - 21:00",

    // Footer
    "footer.rights": "Все права защищены.",
  },
  ENG: {
    // Header
    "nav.home": "Home",
    "nav.whyUs": "Why Us",
    "nav.clients": "Clients",
    "nav.contacts": "Contacts",
    "nav.cta": "Get a Quote",

    // Hero
    "hero.title": "Professional Staff",
    "hero.titleHighlight": "for Events",
    "hero.subtitle": "We organize teams of promoters, hostesses, waiters and other staff for events of any scale in Moscow",
    "hero.cta": "Get a Quote",
    "hero.services": "Our Services",

    // Services
    "services.title": "Our Services",
    "services.subtitle": "We provide a full range of staff for events of any format and scale",
    "services.promoters.title": "Promoters",
    "services.promoters.desc": "Bright and communicative promoters for BTL campaigns, flyer distribution and attracting attention to your brand",
    "services.hostess.title": "Hostesses",
    "services.hostess.desc": "Elegant hostesses for greeting guests, registering participants and accompanying VIPs",
    "services.waiters.title": "Waiters",
    "services.waiters.desc": "Professional waiters for banquets, buffets and catering of any level of complexity",
    "services.models.title": "Models",
    "services.models.desc": "Professional models for fashion shows, photo shoots and representative events",
    "services.cleaning.title": "Cleaning",
    "services.cleaning.desc": "Professional cleaning before, during and after events to maintain cleanliness and order",
    "services.promoModel.title": "Promo Model",
    "services.promoModel.desc": "Model for podium, booth, photo shoots",
    "services.learnMore": "Learn More",

    // Why Us page
    "whyUs.title": "Why Choose",
    "whyUs.titleHighlight": "EVENTWAVE",
    "whyUs.subtitle": "We don't just provide staff — we create teams that make your event unforgettable",
    "whyUs.stats.events": "100+",
    "whyUs.stats.eventsLabel": "Events",
    "whyUs.stats.clients": "30+",
    "whyUs.stats.clientsLabel": "Clients",
    "whyUs.stats.years": "5 Years",
    "whyUs.stats.yearsLabel": "In Business",
    "whyUs.advantages.title": "Our Advantages",
    "whyUs.advantages.experience.title": "Experience & Expertise",
    "whyUs.advantages.experience.desc": "5 years of successful work in the event industry. We know all the nuances of organizing events of any scale.",
    "whyUs.advantages.selection.title": "Careful Selection",
    "whyUs.advantages.selection.desc": "Each employee goes through a multi-stage interview and training. Only the best join our team.",
    "whyUs.advantages.approach.title": "Individual Approach",
    "whyUs.advantages.approach.desc": "We select staff according to the specifics of your event. We take into account all wishes and requirements.",
    "whyUs.advantages.support.title": "24/7 Support",
    "whyUs.advantages.support.desc": "Coordinator available at any time. We quickly resolve all issues before, during and after the event.",
    "whyUs.cta.title": "Ready to Discuss Your Project?",
    "whyUs.cta.subtitle": "Contact us and we will select the perfect team for your event",
    "whyUs.cta.button": "Contact Us",

    // Clients page
    "clients.title": "Our",
    "clients.titleHighlight": "Clients",
    "clients.subtitle": "Trust of leading companies is the best confirmation of our professionalism",
    "clients.about": "About the Company",

    // Contacts page
    "contacts.title": "Get in",
    "contacts.titleHighlight": "Touch",
    "contacts.subtitle": "Ready to discuss your project and select the perfect team",
    "contacts.form.title": "Send a Request",
    "contacts.form.name": "Your Name",
    "contacts.form.namePlaceholder": "Enter your name",
    "contacts.form.email": "Email",
    "contacts.form.emailPlaceholder": "Enter your email",
    "contacts.form.phone": "Phone",
    "contacts.form.phonePlaceholder": "+7 (999) 999-99-99",
    "contacts.form.message": "Message",
    "contacts.form.messagePlaceholder": "Tell us about your event...",
    "contacts.form.submit": "Send Request",
    "contacts.form.success": "Request Sent!",
    "contacts.form.successDesc": "We will contact you shortly",
    "contacts.info.title": "Contact Information",
    "contacts.info.phone": "Phone",
    "contacts.info.email": "Email",
    "contacts.info.address": "Address",
    "contacts.info.addressValue": "Moscow, Russia",
    "contacts.info.hours": "Working Hours",
    "contacts.info.hoursValue": "Mon-Sun: 9:00 AM - 9:00 PM",

    // Footer
    "footer.rights": "All rights reserved.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("RU");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
