import { Link } from "react-router-dom";
import ContactIcons from "./ContactIcons";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link to="/" className="inline-block">
              <span className="font-heading text-4xl font-black tracking-tight">
                <span className="text-foreground">EVENT</span>
                <span className="text-primary">WAVE</span>
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
          © {new Date().getFullYear()} EVENTWAVE. {language === "RU" ? "Все права защищены." : "All rights reserved."}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
