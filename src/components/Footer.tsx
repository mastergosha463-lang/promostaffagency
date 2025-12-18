import { Link } from "react-router-dom";
import ContactIcons from "./ContactIcons";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="font-heading text-2xl font-black tracking-tight">
                <span className="text-foreground">EVENT</span>
                <span className="text-primary">WAVE</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Надёжный персонал для мероприятий любого масштаба в Москве. 
              Более 50 успешных проектов.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-bold text-foreground mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/staff/helpers" className="text-muted-foreground hover:text-primary transition-colors">Хелперы</Link></li>
              <li><Link to="/staff/promo" className="text-muted-foreground hover:text-primary transition-colors">Промо-персонал</Link></li>
              <li><Link to="/staff/hostess" className="text-muted-foreground hover:text-primary transition-colors">Хостес</Link></li>
              <li><Link to="/staff/installers" className="text-muted-foreground hover:text-primary transition-colors">Монтажники</Link></li>
              <li><Link to="/staff/catering" className="text-muted-foreground hover:text-primary transition-colors">Кейтеринг</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-foreground mb-4">Контакты</h4>
            <p className="text-muted-foreground text-sm mb-2">Руслан</p>
            <a 
              href="tel:+79257420436" 
              className="text-primary font-medium hover:underline"
            >
              +7 (925) 742-04-36
            </a>
            <div className="mt-4">
              <ContactIcons />
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} EVENTWAVE. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
