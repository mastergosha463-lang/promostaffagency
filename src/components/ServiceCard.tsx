import { Link } from "react-router-dom";
import { LucideIcon, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  price?: string;
}

const ServiceCard = ({ title, description, icon: Icon, to, price }: ServiceCardProps) => {
  return (
    <Link 
      to={to}
      className="group block p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-500 hover:shadow-[0_8px_40px_hsl(35_85%_55%/0.1)]"
    >
      <div className="flex flex-col gap-4">
        <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm mt-2 leading-relaxed line-clamp-2">
            {description}
          </p>
          {price && (
            <p className="text-primary font-semibold mt-3">{price}</p>
          )}
        </div>
        <div className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Подробнее</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
