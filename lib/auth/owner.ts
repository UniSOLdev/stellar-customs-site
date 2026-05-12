import { createClient } from "@/lib/supabase/server";

export type OwnerProfile = { id: string; role: string };

export async function getOwnerSession() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { user: null as null, profile: null as null };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile || profile.role !== "owner") {
    return { user, profile: null as null };
  }

  return { user, profile: profile as OwnerProfile };
}
