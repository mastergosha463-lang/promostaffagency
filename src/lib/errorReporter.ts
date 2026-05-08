// Lightweight client-side error reporter.
// Captures runtime/asset/promise errors and sends them to public.client_errors.
// Works even before React mounts (used via global handlers in main.tsx + index.html buffer).

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
const ENDPOINT = `${SUPABASE_URL}/rest/v1/client_errors`;

type ErrorPayload = {
  kind: string;
  message?: string | null;
  source?: string | null;
  lineno?: number | null;
  colno?: number | null;
  stack?: string | null;
  extra?: Record<string, unknown> | null;
};

const seen = new Set<string>();

function send(payload: ErrorPayload) {
  try {
    const key = `${payload.kind}|${payload.message}|${payload.source}|${payload.lineno}`;
    if (seen.has(key)) return;
    seen.add(key);
    if (seen.size > 50) return; // hard cap

    const body = JSON.stringify({
      ...payload,
      page_path: location.pathname + location.search,
      user_agent: navigator.userAgent,
      url: location.href,
    });

    const headers = {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: "return=minimal",
    };

    // Prefer fetch with keepalive so it survives page unloads.
    if (typeof fetch === "function") {
      fetch(ENDPOINT, { method: "POST", headers, body, keepalive: true }).catch(() => {});
    } else if ("sendBeacon" in navigator) {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "application/json" }));
    }
  } catch {
    /* swallow — never let logger break the app */
  }
}

export function reportError(input: Partial<ErrorPayload> & { kind: string }) {
  send({ message: null, source: null, lineno: null, colno: null, stack: null, extra: null, ...input });
}

let installed = false;
export function installErrorReporter() {
  if (installed || typeof window === "undefined") return;
  installed = true;

  window.addEventListener(
    "error",
    (event: ErrorEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "SCRIPT" || tag === "LINK" || tag === "IMG") {
        const url = (target as HTMLScriptElement).src || (target as HTMLLinkElement).href || "";
        send({
          kind: "asset_error",
          message: `Failed to load ${tag}`,
          source: url,
          lineno: null,
          colno: null,
          stack: null,
          extra: { tag },
        });
        return;
      }
      send({
        kind: "runtime_error",
        message: event.message,
        source: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack ?? null,
        extra: null,
      });
    },
    true,
  );

  window.addEventListener("unhandledrejection", (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    send({
      kind: "unhandled_rejection",
      message: typeof reason === "string" ? reason : reason?.message ?? "Unhandled rejection",
      stack: reason?.stack ?? null,
      source: null,
      lineno: null,
      colno: null,
      extra: null,
    });
  });

  // Drain any errors captured before the bundle loaded.
  const buffer = (window as unknown as { __errorBuffer?: ErrorPayload[] }).__errorBuffer;
  if (Array.isArray(buffer)) {
    buffer.splice(0).forEach((entry) => send(entry));
  }
  (window as unknown as { __reportError?: typeof reportError }).__reportError = reportError;
}
