import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Hide pre-boot fallback once React mounts
if (typeof window !== "undefined" && (window as any).__hideBootFallback) {
  requestAnimationFrame(() => (window as any).__hideBootFallback());
}

