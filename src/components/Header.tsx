import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/why-us", label: t("nav.whyUs") },
    { to: "/clients", label: t("nav.clients") },
    { to: "/contacts", label: t("nav.contacts") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-heading text-xl md:text-2xl font-black tracking-tight">
              <span className="text-foreground">EVENT</span>
              <span className="text-primary">WAVE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                <Button
                  variant="nav"
                  className={location.pathname === link.to ? "text-primary" : ""}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Language Toggle & CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === "RU" ? "ENG" : "RU")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/50 bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium"
            >
              <Globe size={16} className="text-primary" />
              <span>{language}</span>
            </button>
            <Link to="/contacts">
              <Button variant="hero" size="lg">
                {t("nav.cta")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === link.to
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => setLanguage(language === "RU" ? "ENG" : "RU")}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border/50 bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium"
                >
                  <Globe size={16} className="text-primary" />
                  <span>{language}</span>
                </button>
                <Link to="/contacts" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                  <Button variant="hero" size="lg" className="w-full">
                    {t("nav.cta")}
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
