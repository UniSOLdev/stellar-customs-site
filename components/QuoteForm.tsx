"use client";

import { useActionState, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/site";
import { createQuoteAction } from "@/app/admin/actions";
import {
  FULFILLMENT_PREFERENCE,
  QUOTE_SERVICE_OPTIONS,
  VEHICLE_CONDITION_OPTIONS,
  VEHICLE_SIZE_OPTIONS,
} from "@/lib/business/quote-options";

function QuoteFormFields({ onReset }: { onReset: () => void }) {
  const [state, action, isPending] = useActionState(createQuoteAction, null);
  const busy = isPending;
  const submitted = state?.ok === true;

  const input =
    "mt-2 min-h-[48px] w-full rounded-xl border border-white/[0.09] bg-black/20 px-4 py-3 text-base text-white outline-none transition placeholder:text-zinc-700 focus:border-white/20 focus:bg-white/[0.035] focus:ring-2 focus:ring-white/[0.04] sm:text-sm";
  const label = "text-sm font-medium text-zinc-300";

  return (
    <AnimatePresence mode="wait">
      {!submitted ? (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          action={action}
          encType="multipart/form-data"
          className="space-y-6"
        >
          {state?.ok === false && state.message ? (
            <p className="rounded-xl border border-stellar-orange/40 bg-stellar-orange/10 px-4 py-3 text-sm text-stellar-orange-soft">
              {state.message}
            </p>
          ) : null}

          <div>
            <label htmlFor="name" className={label}>
              Name
            </label>
            <input id="name" name="name" required className={input} autoComplete="name" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className={label}>
                Phone
              </label>
              <input id="phone" name="phone" type="tel" required className={input} autoComplete="tel" />
            </div>
            <div>
              <label htmlFor="email" className={label}>
                Email
              </label>
              <input id="email" name="email" type="email" required className={input} autoComplete="email" />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="city" className={label}>
                City
              </label>
              <input id="city" name="city" required className={input} placeholder="e.g. West Palm Beach" />
            </div>
            <div>
              <label htmlFor="zip" className={label}>
                ZIP
              </label>
              <input id="zip" name="zip" required className={input} inputMode="numeric" pattern="[0-9]{5}" maxLength={5} />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <label htmlFor="vehicle_year" className={label}>
                Year
              </label>
              <input id="vehicle_year" name="vehicle_year" required className={input} placeholder="2020" />
            </div>
            <div>
              <label htmlFor="vehicle_make" className={label}>
                Make
              </label>
              <input id="vehicle_make" name="vehicle_make" required className={input} placeholder="Toyota" />
            </div>
            <div>
              <label htmlFor="vehicle_model" className={label}>
                Model
              </label>
              <input id="vehicle_model" name="vehicle_model" required className={input} placeholder="Tundra" />
            </div>
          </div>

          <div>
            <label htmlFor="vehicle_size" className={label}>
              Vehicle size / type
            </label>
            <select id="vehicle_size" name="vehicle_size" required className={input} defaultValue="">
              <option value="" disabled>
                Select
              </option>
              {VEHICLE_SIZE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <fieldset>
            <legend className={label}>
              Desired service(s)
            </legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {QUOTE_SERVICE_OPTIONS.map((o) => (
                <label
                  key={o.value}
                  className="flex min-h-[46px] cursor-pointer items-center gap-3 rounded-xl border border-white/[0.08] bg-black/20 px-3 py-2 text-sm text-zinc-400 transition hover:border-white/15 has-[:checked]:border-white/20 has-[:checked]:bg-white/[0.05] has-[:checked]:text-white"
                >
                  <input
                    type="checkbox"
                    name="services"
                    value={o.value}
                    className="h-4 w-4 rounded border-white/20 bg-stellar-black text-stellar-blue"
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="condition" className={label}>
              Current vehicle condition
            </label>
            <select id="condition" name="condition" required className={input} defaultValue="">
              <option value="" disabled>
                Select
              </option>
              {VEHICLE_CONDITION_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="fulfillment" className={label}>
              Mobile or studio preference
            </label>
            <select id="fulfillment" name="fulfillment" required className={input} defaultValue="">
              <option value="" disabled>
                Select
              </option>
              {FULFILLMENT_PREFERENCE.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="date" className={label}>
              Preferred date
            </label>
            <input id="date" name="date" type="date" className={input} />
          </div>

          <div>
            <label htmlFor="photos" className={label}>
              Upload photos
            </label>
            <input
              id="photos"
              name="photos"
              type="file"
              accept="image/*"
              multiple
              className={`${input} py-2.5 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-xs file:font-medium file:text-zinc-200`}
            />
            <p className="mt-2 text-xs text-zinc-500">
              Add clear photos of the exterior, interior, or damaged area. We may request additional angles before quoting.
            </p>
          </div>

          <div>
            <label htmlFor="notes" className={label}>
              Additional notes
            </label>
            <textarea id="notes" name="notes" rows={4} className={`${input} min-h-[120px] resize-y`} />
          </div>

          <div className="flex gap-3 rounded-xl border border-white/[0.08] bg-black/20 p-4">
            <input
              id="sms_consent"
              name="sms_callback_consent"
              type="checkbox"
              value="yes"
              className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-stellar-black text-stellar-blue"
            />
            <label htmlFor="sms_consent" className="text-sm leading-relaxed text-zinc-300">
              I agree to receive SMS about this quote at the number provided. Message/data rates may apply; STOP to opt
              out.
            </label>
          </div>

          <motion.button
            type="submit"
            disabled={busy}
            whileHover={{ y: busy ? 0 : -2 }}
            whileTap={{ scale: busy ? 1 : 0.98 }}
            className="w-full rounded-xl bg-white py-3.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200 disabled:opacity-60"
          >
            {busy ? "Sending…" : "Submit quote request"}
          </motion.button>
        </motion.form>
      ) : (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-white/[0.09] bg-white/[0.03] p-10 text-center"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-white">Quote request received</h2>
          <p className="mt-3 text-sm text-zinc-400">
            We&apos;ll review your vehicle details and photos, then follow up with scope and pricing. Need faster help?
            Call {SITE.phone}.
          </p>
          <button
            type="button"
            onClick={onReset}
            className="mt-8 text-sm font-medium text-zinc-400 hover:text-white"
          >
            Submit another
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function QuoteForm() {
  const [resetKey, setResetKey] = useState(0);
  return <QuoteFormFields key={resetKey} onReset={() => setResetKey((k) => k + 1)} />;
}
