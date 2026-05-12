import { createClient } from "@/lib/supabase/server";
import type { GalleryImageRow } from "@/lib/db/types";
import { GalleryAdminClient } from "@/components/admin/GalleryAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase
    .from("gallery_images")
    .select("id, image_url, caption, created_at")
    .order("created_at", { ascending: false });

  return (
    <GalleryAdminClient
      initial={(data ?? []) as GalleryImageRow[]}
      queryError={typeof sp.error === "string" ? sp.error : undefined}
    />
  );
}
