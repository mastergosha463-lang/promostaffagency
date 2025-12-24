import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Client logos
import inditexLogo from "@/assets/clients/inditex.jpg";
import eventousLogo from "@/assets/clients/eventous.jpg";
import flowerbazarLogo from "@/assets/clients/flowerbazar.jpg";
import communityLogo from "@/assets/clients/community.png";
import comrushLogo from "@/assets/clients/comrush.jpg";

interface ClientLogoProps {
  name: string;
  logo: string;
  url?: string;
}

const clients: ClientLogoProps[] = [
  {
    name: "Eventous",
    logo: eventousLogo,
    url: "https://eventous.ru",
  },
  {
    name: "Community Moscow",
    logo: communityLogo,
    url: "https://communitymoscow.ru",
  },
  {
    name: "Community Russia",
    logo: comrushLogo,
    url: "https://www.instagram.com/community.russia",
  },
  {
    name: "Flowerbazar",
    logo: flowerbazarLogo,
    url: "https://flowerbazar.ru",
  },
  {
    name: "Inditex",
    logo: inditexLogo,
  },
];

const ClientLogo = ({ name, logo, url }: ClientLogoProps) => {
  const content = (
    <div className="group relative aspect-video bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(20_90%_55%/0.15)]">
      <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="w-full h-full flex items-center justify-center p-6">
        <img
          src={logo}
          alt={`${name} - клиент EVENTWAVE`}
          className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-foreground font-medium text-center">{name}</p>
      </div>
    </div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
};

const Clients = () => {
  return (
    <Layout>
      <section className="py-20 min-h-[60vh]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Наши <span className="text-primary">клиенты</span>
            </h1>
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Компании, которые доверяют EVENTWAVE организацию персонала для своих мероприятий
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {clients.map((client) => (
              <ClientLogo key={client.name} {...client} />
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-6">
              Хотите стать нашим клиентом?
            </p>
            <Link to="/contacts">
              <Button variant="hero" size="lg">
                Оставить заявку
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Clients;
