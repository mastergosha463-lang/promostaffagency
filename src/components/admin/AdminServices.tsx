import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil, Save, X } from "lucide-react";

interface Service {
  id: string;
  slug: string;
  title_ru: string;
  title_en: string;
  description_ru: string;
  description_en: string;
  duties_ru: string[];
  duties_en: string[];
  events_ru: string[];
  events_en: string[];
  icon: string;
  sort_order: number;
  is_active: boolean;
}

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Service>>({});

  const fetchServices = async () => {
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });
    setServices((data as Service[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const startEdit = (service: Service) => {
    setEditingId(service.id);
    setEditData(service);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = async () => {
    if (!editingId) return;
    const { error } = await supabase
      .from("services")
      .update({
        title_ru: editData.title_ru,
        title_en: editData.title_en,
        description_ru: editData.description_ru,
        description_en: editData.description_en,
        is_active: editData.is_active,
        sort_order: editData.sort_order,
      })
      .eq("id", editingId);

    if (error) {
      toast.error("Ошибка сохранения");
    } else {
      toast.success("Сохранено");
      fetchServices();
      cancelEdit();
    }
  };

  if (loading) return <p className="text-muted-foreground">Загрузка услуг...</p>;

  return (
    <div className="space-y-4">
      <h2 className="font-heading font-bold text-xl">Управление услугами ({services.length})</h2>

      {services.length === 0 && (
        <p className="text-muted-foreground">Услуги не найдены. Данные ещё не загружены в базу.</p>
      )}

      <div className="space-y-3">
        {services.map((service) => (
          <div key={service.id} className="p-4 rounded-xl bg-card border border-border">
            {editingId === service.id ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Название (RU)</label>
                    <input
                      value={editData.title_ru || ""}
                      onChange={(e) => setEditData((p) => ({ ...p, title_ru: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Название (EN)</label>
                    <input
                      value={editData.title_en || ""}
                      onChange={(e) => setEditData((p) => ({ ...p, title_en: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Описание (RU)</label>
                  <textarea
                    value={editData.description_ru || ""}
                    onChange={(e) => setEditData((p) => ({ ...p, description_ru: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm resize-none"
                    rows={2}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={editData.is_active ?? true}
                      onChange={(e) => setEditData((p) => ({ ...p, is_active: e.target.checked }))}
                    />
                    Активна
                  </label>
                  <div className="flex-1" />
                  <Button size="sm" variant="ghost" onClick={cancelEdit}>
                    <X className="w-4 h-4 mr-1" />
                    Отмена
                  </Button>
                  <Button size="sm" onClick={saveEdit}>
                    <Save className="w-4 h-4 mr-1" />
                    Сохранить
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">
                    {service.title_ru}
                    {!service.is_active && (
                      <span className="ml-2 text-xs text-muted-foreground">(скрыта)</span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-1">{service.description_ru}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => startEdit(service)}>
                  <Pencil className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
