import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

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
      className="group block p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(20_90%_55%/0.15)]"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
            {description}
          </p>
          {price && (
            <p className="text-primary font-semibold mt-2">
              {price}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
