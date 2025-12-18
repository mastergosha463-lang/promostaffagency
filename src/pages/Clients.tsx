import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Building2 } from "lucide-react";

const Clients = () => {
  return (
    <Layout>
      <section className="py-20 min-h-[60vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-6">
              <Building2 className="w-8 h-8" />
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Наши <span className="text-primary">клиенты</span>
            </h1>
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Раздел находится в разработке. Скоро здесь появятся логотипы и отзывы 
              компаний, которые доверяют EVENTWAVE организацию персонала для своих мероприятий.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contacts">
                <Button variant="hero" size="lg">
                  Стать клиентом
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg">
                  На главную
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Clients;
