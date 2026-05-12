import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getOwnerSession } from "@/lib/auth/owner";
import { AdminShell } from "@/components/admin/AdminShell";
import { authDevLog, authDevVerbose } from "@/lib/auth/debug";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, profile } = await getOwnerSession();

  if (!user) {
    authDevLog("admin_layout:redirect", { reason: "no_user", to: "/login?next=/admin" });
    redirect("/login?next=/admin");
  }

  if (!profile) {
    authDevLog("admin_layout:redirect", { reason: "not_owner_or_no_profile", userId: user.id });
    redirect("/login?error=forbidden");
  }

  authDevVerbose("admin_layout:render", { userId: user.id, role: profile.role });
  return <AdminShell>{children}</AdminShell>;
}
