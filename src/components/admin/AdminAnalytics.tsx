import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, PieChart, Pie, Cell, FunnelChart, Funnel,
  LabelList
} from "recharts";
import { format, subDays } from "date-fns";
import { TrendingUp, Users, Eye, MousePointerClick } from "lucide-react";

interface PageViewStat { date: string; count: number; }
interface PageStat { page_path: string; count: number; }
interface ReferrerStat { source: string; count: number; }
interface HourStat { hour: string; count: number; }
interface LeadFunnel { name: string; value: number; fill: string; }

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "#f59e0b", "#10b981", "#6366f1"];

const parseReferrer = (ref: string): string => {
  if (!ref || ref === "") return "Прямой переход";
  try {
    const url = new URL(ref);
    const host = url.hostname.replace("www.", "");
    if (host.includes("google")) return "Google";
    if (host.includes("yandex")) return "Яндекс";
    if (host.includes("instagram")) return "Instagram";
    if (host.includes("telegram")) return "Telegram";
    if (host.includes("vk.com")) return "ВКонтакте";
    if (host.includes("facebook") || host.includes("fb.")) return "Facebook";
    return host;
  } catch {
    return "Прямой переход";
  }
};

const StatCard = ({ icon: Icon, label, value, sub }: { icon: any; label: string; value: string | number; sub?: string }) => (
  <div className="p-4 rounded-xl bg-card border border-border">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
  </div>
);

const AdminAnalytics = () => {
  const [dailyViews, setDailyViews] = useState<PageViewStat[]>([]);
  const [pageStats, setPageStats] = useState<PageStat[]>([]);
  const [referrerStats, setReferrerStats] = useState<ReferrerStat[]>([]);
  const [hourStats, setHourStats] = useState<HourStat[]>([]);
  const [leadFunnel, setLeadFunnel] = useState<LeadFunnel[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [uniqueSessions, setUniqueSessions] = useState(0);
  const [totalLeads, setTotalLeads] = useState(0);
  const [conversionRate, setConversionRate] = useState("0");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const thirtyDaysAgo = subDays(new Date(), 30).toISOString();

      // Page views
      const { data: views } = await supabase
        .from("page_views")
        .select("page_path, session_id, created_at, referrer")
        .gte("created_at", thirtyDaysAgo)
        .order("created_at", { ascending: true });

      // Leads
      const { data: leads } = await supabase
        .from("leads")
        .select("status, created_at")
        .gte("created_at", thirtyDaysAgo);

      if (views) {
        setTotalViews(views.length);

        const sessions = new Set(views.map((v: any) => v.session_id).filter(Boolean));
        setUniqueSessions(sessions.size);

        // Daily
        const dailyMap: Record<string, number> = {};
        views.forEach((v: any) => {
          const day = format(new Date(v.created_at), "dd.MM");
          dailyMap[day] = (dailyMap[day] || 0) + 1;
        });
        setDailyViews(Object.entries(dailyMap).map(([date, count]) => ({ date, count })));

        // Pages
        const pageMap: Record<string, number> = {};
        views.forEach((v: any) => { pageMap[v.page_path] = (pageMap[v.page_path] || 0) + 1; });
        setPageStats(
          Object.entries(pageMap)
            .map(([page_path, count]) => ({ page_path, count }))
            .sort((a, b) => b.count - a.count)
        );

        // Referrers
        const refMap: Record<string, number> = {};
        views.forEach((v: any) => {
          const src = parseReferrer(v.referrer || "");
          refMap[src] = (refMap[src] || 0) + 1;
        });
        setReferrerStats(
          Object.entries(refMap)
            .map(([source, count]) => ({ source, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 6)
        );

        // Hours
        const hourMap: Record<number, number> = {};
        views.forEach((v: any) => {
          const h = new Date(v.created_at).getHours();
          hourMap[h] = (hourMap[h] || 0) + 1;
        });
        setHourStats(
          Array.from({ length: 24 }, (_, i) => ({
            hour: `${i}:00`,
            count: hourMap[i] || 0,
          }))
        );
      }

      if (leads) {
        setTotalLeads(leads.length);

        const newLeads = leads.filter((l: any) => l.status === "new").length;
        const contacted = leads.filter((l: any) => l.status === "contacted").length;
        const done = leads.filter((l: any) => l.status === "done").length;

        setLeadFunnel([
          { name: "Новые", value: leads.length, fill: "hsl(var(--primary))" },
          { name: "В работе", value: contacted + done, fill: "#f59e0b" },
          { name: "Закрыты", value: done, fill: "#10b981" },
        ]);

        // Conversion: sessions → leads
        if (uniqueSessions > 0) {
          setConversionRate(((leads.length / (uniqueSessions || 1)) * 100).toFixed(1));
        }
      }

      setLoading(false);
    };

    fetchAll();
  }, []);

  // Recalculate conversion after both states set
  useEffect(() => {
    if (uniqueSessions > 0 && totalLeads > 0) {
      setConversionRate(((totalLeads / uniqueSessions) * 100).toFixed(1));
    }
  }, [uniqueSessions, totalLeads]);

  if (loading) return <p className="text-muted-foreground">Загрузка аналитики...</p>;

  return (
    <div className="space-y-8">
      <h2 className="font-heading font-bold text-xl">Аналитика (последние 30 дней)</h2>

      {/* KPI карточки */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Eye} label="Просмотров" value={totalViews} />
        <StatCard icon={Users} label="Уникальных сессий" value={uniqueSessions} />
        <StatCard icon={MousePointerClick} label="Заявок" value={totalLeads} sub="за 30 дней" />
        <StatCard icon={TrendingUp} label="Конверсия" value={`${conversionRate}%`} sub="сессий → заявок" />
      </div>

      {/* График просмотров */}
      {dailyViews.length > 0 && (
        <div className="p-4 rounded-xl bg-card border border-border">
          <h3 className="font-heading font-bold mb-4">Просмотры по дням</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dailyViews}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" fontSize={11} stroke="hsl(var(--muted-foreground))" />
              <YAxis fontSize={11} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Просмотры" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Воронка лидов + Источники */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* Воронка лидов */}
        <div className="p-4 rounded-xl bg-card border border-border">
          <h3 className="font-heading font-bold mb-4">Воронка заявок</h3>
          {leadFunnel.length > 0 && leadFunnel[0].value > 0 ? (
            <div className="space-y-3">
              {leadFunnel.map((stage, i) => (
                <div key={stage.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{stage.name}</span>
                    <span className="font-semibold" style={{ color: stage.fill }}>{stage.value}</span>
                  </div>
                  <div className="h-7 rounded-lg bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-lg transition-all duration-500 flex items-center pl-3"
                      style={{
                        width: `${leadFunnel[0].value > 0 ? (stage.value / leadFunnel[0].value) * 100 : 0}%`,
                        background: stage.fill,
                        minWidth: stage.value > 0 ? "40px" : "0",
                      }}
                    >
                      {stage.value > 0 && (
                        <span className="text-xs text-white font-semibold">
                          {leadFunnel[0].value > 0 ? Math.round((stage.value / leadFunnel[0].value) * 100) : 0}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">Заявок пока нет</p>
          )}
        </div>

        {/* Источники трафика */}
        <div className="p-4 rounded-xl bg-card border border-border">
          <h3 className="font-heading font-bold mb-4">Источники трафика</h3>
          {referrerStats.length > 0 ? (
            <div className="space-y-2">
              {referrerStats.map((r, i) => (
                <div key={r.source} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground truncate">{r.source}</span>
                      <span className="font-semibold text-primary ml-2 flex-shrink-0">{r.count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(r.count / (referrerStats[0]?.count || 1)) * 100}%`,
                          background: COLORS[i % COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">Нет данных об источниках</p>
          )}
        </div>
      </div>

      {/* Активность по часам */}
      <div className="p-4 rounded-xl bg-card border border-border">
        <h3 className="font-heading font-bold mb-1">Активность по часам</h3>
        <p className="text-xs text-muted-foreground mb-4">Когда посетители чаще всего заходят на сайт</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={hourStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="hour"
              fontSize={10}
              stroke="hsl(var(--muted-foreground))"
              interval={2}
              tickFormatter={(v) => v.replace(":00", "h")}
            />
            <YAxis fontSize={10} stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value) => [value, "Визиты"]}
            />
            <Bar dataKey="count" fill="hsl(var(--accent))" radius={[3, 3, 0, 0]} name="Визиты" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Топ страниц */}
      <div className="p-4 rounded-xl bg-card border border-border">
        <h3 className="font-heading font-bold mb-4">Популярные страницы</h3>
        <div className="space-y-2">
          {pageStats.map((p, i) => (
            <div key={p.page_path} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
              <span className="text-xs text-muted-foreground w-5 text-center">{i + 1}</span>
              <span className="text-sm text-foreground flex-1">{p.page_path}</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(p.count / (pageStats[0]?.count || 1)) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-primary w-8 text-right">{p.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
