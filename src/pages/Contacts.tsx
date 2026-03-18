import Layout from "@/components/Layout";
import ContactIcons from "@/components/ContactIcons";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Contacts = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    event_type: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = language === "RU" ? "Введите имя" : "Enter your name";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = language === "RU" ? "Введите телефон" : "Enter your phone";
    }
    if (!formData.event_type.trim()) {
      newErrors.event_type = language === "RU" ? "Укажите тип мероприятия" : "Enter event type";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-telegram", {
        body: formData,
      });

      if (error) throw error;

      setIsSubmitted(true);
      setFormData({ name: "", phone: "", event_type: "", message: "" });
    } catch (err) {
      console.error("Submit error:", err);
      toast.error(
        language === "RU"
          ? "Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в мессенджер."
          : "Failed to send request. Please try again or contact us via messenger."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold">
              <span className="text-primary">{language === "RU" ? "Контакты" : "Contacts"}</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              {language === "RU"
                ? "Свяжитесь с нами любым удобным способом. Мы ответим в течение часа."
                : "Contact us in any convenient way. We will respond within an hour."}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-heading font-bold text-xl mb-6">{language === "RU" ? "Руслан" : "Ruslan"}</h3>

                  <div className="space-y-4">
                    <a
                      href="tel:+79257420436"
                      className="flex items-center gap-4 p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors group"
                    >
                      <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{language === "RU" ? "Телефон" : "Phone"}</p>
                        <p className="font-semibold text-foreground">+7 (925) 742-04-36</p>
                      </div>
                    </a>

                    <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary">
                      <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{language === "RU" ? "Город" : "City"}</p>
                        <p className="font-semibold text-foreground">{language === "RU" ? "Москва" : "Moscow"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary">
                      <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{language === "RU" ? "Режим работы" : "Working Hours"}</p>
                        <p className="font-semibold text-foreground">24/7</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-heading font-bold text-lg mb-4">{language === "RU" ? "Мессенджеры" : "Messengers"}</h3>
                  <ContactIcons size="lg" />
                  <p className="text-sm text-muted-foreground mt-4">
                    {language === "RU"
                      ? "Напишите в любой мессенджер — ответим в течение 15 минут"
                      : "Write to any messenger — we will respond within 15 minutes"}
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-heading font-bold text-xl mb-6">
                  {language === "RU" ? "Оставить заявку" : "Leave a Request"}
                </h3>

                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <CheckCircle className="w-16 h-16 text-primary" />
                    <h4 className="font-heading font-bold text-lg text-foreground">
                      {language === "RU" ? "Спасибо!" : "Thank you!"}
                    </h4>
                    <p className="text-muted-foreground">
                      {language === "RU"
                        ? "Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время."
                        : "Your request has been sent. We will contact you shortly."}
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4"
                    >
                      {language === "RU" ? "Отправить ещё" : "Send another"}
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        {language === "RU" ? "Ваше имя" : "Your Name"} *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg bg-secondary border ${errors.name ? "border-destructive" : "border-border"} focus:border-primary focus:outline-none transition-colors text-foreground`}
                      />
                      {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        {language === "RU" ? "Телефон" : "Phone"} *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+7 (___) ___-__-__"
                        className={`w-full px-4 py-3 rounded-lg bg-secondary border ${errors.phone ? "border-destructive" : "border-border"} focus:border-primary focus:outline-none transition-colors text-foreground`}
                      />
                      {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        {language === "RU" ? "Тип мероприятия" : "Event Type"} *
                      </label>
                      <input
                        type="text"
                        value={formData.event_type}
                        onChange={(e) => handleChange("event_type", e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg bg-secondary border ${errors.event_type ? "border-destructive" : "border-border"} focus:border-primary focus:outline-none transition-colors text-foreground`}
                      />
                      {errors.event_type && <p className="text-sm text-destructive mt-1">{errors.event_type}</p>}
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        {language === "RU" ? "Сообщение" : "Message"}
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none transition-colors resize-none text-foreground"
                        rows={4}
                        placeholder={language === "RU" ? "Опишите ваши требования к персоналу..." : "Describe your staff requirements..."}
                      />
                    </div>

                    <Button variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting
                        ? (language === "RU" ? "Отправка..." : "Sending...")
                        : (language === "RU" ? "Отправить заявку" : "Send Request")}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacts;
