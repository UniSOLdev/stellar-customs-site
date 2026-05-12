import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getOwnerSession } from "@/lib/auth/owner";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, profile } = await getOwnerSession();

  if (!user) {
    redirect("/login?next=/admin");
  }

  if (!profile) {
    redirect("/login?error=forbidden");
  }

  return <AdminShell>{children}</AdminShell>;
}
