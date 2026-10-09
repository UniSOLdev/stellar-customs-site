"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Buffer } from "node:buffer";
import { getOwnerSession } from "@/lib/auth/owner";
import { createClient } from "@/lib/supabase/server";
import { pathInBucketFromPublicUrl } from "@/lib/storage-path";

function safeNextPath(raw: string | null): string {
  if (!raw || !raw.startsWith("/")) return "/admin";
  if (raw.startsWith("//")) return "/admin";
  return raw;
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = safeNextPath(String(formData.get("next") ?? ""));

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(
      `/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`
    );
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin");
  redirect(next);
}

export async function createBookingAction(
  _prev: { ok: boolean; message?: string } | null,
  formData: FormData
): Promise<{ ok: boolean; message?: string }> {
  const supabase = await createClient();
  const issue = String(formData.get("notes") ?? formData.get("message") ?? "").trim() || null;
  const sms = formData.get("sms_callback_consent") === "yes";
  const photo = formData.get("photo");
  let extras = "";
  extras += sms ? "\nSMS callback: consented." : "\nSMS callback: not consented.";
  if (photo instanceof File && photo.size > 0) {
    extras += `\nPhoto (pending upload): ${photo.name}`;
  }
  const notesCombined = [issue, extras.trim()].filter(Boolean).join("\n") || null;

  const payload = {
    name: String(formData.get("name") ?? "").trim() || null,
    phone: String(formData.get("phone") ?? "").trim() || null,
    email: String(formData.get("email") ?? "").trim() || null,
    vehicle: String(formData.get("vehicle") ?? "").trim() || null,
    service: String(formData.get("service") ?? "").trim() || null,
    date: String(formData.get("date") ?? "").trim() || null,
    notes: notesCombined,
  };

  const { error } = await supabase.from("bookings").insert(payload);

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/admin/bookings");
  return { ok: true };
}

/** Primary quote flow — stores rich context in notes + vehicle/service fields. */
export async function createQuoteAction(
  _prev: { ok: boolean; message?: string } | null,
  formData: FormData
): Promise<{ ok: boolean; message?: string }> {
  const supabase = await createClient();
  const services = formData.getAll("services").map((s) => String(s)).filter(Boolean);
  if (services.length === 0) {
    return { ok: false, message: "Select at least one service." };
  }

  const year = String(formData.get("vehicle_year") ?? "").trim();
  const make = String(formData.get("vehicle_make") ?? "").trim();
  const model = String(formData.get("vehicle_model") ?? "").trim();
  const vehicle = [year, make, model].filter(Boolean).join(" ") || null;

  const city = String(formData.get("city") ?? "").trim();
  const zip = String(formData.get("zip") ?? "").trim();
  const size = String(formData.get("vehicle_size") ?? "").trim();
  const condition = String(formData.get("condition") ?? "").trim();
  const fulfillment = String(formData.get("fulfillment") ?? "").trim();
  const notesRaw = String(formData.get("notes") ?? "").trim();

  const sms = formData.get("sms_callback_consent") === "yes";
  const photos = formData.getAll("photos");
  const photoNames: string[] = [];
  for (const p of photos) {
    if (p instanceof File && p.size > 0) photoNames.push(p.name);
  }
  // Also support single "photo" from legacy booking form
  const legacyPhoto = formData.get("photo");
  if (legacyPhoto instanceof File && legacyPhoto.size > 0) {
    photoNames.push(legacyPhoto.name);
  }

  const metaLines = [
    `City/ZIP: ${city}${zip ? ` ${zip}` : ""}`,
    `Vehicle size: ${size}`,
    `Condition: ${condition}`,
    `Fulfillment: ${fulfillment}`,
    photoNames.length ? `Photos (pending upload): ${photoNames.join(", ")}` : null,
    sms ? "SMS callback: consented." : "SMS callback: not consented.",
  ].filter(Boolean);

  const notesCombined = [notesRaw, ...metaLines].filter(Boolean).join("\n") || null;

  const payload = {
    name: String(formData.get("name") ?? "").trim() || null,
    phone: String(formData.get("phone") ?? "").trim() || null,
    email: String(formData.get("email") ?? "").trim() || null,
    vehicle,
    service: services.join(", "),
    date: String(formData.get("date") ?? "").trim() || null,
    notes: notesCombined,
  };

  const { error } = await supabase.from("bookings").insert(payload);

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/admin/bookings");
  return { ok: true };
}

async function requireOwner() {
  const { profile } = await getOwnerSession();
  if (!profile) redirect("/login?error=forbidden");
}

export async function insertGalleryImageAction(
  formData: FormData
): Promise<{ ok: boolean; message?: string }> {
  await requireOwner();
  const image_url = String(formData.get("image_url") ?? "").trim();
  const captionRaw = formData.get("caption");
  const caption = captionRaw != null && String(captionRaw).trim() ? String(captionRaw).trim() : null;
  if (!image_url) return { ok: false, message: "Missing image URL." };

  const supabase = await createClient();
  const { error } = await supabase.from("gallery_images").insert({ image_url, caption });
  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
  return { ok: true };
}

export async function deleteGalleryImageAction(formData: FormData): Promise<void> {
  await requireOwner();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  const { data: row, error: fetchError } = await supabase
    .from("gallery_images")
    .select("image_url")
    .eq("id", id)
    .maybeSingle();

  if (fetchError || !row?.image_url) {
    redirect(`/admin/gallery?error=${encodeURIComponent(fetchError?.message ?? "not_found")}`);
  }

  const objectPath = pathInBucketFromPublicUrl(row.image_url as string, "stellar-gallery");
  if (objectPath) {
    await supabase.storage.from("stellar-gallery").remove([objectPath]);
  }

  const { error } = await supabase.from("gallery_images").delete().eq("id", id);
  if (error) redirect(`/admin/gallery?error=${encodeURIComponent(error.message)}`);

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
}

export async function upsertServiceAction(formData: FormData) {
  await requireOwner();
  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const price = String(formData.get("price") ?? "").trim() || null;
  if (!title) redirect("/admin/services?error=missing_title");

  const supabase = await createClient();
  if (id) {
    const { error } = await supabase
      .from("services")
      .update({ title, description, price })
      .eq("id", id);
    if (error) redirect(`/admin/services?error=${encodeURIComponent(error.message)}`);
  } else {
    const { error } = await supabase.from("services").insert({ title, description, price });
    if (error) redirect(`/admin/services?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/services");
  revalidatePath("/");
}

export async function deleteServiceAction(formData: FormData) {
  await requireOwner();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) redirect(`/admin/services?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/admin/services");
  revalidatePath("/");
}

export async function upsertProductAction(formData: FormData) {
  await requireOwner();
  const id = String(formData.get("id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const price = String(formData.get("price") ?? "").trim() || null;
  const image_url = String(formData.get("image_url") ?? "").trim() || null;
  if (!name) redirect("/admin/products?error=missing_name");

  const supabase = await createClient();
  if (id) {
    const { error } = await supabase
      .from("products")
      .update({ name, description, price, image_url })
      .eq("id", id);
    if (error) redirect(`/admin/products?error=${encodeURIComponent(error.message)}`);
  } else {
    const { error } = await supabase.from("products").insert({ name, description, price, image_url });
    if (error) redirect(`/admin/products?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

export async function deleteProductAction(formData: FormData) {
  await requireOwner();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();

  const { data: row } = await supabase.from("products").select("image_url").eq("id", id).maybeSingle();
  if (row?.image_url) {
    const objectPath = pathInBucketFromPublicUrl(row.image_url, "stellar-products");
    if (objectPath) await supabase.storage.from("stellar-products").remove([objectPath]);
  }

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) redirect(`/admin/products?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

export async function attachProductImageAction(
  _prev: { ok: boolean; message?: string } | null,
  formData: FormData
): Promise<{ ok: boolean; message?: string }> {
  await requireOwner();
  const productId = String(formData.get("product_id") ?? "").trim();
  const file = formData.get("image");
  if (!productId) return { ok: false, message: "Missing product." };
  if (!(file instanceof File) || file.size === 0) return { ok: false, message: "Pick an image file." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/admin/products");

  const { data: existing } = await supabase.from("products").select("image_url").eq("id", productId).maybeSingle();
  const prevUrl = existing?.image_url as string | null | undefined;
  if (prevUrl) {
    const prevPath = pathInBucketFromPublicUrl(prevUrl, "stellar-products");
    if (prevPath) await supabase.storage.from("stellar-products").remove([prevPath]);
  }

  const safe = file.name.replace(/\s+/g, "_");
  const path = `products/${user.id}/${Date.now()}_${safe}`;
  const buf = Buffer.from(await file.arrayBuffer());
  const { error: upErr } = await supabase.storage.from("stellar-products").upload(path, buf, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });
  if (upErr) return { ok: false, message: upErr.message };

  const { data: pub } = supabase.storage.from("stellar-products").getPublicUrl(path);
  const { error } = await supabase.from("products").update({ image_url: pub.publicUrl }).eq("id", productId);
  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return { ok: true };
}

export async function upsertReviewAction(formData: FormData) {
  await requireOwner();
  const id = String(formData.get("id") ?? "").trim();
  const customer_name = String(formData.get("customer_name") ?? "").trim();
  const review_text = String(formData.get("review_text") ?? "").trim();
  const rating = Number.parseInt(String(formData.get("rating") ?? "5"), 10);
  if (!customer_name || !review_text) redirect("/admin/reviews?error=missing_fields");
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) redirect("/admin/reviews?error=bad_rating");

  const supabase = await createClient();
  if (id) {
    const { error } = await supabase
      .from("reviews")
      .update({ customer_name, review_text, rating })
      .eq("id", id);
    if (error) redirect(`/admin/reviews?error=${encodeURIComponent(error.message)}`);
  } else {
    const { error } = await supabase.from("reviews").insert({ customer_name, review_text, rating });
    if (error) redirect(`/admin/reviews?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
  revalidatePath("/");
}

export async function deleteReviewAction(formData: FormData) {
  await requireOwner();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) redirect(`/admin/reviews?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
  revalidatePath("/");
}

export async function deleteBookingAction(formData: FormData) {
  await requireOwner();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) redirect(`/admin/bookings?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/admin/bookings");
}
