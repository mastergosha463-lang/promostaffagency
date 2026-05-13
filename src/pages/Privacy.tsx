import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSEO } from "@/hooks/useSEO";

const Privacy = () => {
  const { language } = useLanguage();
  useSEO({
    title:
      language === "RU"
        ? "Политика конфиденциальности — EVENTWAVE"
        : "Privacy Policy — EVENTWAVE",
    description:
      language === "RU"
        ? "Политика конфиденциальности EVENTWAVE. Как мы собираем, используем и защищаем ваши персональные данные."
        : "EVENTWAVE Privacy Policy. How we collect, use and protect your personal data.",
    canonicalPath: "/privacy",
  });

  const isRu = language === "RU";

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-foreground">
            {isRu ? "Политика конфиденциальности" : "Privacy Policy"}
          </h1>

          <div className="space-y-6 text-muted-foreground">
            <p>
              {isRu
                ? "Настоящая Политика конфиденциальности описывает, как EVENTWAVE собирает, использует и защищает персональные данные пользователей."
                : "This Privacy Policy describes how EVENTWAVE collects, uses and protects users' personal data."}
            </p>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                {isRu ? "1. Сбор информации" : "1. Information Collection"}
              </h2>
              <p>
                {isRu
                  ? "Мы собираем только ту информацию, которую вы добровольно предоставляете через форму заявки: имя, номер телефона, тип мероприятия и дополнительное сообщение."
                  : "We collect only the information you voluntarily provide through the request form: name, phone number, event type and additional message."}
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                {isRu ? "2. Использование данных" : "2. Use of Data"}
              </h2>
              <p>
                {isRu
                  ? "Предоставленные данные используются исключительно для связи с вами по поводу вашей заявки и подбора персонала для мероприятия."
                  : "The provided data is used solely to contact you regarding your request and staffing for the event."}
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                {isRu ? "3. Защита данных" : "3. Data Protection"}
              </h2>
              <p>
                {isRu
                  ? "Мы принимаем разумные меры для защиты ваших персональных данных от несанкционированного доступа, изменения или уничтожения."
                  : "We take reasonable measures to protect your personal data from unauthorized access, alteration or destruction."}
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                {isRu ? "4. Передача третьим лицам" : "4. Third Party Disclosure"}
              </h2>
              <p>
                {isRu
                  ? "Мы не передаем ваши персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством РФ."
                  : "We do not transfer your personal data to third parties, except as required by the laws of the Russian Federation."}
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                {isRu ? "5. Согласие" : "5. Consent"}
              </h2>
              <p>
                {isRu
                  ? "Отправляя форму заявки, вы даете согласие на обработку ваших персональных данных в соответствии с настоящей Политикой конфиденциальности."
                  : "By submitting the request form, you consent to the processing of your personal data in accordance with this Privacy Policy."}
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                {isRu ? "6. Контакты" : "6. Contact"}
              </h2>
              <p>
                {isRu
                  ? "Если у вас есть вопросы по поводу Политики конфиденциальности, свяжитесь с нами через страницу Сотрудничество."
                  : "If you have any questions about the Privacy Policy, please contact us through the Cooperation page."}
              </p>
            </div>

            <p className="text-sm pt-4 border-t border-border">
              © {new Date().getFullYear()} EVENTWAVE. {isRu ? "Все права защищены." : "All rights reserved."}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
