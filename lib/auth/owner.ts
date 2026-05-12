import { createClient } from "@/lib/supabase/server";
import { authDevLog, authDevVerbose } from "@/lib/auth/debug";

export type OwnerProfile = { id: string; role: string };

export async function getOwnerSession() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    authDevVerbose("getOwnerSession:no_user", {
      userError: userError?.message ?? null,
      hasUser: Boolean(user),
    });
    return { user: null as null, profile: null as null };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .maybeSingle();

  authDevVerbose("getOwnerSession:profile", {
    userId: user.id,
    profileRole: profile?.role ?? null,
    profileError: profileError?.message ?? null,
    profileErrorCode: profileError?.code ?? null,
  });

  if (profileError || !profile || profile.role !== "owner") {
    authDevLog("getOwnerSession:not_owner", {
      userId: user.id,
      reason: profileError ? "profile_error" : !profile ? "no_profile_row" : "role_not_owner",
      role: profile?.role ?? null,
    });
    return { user, profile: null as null };
  }

  authDevVerbose("getOwnerSession:ok", { userId: user.id, role: profile.role });
  return { user, profile: profile as OwnerProfile };
}
