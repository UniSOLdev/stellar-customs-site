"use client";

import { useActionState, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/site";
import { createBookingAction } from "@/app/admin/actions";

const SERVICE_OPTIONS = [
  { value: "", label: "Select a service" },
  { value: "mobile-diagnostics", label: "Mobile diagnostics & drivability" },
  { value: "brakes", label: "Brakes & suspension (on-site)" },
  { value: "engine-bay", label: "Engine bay service & fluid maintenance" },
  { value: "lighting-interior", label: "Interior / ambient lighting install" },
  { value: "lighting-accent", label: "Accent, underglow & exterior lighting" },
  { value: "headliner", label: "Starlight headliner & custom trim work" },
  { value: "pre-purchase", label: "Pre-purchase inspection" },
  { value: "other", label: "Other — describe below" },
] as const;

function BookingFormFields({ onReset }: { onReset: () => void }) {
  const [state, action, isPending] = useActionState(createBookingAction, null);
  const busy = isPending;

  const input =
    "mt-2 min-h-[48px] w-full rounded-xl border border-white/10 bg-stellar-black/60 px-4 py-3.5 text-base text-white outline-none ring-0 transition placeholder:text-zinc-600 focus:border-stellar-blue focus:ring-2 focus:ring-stellar-blue/30 sm:text-sm";

  const submitted = state?.ok === true;

  return (
    <AnimatePresence mode="wait">
      {!submitted ? (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          action={action}
          className="space-y-6"
        >
          {state?.ok === false && state.message ? (
            <p className="rounded-xl border border-stellar-orange/40 bg-stellar-orange/10 px-4 py-3 text-sm text-stellar-orange-soft">
              {state.message}
            </p>
          ) : null}
          <div>
            <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Name
            </label>
            <input id="name" name="name" required className={input} placeholder="Your name" autoComplete="name" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className={input}
                placeholder={SITE.phone}
                autoComplete="tel"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={input}
                placeholder={SITE.email}
                autoComplete="email"
              />
            </div>
          </div>
          <div>
            <label htmlFor="service" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Service
            </label>
            <select id="service" name="service" required className={input} defaultValue="">
              {SERVICE_OPTIONS.map((o) => (
                <option key={o.value || "placeholder"} value={o.value} disabled={o.value === ""}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Preferred appointment date
            </label>
            <input id="date" name="date" type="date" required className={input} />
          </div>
          <div>
            <label htmlFor="vehicle" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Vehicle make & model
            </label>
            <input
              id="vehicle"
              name="vehicle"
              required
              className={input}
              placeholder="e.g. 2019 Ford F-150"
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="notes" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Issue description
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={5}
              required
              className={`${input} min-h-[140px] resize-y`}
              placeholder="Symptoms, warning lights, recent work, and anything that helps us prepare."
            />
          </div>
          <div>
            <label htmlFor="photo" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Optional photo
            </label>
            <input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              className={`${input} py-2.5 file:mr-3 file:rounded-lg file:border-0 file:bg-stellar-blue/20 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-stellar-blue`}
            />
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">
              Direct photo upload with your request is coming soon — we note the filename in your booking for now.
            </p>
          </div>
          <div className="flex gap-3 rounded-xl border border-white/10 bg-stellar-black/40 p-4">
            <input
              id="sms_consent"
              name="sms_callback_consent"
              type="checkbox"
              value="yes"
              className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-stellar-black text-stellar-blue focus:ring-stellar-blue/40"
            />
            <label htmlFor="sms_consent" className="text-sm leading-relaxed text-zinc-300">
              I agree to receive SMS messages about this appointment request at the number provided. Message and data
              rates may apply; reply STOP to opt out.
            </label>
          </div>
          <motion.button
            type="submit"
            disabled={busy}
            whileHover={{ y: busy ? 0 : -2 }}
            whileTap={{ scale: busy ? 1 : 0.98 }}
            className="w-full rounded-full bg-gradient-to-r from-stellar-blue-deep to-stellar-blue py-3.5 text-sm font-bold uppercase tracking-widest text-black shadow-glow-button transition hover:shadow-[0_0_32px_rgba(58,160,255,0.45)] animate-pulse-glow disabled:opacity-60"
          >
            {busy ? "Sending…" : "Submit Request"}
          </motion.button>
        </motion.form>
      ) : (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-stellar-blue/30 bg-stellar-surface/80 p-10 text-center shadow-glow-blue backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.05 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stellar-blue/20 text-3xl text-stellar-blue"
          >
            ✓
          </motion.div>
          <h2 className="font-display mt-6 text-2xl font-bold text-white">Request received</h2>
          <p className="mt-3 text-sm text-zinc-400">
            We&apos;ll confirm your appointment window shortly. If it&apos;s urgent, call us directly from the footer
            or the help button on this page.
          </p>
          <button
            type="button"
            onClick={onReset}
            className="mt-8 text-xs font-bold uppercase tracking-widest text-stellar-orange hover:text-stellar-orange-soft"
          >
            Submit another
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function BookingForm() {
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="mx-auto w-full max-w-xl lg:mx-0">
      <BookingFormFields key={resetKey} onReset={() => setResetKey((k) => k + 1)} />
    </div>
  );
}
