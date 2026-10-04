import { supabase } from "@/integrations/supabase/client";
import type { AdminRole } from "@/lib/cms/types";

export type AdminSession = {
  userId: string;
  email: string | null;
  role: AdminRole;
};

export const getAdminRole = async (userId: string): Promise<AdminRole | null> => {
  const { data, error } = await supabase
    .from("admin_users")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data?.role) {
    return null;
  }

  return data.role;
};

export const getCurrentAdminSession = async (): Promise<AdminSession | null> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return null;
  }

  const role = await getAdminRole(session.user.id);
  if (!role) {
    return null;
  }

  return {
    userId: session.user.id,
    email: session.user.email ?? null,
    role,
  };
};

export const adminLogin = async (email: string, password: string): Promise<AdminSession> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    throw new Error(error?.message || "Unable to sign in.");
  }

  const role = await getAdminRole(data.user.id);
  if (!role) {
    await supabase.auth.signOut();
    throw new Error("This user is not allowed to access the admin panel.");
  }

  return {
    userId: data.user.id,
    email: data.user.email ?? null,
    role,
  };
};

export const adminLogout = async () => {
  await supabase.auth.signOut();
};
