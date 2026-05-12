import { createClient } from "@/lib/supabase/server";
import type { GalleryImageRow, ProductRow, ReviewRow, ServiceRow } from "@/lib/db/types";

export type GalleryImagesResult = { data: GalleryImageRow[]; error: string | null };

export async function getGalleryImages(): Promise<GalleryImagesResult> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_images")
    .select("id, image_url, caption, created_at")
    .order("created_at", { ascending: false });

  if (error) return { data: [], error: error.message };
  return { data: (data ?? []) as GalleryImageRow[], error: null };
}

export async function getServices(): Promise<ServiceRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("id, title, description, price, created_at")
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data ?? []) as ServiceRow[];
}

export async function getProducts(): Promise<ProductRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("id, name, description, price, image_url, created_at")
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data ?? []) as ProductRow[];
}

export async function getReviews(): Promise<ReviewRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("id, customer_name, review_text, rating, created_at")
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data ?? []) as ReviewRow[];
}
