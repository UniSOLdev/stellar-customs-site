import { redirect } from "next/navigation";

/** Legacy booking URL — primary conversion is /quote */
export default function BookingPage() {
  redirect("/quote");
}
