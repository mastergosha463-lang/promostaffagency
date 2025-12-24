import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

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
  description?: string;
  isActive?: boolean;
}

const clients: ClientLogoProps[] = [
  {
    name: "Eventous",
    logo: eventousLogo,
    url: "https://eventous.ru",
    description: "Профессиональное event-агентство полного цикла в Москве",
  },
  {
    name: "Community Moscow",
    logo: communityLogo,
    url: "https://communitymoscow.ru",
    description: "Ресторан с авторской кухней и уникальной атмосферой",
  },
  {
    name: "Community Russia",
    logo: comrushLogo,
    url: "https://www.instagram.com/community.russia",
    description: "Сеть ресторанов Community в России",
  },
  {
    name: "Flowerbazar",
    logo: flowerbazarLogo,
    url: "https://flowerbazar.ru",
    description: "Цветочный магазин с доставкой по Москве",
  },
  {
    name: "Inditex",
    logo: inditexLogo,
    description: "Inditex — крупнейший в мире ритейлер одежды, основанный Амансио Ортегой в 1985 году в Испании. Компания владеет такими брендами как Zara, Pull&Bear, Massimo Dutti, Bershka, Stradivarius, Oysho и другими.",
  },
];

const ClientLogo = ({ name, logo, url, isActive = true }: ClientLogoProps) => {
  const content = (
    <div 
      className={`group relative aspect-video bg-card rounded-xl border overflow-hidden transition-all duration-500 ${
        isActive 
          ? "border-primary/50 shadow-[0_0_30px_hsl(20_90%_55%/0.2)] scale-100 opacity-100" 
          : "border-border/30 scale-90 opacity-30"
      }`}
    >
      <div className="w-full h-full flex items-center justify-center p-8">
        <img
          src={logo}
          alt={`${name} - клиент EVENTWAVE`}
          className={`max-w-full max-h-full object-contain transition-all duration-500 ${
            isActive ? "grayscale-0" : "grayscale"
          }`}
        />
      </div>
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent p-4">
          <p className="text-foreground font-medium text-center">{name}</p>
        </div>
      )}
    </div>
  );

  if (url && isActive) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
};

const Clients = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

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

          <div className="max-w-5xl mx-auto relative">
            {/* Fade overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {clients.map((client, index) => (
                  <div 
                    key={client.name} 
                    className="flex-[0_0_80%] md:flex-[0_0_50%] min-w-0 px-4 transition-all duration-500"
                  >
                    <ClientLogo {...client} isActive={index === selectedIndex} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {clients.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex 
                      ? "w-8 bg-primary" 
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
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
