import { Component, type ErrorInfo, type ReactNode } from "react";
import { reportError } from "@/lib/errorReporter";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    reportError({
      kind: "react_error_boundary",
      message: error.message,
      stack: error.stack ?? null,
      extra: { componentStack: info.componentStack },
    });
  }

  private handleReload = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      if ("caches" in window) caches.keys().then((k) => k.forEach((n) => caches.delete(n)));
    } catch {
      /* ignore */
    }
    const url = new URL(location.href);
    url.searchParams.set("cache_bust", Date.now().toString());
    location.replace(url.toString());
  };

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#fff",
          padding: 24,
          textAlign: "center",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <h1 style={{ fontSize: 22, marginBottom: 12 }}>Что-то пошло не так</h1>
        <p style={{ opacity: 0.75, maxWidth: 380, marginBottom: 20 }}>
          Ошибка автоматически отправлена администратору. Попробуйте обновить страницу со сбросом кэша.
        </p>
        <pre
          style={{
            maxWidth: 480,
            maxHeight: 160,
            overflow: "auto",
            background: "rgba(255,255,255,0.05)",
            padding: 12,
            borderRadius: 8,
            fontSize: 12,
            textAlign: "left",
          }}
        >
          {this.state.error.message}
        </pre>
        <button
          onClick={this.handleReload}
          style={{
            marginTop: 20,
            background: "#ff1f9c",
            color: "#fff",
            border: "none",
            padding: "12px 22px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Обновить и сбросить кэш
        </button>
      </div>
    );
  }
}
