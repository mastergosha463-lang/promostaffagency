import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description?: string;
  canonicalPath?: string;
  noindex?: boolean;
}

/**
 * Lightweight SEO hook: updates <title>, <meta name="description">,
 * <meta property="og:title">, <meta property="og:description">,
 * <link rel="canonical"> and optionally <meta name="robots">.
 */
export const useSEO = ({ title, description, canonicalPath, noindex }: SEOOptions) => {
  useEffect(() => {
    if (title) document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        const [key, val] = selector.replace(/[\[\]"]/g, "").split("=");
        el.setAttribute(key, val);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
      setMeta('meta[name="twitter:description"]', "content", description);
    }
    if (title) {
      setMeta('meta[property="og:title"]', "content", title);
      setMeta('meta[name="twitter:title"]', "content", title);
    }

    if (canonicalPath) {
      const href = `${window.location.origin}${canonicalPath}`;
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = href;
      setMeta('meta[property="og:url"]', "content", href);
    }

    // Robots: only set when explicitly requested; cleanup on unmount so
    // navigating away from a noindex page doesn't leak the directive.
    if (noindex) {
      setMeta('meta[name="robots"]', "content", "noindex, nofollow");
      return () => {
        const robots = document.head.querySelector('meta[name="robots"]');
        if (robots) robots.remove();
      };
    }
  }, [title, description, canonicalPath, noindex]);
};
