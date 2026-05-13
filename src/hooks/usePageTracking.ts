import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const getSessionId = () => {
  let sid = sessionStorage.getItem("ew_sid");
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem("ew_sid", sid);
  }
  return sid;
};

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Skip tracking for admin routes to keep analytics clean
    if (location.pathname.startsWith("/admin")) return;

    const track = async () => {
      try {
        await supabase.from("page_views").insert({
          page_path: location.pathname,
          referrer: document.referrer || "",
          user_agent: navigator.userAgent || "",
          session_id: getSessionId(),
        });
      } catch (e) {
        // silent fail
      }
    };
    track();
  }, [location.pathname]);
};
