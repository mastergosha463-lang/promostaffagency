import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { format, subDays, startOfDay } from "date-fns";

interface PageViewStat {
  date: string;
  count: number;
}

interface PageStat {
  page_path: string;
  count: number;
}

const AdminAnalytics = () => {
  const [dailyViews, setDailyViews] = useState<PageViewStat[]>([]);
  const [pageStats, setPageStats] = useState<PageStat[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [uniqueSessions, setUniqueSessions] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const thirtyDaysAgo = subDays(new Date(), 30).toISOString();

      // Get all page views for last 30 days
      const { data: views } = await supabase
        .from("page_views")
        .select("page_path, session_id, created_at")
        .gte("created_at", thirtyDaysAgo)
        .order("created_at", { ascending: true });

      if (views) {
        setTotalViews(views.length);

        // Unique sessions
        const sessions = new Set(views.map((v: any) => v.session_id).filter(Boolean));
        setUniqueSessions(sessions.size);

        // Daily aggregation
        const dailyMap: Record<string, number> = {};
        views.forEach((v: any) => {
          const day = format(new Date(v.created_at), "dd.MM");
          dailyMap[day] = (dailyMap[day] || 0) + 1;
        });
        setDailyViews(Object.entries(dailyMap).map(([date, count]) => ({ date, count })));

        // Page stats
        const pageMap: Record<string, number> = {};
        views.forEach((v: any) => {
          pageMap[v.page_path] = (pageMap[v.page_path] || 0) + 1;
        });
        setPageStats(
          Object.entries(pageMap)
            .map(([page_path, count]) => ({ page_path, count }))
            .sort((a, b) => b.count - a.count)
        );
      }

      setLoading(false);
    };
    fetchAnalytics();
  }, []);

  if (loading) return <p className="text-muted-foreground">Загрузка аналитики...</p>;

  return (
    <div className="space-y-6">
      <h2 className="font-heading font-bold text-xl">Аналитика (последние 30 дней)</h2>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <p className="text-2xl font-bold text-primary">{totalViews}</p>
          <p className="text-sm text-muted-foreground">Просмотров</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <p className="text-2xl font-bold text-primary">{uniqueSessions}</p>
          <p className="text-sm text-muted-foreground">Уникальных сессий</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <p className="text-2xl font-bold text-primary">{pageStats.length}</p>
          <p className="text-sm text-muted-foreground">Страниц</p>
        </div>
      </div>

      {/* Chart */}
      {dailyViews.length > 0 && (
        <div className="p-4 rounded-xl bg-card border border-border">
          <h3 className="font-heading font-bold mb-4">Просмотры по дням</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailyViews}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" fontSize={12} stroke="hsl(var(--muted-foreground))" />
              <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Top Pages */}
      <div className="p-4 rounded-xl bg-card border border-border">
        <h3 className="font-heading font-bold mb-4">Популярные страницы</h3>
        <div className="space-y-2">
          {pageStats.map((p) => (
            <div key={p.page_path} className="flex justify-between items-center py-2 border-b border-border last:border-0">
              <span className="text-sm text-foreground">{p.page_path}</span>
              <span className="text-sm font-semibold text-primary">{p.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
