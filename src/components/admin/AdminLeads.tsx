import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Lead {
  id: string;
  name: string;
  phone: string;
  event_type: string;
  message: string;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  contacted: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  done: "bg-green-500/10 text-green-500 border-green-500/20",
};

const statusLabels: Record<string, string> = {
  new: "Новая",
  contacted: "В работе",
  done: "Закрыта",
};

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads((data as Lead[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("leads").update({ status }).eq("id", id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  if (loading) return <p className="text-muted-foreground">Загрузка заявок...</p>;

  if (leads.length === 0) return <p className="text-muted-foreground">Заявок пока нет</p>;

  return (
    <div className="space-y-4">
      <h2 className="font-heading font-bold text-xl">Заявки ({leads.length})</h2>
      <div className="space-y-3">
        {leads.map((lead) => (
          <div key={lead.id} className="p-4 rounded-xl bg-card border border-border">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                <p className="font-semibold text-foreground">{lead.name}</p>
                <p className="text-sm text-muted-foreground">{lead.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {format(new Date(lead.created_at), "dd.MM.yyyy HH:mm")}
                </span>
                <select
                  value={lead.status}
                  onChange={(e) => updateStatus(lead.id, e.target.value)}
                  className={`text-xs px-2 py-1 rounded-md border cursor-pointer ${statusColors[lead.status] || ""}`}
                >
                  <option value="new">Новая</option>
                  <option value="contacted">В работе</option>
                  <option value="done">Закрыта</option>
                </select>
              </div>
            </div>
            <p className="text-sm text-foreground">
              <span className="text-muted-foreground">Тип: </span>{lead.event_type}
            </p>
            {lead.message && (
              <p className="text-sm text-foreground mt-1">
                <span className="text-muted-foreground">Сообщение: </span>{lead.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLeads;
