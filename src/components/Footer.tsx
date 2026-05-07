import { Link } from "react-router-dom";
import ContactIcons from "./ContactIcons";
import { useLanguage } from "@/contexts/LanguageContext";
import AlexCloudLogo from "./AlexCloudLogo";

const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link to="/" className="inline-block" aria-label="CLOUDSTAFF">
              <AlexCloudLogo size="lg" />
              <span className="block text-xs font-medium text-muted-foreground tracking-[0.3em] uppercase mt-2">
                {language === "RU" ? "Персонал для мероприятий" : "Event Staffing"}
              </span>
            </Link>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <div className="flex justify-center md:justify-end">
              <ContactIcons />
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CLOUDSTAFF. {language === "RU" ? "Все права защищены." : "All rights reserved."}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
