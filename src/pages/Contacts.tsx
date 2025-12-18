import Layout from "@/components/Layout";
import ContactIcons from "@/components/ContactIcons";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock } from "lucide-react";

const Contacts = () => {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold">
              <span className="text-primary">Контакты</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Свяжитесь с нами любым удобным способом. Мы ответим в течение часа.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-heading font-bold text-xl mb-6">Руслан</h3>
                  
                  <div className="space-y-4">
                    <a 
                      href="tel:+79257420436"
                      className="flex items-center gap-4 p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors group"
                    >
                      <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Телефон</p>
                        <p className="font-semibold text-foreground">+7 (925) 742-04-36</p>
                      </div>
                    </a>

                    <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary">
                      <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Город</p>
                        <p className="font-semibold text-foreground">Москва</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary">
                      <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Режим работы</p>
                        <p className="font-semibold text-foreground">24/7</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-heading font-bold text-lg mb-4">Мессенджеры</h3>
                  <ContactIcons size="lg" />
                  <p className="text-sm text-muted-foreground mt-4">
                    Напишите в любой мессенджер — ответим в течение 15 минут
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-heading font-bold text-xl mb-6">Оставить заявку</h3>
                
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Ваше имя</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none transition-colors text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Телефон</label>
                    <input 
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none transition-colors text-foreground"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Тип мероприятия</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none transition-colors text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Сообщение</label>
                    <textarea 
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none transition-colors resize-none text-foreground"
                      rows={4}
                      placeholder="Опишите ваши требования к персоналу..."
                    />
                  </div>

                  <Button variant="hero" size="lg" className="w-full">
                    Отправить заявку
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacts;
