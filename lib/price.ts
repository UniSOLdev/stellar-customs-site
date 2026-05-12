/** Parse a display price string into a number for cart math (best-effort). */
export function parsePriceToNumber(price: string): number {
  const cleaned = price.replace(/,/g, "").trim();
  const m = cleaned.match(/(\d+(\.\d+)?)/);
  return m ? Number.parseFloat(m[0]) : 0;
}
