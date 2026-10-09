/** Soft luminous background — inspired by fluid, minimal product UI (not decorative clutter). */
export function AstraAmbient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="astra-orb astra-orb-a" />
      <div className="astra-orb astra-orb-b" />
      <div className="astra-vignette" />
    </div>
  );
}
