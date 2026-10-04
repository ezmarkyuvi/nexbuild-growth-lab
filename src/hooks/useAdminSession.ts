import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentAdminSession } from "@/lib/adminAuth";
import type { AdminSession } from "@/lib/adminAuth";

export const useAdminSession = () => {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadSession = async () => {
      const current = await getCurrentAdminSession();
      if (active) {
        setSession(current);
        setLoading(false);
      }
    };

    void loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void loadSession();
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    loading,
    isAuthenticated: Boolean(session),
  };
};
