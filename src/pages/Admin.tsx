import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, FileText, BarChart3, Settings } from "lucide-react";
import AdminLeads from "@/components/admin/AdminLeads";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminServices from "@/components/admin/AdminServices";

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/admin-login");
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin");

      if (!roles || roles.length === 0) {
        navigate("/admin-login");
        return;
      }
      setIsAdmin(true);
      setLoading(false);
    };
    checkAdmin();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 flex items-center justify-between h-14">
          <h1 className="font-heading font-bold">
            <span className="text-foreground">EVENT</span>
            <span className="text-primary">WAVE</span>
            <span className="text-muted-foreground text-sm ml-2">Admin</span>
          </h1>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Выйти
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="leads">
          <TabsList className="mb-6">
            <TabsTrigger value="leads" className="gap-2">
              <FileText className="w-4 h-4" />
              Заявки
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="services" className="gap-2">
              <Settings className="w-4 h-4" />
              Услуги
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <AdminLeads />
          </TabsContent>
          <TabsContent value="analytics">
            <AdminAnalytics />
          </TabsContent>
          <TabsContent value="services">
            <AdminServices />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
