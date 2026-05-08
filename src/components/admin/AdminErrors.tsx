import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle } from "lucide-react";

interface ClientError {
  id: string;
  created_at: string;
  kind: string;
  message: string | null;
  source: string | null;
  lineno: number | null;
  colno: number | null;
  stack: string | null;
  page_path: string | null;
  user_agent: string | null;
  url: string | null;
  extra: Record<string, unknown> | null;
}

const AdminErrors = () => {
  const [errors, setErrors] = useState<ClientError[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("client_errors")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    setErrors((data ?? []) as ClientError[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-primary" />
          Ошибки клиента ({errors.length})
        </h2>
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Обновить
        </Button>
      </div>

      {!loading && errors.length === 0 && (
        <p className="text-muted-foreground text-sm">Ошибок не зафиксировано.</p>
      )}

      <div className="space-y-2">
        {errors.map((err) => {
          const isOpen = expanded === err.id;
          return (
            <div key={err.id} className="border border-border rounded-lg bg-card">
              <button
                onClick={() => setExpanded(isOpen ? null : err.id)}
                className="w-full text-left p-3 flex items-start justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono">
                      {err.kind}
                    </span>
                    <span>{new Date(err.created_at).toLocaleString("ru-RU")}</span>
                    {err.page_path && <span className="truncate">· {err.page_path}</span>}
                  </div>
                  <p className="text-sm mt-1 truncate">{err.message ?? "—"}</p>
                </div>
              </button>
              {isOpen && (
                <div className="px-3 pb-3 space-y-2 text-xs">
                  {err.source && (
                    <div>
                      <span className="text-muted-foreground">Источник:</span>{" "}
                      <code className="break-all">{err.source}</code>
                      {err.lineno != null && <span> :{err.lineno}:{err.colno}</span>}
                    </div>
                  )}
                  {err.url && (
                    <div>
                      <span className="text-muted-foreground">URL:</span>{" "}
                      <code className="break-all">{err.url}</code>
                    </div>
                  )}
                  {err.user_agent && (
                    <div className="text-muted-foreground break-all">UA: {err.user_agent}</div>
                  )}
                  {err.stack && (
                    <pre className="bg-muted/50 p-2 rounded overflow-auto max-h-64 whitespace-pre-wrap">
                      {err.stack}
                    </pre>
                  )}
                  {err.extra && (
                    <pre className="bg-muted/50 p-2 rounded overflow-auto max-h-40">
                      {JSON.stringify(err.extra, null, 2)}
                    </pre>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminErrors;
