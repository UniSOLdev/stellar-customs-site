/**
 * Stripe integration scaffold — wire @stripe/stripe-js and a server route
 * (e.g. /api/checkout/session) when keys are available.
 *
 * Suggested env: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY
 */
export const STRIPE_READY = false;

export function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
