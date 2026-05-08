import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { installErrorReporter } from "./lib/errorReporter";
import { ErrorBoundary } from "./components/ErrorBoundary";

installErrorReporter();

try {
  createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>,
  );
} catch (error) {
  (window as any).__reportError?.({
    kind: "mount_error",
    message: (error as Error)?.message,
    stack: (error as Error)?.stack ?? null,
  });
  throw error;
}

// Hide pre-boot fallback once React mounts
if (typeof window !== "undefined" && (window as any).__hideBootFallback) {
  requestAnimationFrame(() => (window as any).__hideBootFallback());
}

